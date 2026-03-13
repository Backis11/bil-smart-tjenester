"""
Verksted Data Enrichment Script
================================
Bruker Firecrawl til å berike verksteddata fra CSV.
Bruk i Claude Code:
  1. pip install firecrawl-py
  2. export FIRECRAWL_API_KEY="din-nøkkel"
  3. python verksted_scraper.py input.csv output.csv
Eller kjør med --dry-run for å se hva som ville blitt søkt uten å bruke API-kall.
"""
import csv
import json
import os
import re
import sys
import time
import argparse
from pathlib import Path
try:
    from firecrawl import FirecrawlApp
except ImportError:
    print("❌ Mangler firecrawl-py. Kjør: pip install firecrawl-py")
    sys.exit(1)
# ─── Konfigurasjon ────────────────────────────────────────────────
DELAY_BETWEEN_REQUESTS = 1.0  # sekunder mellom hver request
MAX_RETRIES = 2
SECTION_HEADER_MIN_EMPTY_COLS = 15  # rader med mange tomme celler = seksjonsoverskrift
# Kolonneindekser (0-basert, fra din CSV)
COL = {
    "navn": 0,
    "adresse": 1,
    "postnr": 2,
    "sted": 3,
    "orgnr": 4,
    "telefon": 5,
    "epost": 6,
    "nettside": 7,
    "bilde_url": 8,
    "man": 9, "tir": 10, "ons": 11, "tor": 12, "fre": 13, "lor": 14, "son": 15,
    "eu_kontroll": 16,
    "service_liten": 17,
    "service_stor": 18,
    "dekkskift": 19,
    "ac_service": 20,
    "kilde": 21,
    "dato": 22,
    "notater": 23,
}
DAYS_NO = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"]
DAY_COLS = [COL["man"], COL["tir"], COL["ons"], COL["tor"], COL["fre"], COL["lor"], COL["son"]]
# ─── Hjelpefunksjoner ─────────────────────────────────────────────
def is_section_header(row: list) -> bool:
    """Sjekk om en rad er en seksjonsoverskrift (ikke verksteddata).
    En seksjonsoverskrift har org.nr-kolonnen (index 4) tom — et ekte
    verksted har alltid org.nr registrert.
    """
    if len(row) < 5:
        return True
    # Kolonne-rad (header): første celle er "Verkstednavn"
    if row[0].strip().lower() == "verkstednavn":
        return True
    # Seksjonsoverskrift: org.nr-feltet er tomt
    orgnr = row[COL["orgnr"]].strip() if len(row) > COL["orgnr"] else ""
    return not orgnr
def needs_enrichment(row: list) -> bool:
    """Sjekk om raden mangler data som kan berikes."""
    if is_section_header(row):
        return False
    missing_phone = not row[COL["telefon"]].strip()
    missing_website = not row[COL["nettside"]].strip()
    missing_hours = not any(row[c].strip() for c in DAY_COLS if c < len(row))
    return missing_phone or missing_website or missing_hours
def pad_row(row: list, min_len: int = 24) -> list:
    """Sørg for at raden har nok kolonner."""
    while len(row) < min_len:
        row.append("")
    return row
def extract_phone(text: str) -> str:
    """Finn norske telefonnummer i tekst."""
    patterns = [
        r'(?:\+47\s?)?(?:\d{2}\s?\d{2}\s?\d{2}\s?\d{2})',
        r'(?:\d{3}\s?\d{2}\s?\d{3})',
        r'(?:\d{8})',
    ]
    for pattern in patterns:
        matches = re.findall(pattern, text)
        for m in matches:
            digits = re.sub(r'\D', '', m)
            if len(digits) == 8 or (len(digits) == 10 and digits.startswith('47')):
                return m.strip()
    return ""
def extract_email(text: str) -> str:
    """Finn e-postadresse i tekst."""
    match = re.search(r'[\w.+-]+@[\w-]+\.[\w.-]+', text)
    return match.group(0) if match else ""
