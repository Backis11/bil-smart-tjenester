
import type { WorkshopCSVRow } from "@/types/workshop";

export const parseCSV = (csvText: string): WorkshopCSVRow[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const row: any = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    
    return row as WorkshopCSVRow;
  });
};

export const validateCSVHeaders = (headers: string[]): boolean => {
  const requiredHeaders = ['name', 'address', 'certifications', 'Organisasjonsnummer', 'Godkjenningsnummer'];
  return requiredHeaders.every(header => headers.includes(header));
};
