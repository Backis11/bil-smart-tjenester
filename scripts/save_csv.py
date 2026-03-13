#!/usr/bin/env python3
"""Read stdin, detect delimiter, save as semicolon CSV."""
import sys
import csv
import io

raw = sys.stdin.read()

# Detect delimiter
sample = raw[:2000]
tabs = sample.count('\t')
semis = sample.count(';')
commas = sample.count(',')

if tabs > semis and tabs > commas:
    delim = '\t'
elif semis > commas:
    delim = ';'
else:
    delim = ','

print(f"Detected delimiter: {repr(delim)} (tabs={tabs}, semis={semis}, commas={commas})", file=sys.stderr)

reader = csv.reader(io.StringIO(raw), delimiter=delim)
rows = list(reader)
print(f"Read {len(rows)} rows", file=sys.stderr)

out_path = sys.argv[1] if len(sys.argv) > 1 else "output.csv"
with open(out_path, "w", encoding="utf-8-sig", newline="") as f:
    writer = csv.writer(f, delimiter="\t")
    writer.writerows(rows)

print(f"Saved to {out_path}", file=sys.stderr)