def extract_opening_hours(text: str) -> dict:
    """Prøv å finne åpningstider fra tekst. Returnerer dict med dagnavn -> tider."""
    hours = {}
    # Prøv typiske norske formater
    for i, day in enumerate(DAYS_NO):
        # "Mandag: 08:00 - 16:00" eller "Mandag 08:00-16:00"
        pattern = rf'{day}[:\s]+(\d{{1,2}}[.:]\d{{2}}\s*[-–]\s*\d{{1,2}}[.:]\d{{2}}|[Ss]tengt|[Cc]losed)'
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            hours[day] = match.group(1).strip()

    # Engelsk fallback
    eng_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    for i, day in enumerate(eng_days):
        if DAYS_NO[i] not in hours:
            pattern = rf'{day}[:\s]+(\d{{1,2}}[.:]\d{{2}}\s*[-–]\s*\d{{1,2}}[.:]\d{{2}}|[Cc]losed)'
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                val = match.group(1).strip()
                if val.lower() == "closed":
                    val = "Stengt"
                hours[DAYS_NO[i]] = val

    return hours
def extract_website(text: str, verksted_navn: str) -> str:
    """Finn nettside-URL fra tekst."""
    urls = re.findall(r'https?://[^\s<>"\']+', text)
    # Filtrer bort Google, Facebook, osv — prøv å finne verkstedets egen side
    skip_domains = ['google.', 'facebook.com', 'instagram.com', 'twitter.com', 'youtube.com', 'yelp.', 'tripadvisor.']
    for url in urls:
        if not any(d in url.lower() for d in skip_domains):
            return url.rstrip('.,;)')
    return urls[0].rstrip('.,;)') if urls else ""
# ─── Firecrawl-logikk ────────────────────────────────────────────
def search_and_scrape(app: FirecrawlApp, verksted_navn: str, sted: str) -> dict:
    """Søk etter verkstedet og scrape resultatet."""
    result = {
        "telefon": "",
        "epost": "",
        "nettside": "",
        "adresse": "",
        "hours": {},
        "source": "",
    }

    # Steg 1: Søk med Firecrawl
    query = f"{verksted_navn} {sted} verksted".strip()
    print(f"    🔍 Søker: {query}")

    try:
        # Bruk Firecrawl search for å finne relevante sider
        search_results = app.search(
            query=query,
            limit=3
        )

        if not search_results or not search_results.get("data"):
            print(f"    ⚠️  Ingen resultater for: {query}")
            return result

        # Gå gjennom resultatene
        for sr in search_results["data"][:3]:
            url = sr.get("url", "")
            markdown = sr.get("markdown", "")

            if not markdown:
                continue

            print(f"    📄 Fant: {url[:80]}")

            # Ekstraher data fra markdown-innholdet
            if not result["telefon"]:
                result["telefon"] = extract_phone(markdown)

            if not result["epost"]:
                result["epost"] = extract_email(markdown)

            if not result["nettside"]:
                # Bruk URL-en fra søkeresultatet hvis det er verkstedets side
                skip = ['google.', 'facebook.com', 'instagram.com', 'gulesider.no', 'proff.no']
                if not any(d in url.lower() for d in skip):
                    result["nettside"] = url

            if not result["hours"]:
                result["hours"] = extract_opening_hours(markdown)

            result["source"] = "Firecrawl"

            # Stopp hvis vi har nok data
            if result["telefon"] and result["nettside"] and result["hours"]:
                break

            time.sleep(0.5)

    except Exception as e:
        print(f"    ❌ Feil: {e}")

    return result
