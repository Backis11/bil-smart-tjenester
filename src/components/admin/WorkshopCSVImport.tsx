
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { parseCSV, validateCSVHeaders } from '@/utils/csvParser';
import { workshopService } from '@/services/workshopService';
import type { WorkshopCSVRow } from '@/types/workshop';

const WorkshopCSVImport = () => {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<WorkshopCSVRow[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setImportStatus('idle');
      setErrorMessage('');
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        try {
          const data = parseCSV(text);
          const headers = Object.keys(data[0] || {});
          
          if (!validateCSVHeaders(headers)) {
            setErrorMessage('Invalid CSV format. Required headers: name, address, certifications, Organisasjonsnummer, Godkjenningsnummer');
            return;
          }
          
          setCsvData(data);
        } catch (error) {
          setErrorMessage('Error parsing CSV file');
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleImport = async () => {
    if (!csvData.length) return;
    
    setIsImporting(true);
    try {
      await workshopService.importWorkshopsFromCSV(csvData);
      setImportStatus('success');
      setCsvData([]);
      setFile(null);
    } catch (error) {
      setImportStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Import failed');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Workshops from CSV
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            <p className="text-sm text-gray-500 mt-2">
              Upload a CSV file with columns: name, address, certifications, Organisasjonsnummer, Godkjenningsnummer
            </p>
          </div>

          {importStatus === 'success' && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Workshops imported successfully!
              </AlertDescription>
            </Alert>
          )}

          {importStatus === 'error' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {errorMessage && importStatus === 'idle' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {csvData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Preview ({csvData.length} workshops)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Certifications</TableHead>
                      <TableHead>Org Number</TableHead>
                      <TableHead>Approval Number</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {csvData.slice(0, 10).map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.address}</TableCell>
                        <TableCell>{row.certifications}</TableCell>
                        <TableCell>{row.Organisasjonsnummer}</TableCell>
                        <TableCell>{row.Godkjenningsnummer}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {csvData.length > 10 && (
                <p className="text-sm text-gray-500">
                  Showing first 10 rows of {csvData.length} total workshops
                </p>
              )}

              <Button 
                onClick={handleImport} 
                disabled={isImporting}
                className="w-full"
              >
                {isImporting ? 'Importing...' : `Import ${csvData.length} Workshops`}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkshopCSVImport;