# ─── Hovedlogikk ─────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Berik verksted-CSV med Firecrawl")
    parser.add_argument("input_csv", help="Sti til input CSV-fil")
    parser.add_argument("output_csv", nargs="?", default=None, help="Sti til output CSV (default: input_beriket.csv)")
    parser.add_argument("--dry-run", action="store_true", help="Vis hva som ville blitt søkt, uten API-kall")
    parser.add_argument("--limit", type=int, default=0, help="Maks antall rader å berike (0 = alle)")
    parser.add_argument("--start-from", type=int, default=0, help="Start fra rad nr (0-basert, hopper over allerede berikede)")
    args = parser.parse_args()

    # Output-fil
    if args.output_csv is None:
        stem = Path(args.input_csv).stem
        args.output_csv = f"{stem}_beriket.csv"

    # Les CSV
    print(f"📂 Leser: {args.input_csv}")
    with open(args.input_csv, "r", encoding="utf-8-sig") as f:
        sample = f.read(4096)
        f.seek(0)
        delimiter = "\t" if sample.count("\t") > sample.count(",") else ","
        print(f"   Bruker delimiter: {repr(delimiter)}")
        reader = csv.reader(f, delimiter=delimiter)
        rows = list(reader)

    print(f"   {len(rows)} rader totalt")

    # Tell hva som trengs
    to_enrich = [(i, row) for i, row in enumerate(rows) if needs_enrichment(row)]
    print(f"   {len(to_enrich)} rader trenger berikelse")

    if args.dry_run:
        print("\n🏃 DRY RUN — ingen API-kall\n")
        for i, row in to_enrich[:20]:
            row = pad_row(row)
            navn = row[COL["navn"]]
            sted = row[COL["sted"]]
            missing = []
            if not row[COL["telefon"]].strip(): missing.append("tlf")
            if not row[COL["nettside"]].strip(): missing.append("nett")
            if not any(row[c].strip() for c in DAY_COLS): missing.append("timer")
            print(f"  Rad {i}: {navn} ({sted}) — mangler: {', '.join(missing)}")
        if len(to_enrich) > 20:
            print(f"  ... og {len(to_enrich) - 20} til")
        return

    # Init Firecrawl
    api_key = os.environ.get("FIRECRAWL_API_KEY")
    if not api_key:
        print("❌ Sett FIRECRAWL_API_KEY miljøvariabel")
        print("   export FIRECRAWL_API_KEY='din-nøkkel-her'")
        sys.exit(1)

    app = FirecrawlApp(api_key=api_key)
    print(f"\n🚀 Starter berikelse ({len(to_enrich)} rader)\n")

    enriched_count = 0
    skipped = 0

    for idx, (row_num, row) in enumerate(to_enrich):
        if idx < args.start_from:
            continue
        if args.limit and enriched_count >= args.limit:
            print(f"\n⏸️  Stoppet etter {args.limit} rader (--limit)")
            break

        row = pad_row(row)
        rows[row_num] = row  # oppdater med paddet versjon

        navn = row[COL["navn"]].strip()
        sted = row[COL["sted"]].strip()

        print(f"[{idx+1}/{len(to_enrich)}] {navn}")

        data = search_and_scrape(app, navn, sted)

        # Fyll inn bare tomme celler
        updated = False

        if not row[COL["telefon"]].strip() and data["telefon"]:
            row[COL["telefon"]] = data["telefon"]
            updated = True

        if not row[COL["epost"]].strip() and data["epost"]:
            row[COL["epost"]] = data["epost"]
            updated = True

        if not row[COL["nettside"]].strip() and data["nettside"]:
            row[COL["nettside"]] = data["nettside"]
            updated = True

        # Åpningstider
        if data["hours"]:
            for i, day in enumerate(DAYS_NO):
                col_idx = DAY_COLS[i]
                if not row[col_idx].strip() and day in data["hours"]:
                    row[col_idx] = data["hours"][day]
                    updated = True

        if updated:
            enriched_count += 1
            # Sett kilde hvis tom
            if not row[COL["kilde"]].strip():
                row[COL["kilde"]] = "Firecrawl"
            print(f"    ✅ Beriket (tlf: {bool(data['telefon'])}, nett: {bool(data['nettside'])}, timer: {bool(data['hours'])})")
        else:
            skipped += 1
            print(f"    ⚠️  Ingen ny data funnet")

        # Lagre underveis (hver 10. rad) i tilfelle noe krasjer
        if (idx + 1) % 10 == 0:
            _save_csv(rows, args.output_csv)
            print(f"    💾 Mellomlagret ({enriched_count} beriket så langt)")

        time.sleep(DELAY_BETWEEN_REQUESTS)

    # Lagre endelig resultat
    _save_csv(rows, args.output_csv)

    print(f"\n{'='*50}")
    print(f"✅ Ferdig!")
    print(f"   Beriket: {enriched_count} rader")
    print(f"   Ingen data funnet: {skipped} rader")
    print(f"   Lagret: {args.output_csv}")
def _save_csv(rows: list, path: str):
    """Lagre CSV med UTF-8 BOM og semikolon-separator."""
    with open(path, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.writer(f, delimiter=";")
        writer.writerows(rows)
if __name__ == "__main__":
    main()
