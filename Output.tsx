// components/OutputForm.tsx
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type OutputFormProps = {
  data: Record<string, any> | null;
  displayOptions?: ('table' | 'json' | 'html')[];
  downloadOptions?: ('csv' | 'excel' | 'pdf')[];
};

const OutputForm: React.FC<OutputFormProps> = ({ data, displayOptions = ['table'], downloadOptions = ['csv', 'excel', 'pdf'] }) => {
  const [viewFormat, setViewFormat] = useState<'table' | 'json' | 'html'>(displayOptions[0]);

  useEffect(() => {
    if (data) {
      setViewFormat(displayOptions[0]);
    }
  }, [data, displayOptions]);

  const formatValue = (value: any): string => {
    return typeof value === 'object' && value !== null ? JSON.stringify(value, null, 2) : String(value);
  };

  const handleDownloadCSV = () => {
    if (data) {
      const csvRows = [["Field", "Value"]];
      Object.entries(data).forEach(([key, value]) => {
        csvRows.push([key, formatValue(value)]);
      });
      const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "output.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadExcel = () => {
    if (data) {
      const flatData = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, formatValue(value)]));
      const worksheet = XLSX.utils.json_to_sheet([flatData]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Output");
      XLSX.writeFile(workbook, "output.xlsx");
    }
  };

  const handleDownloadPDF = () => {
    if (data) {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [["Field", "Value"]],
        body: Object.entries(data).map(([key, value]) => [key, formatValue(value)]),
      });
      doc.save("output.pdf");
    }
  };

  if (!data) {
    return null;
  }

  return (
    <div className="mt-6 p-4 border border-muted rounded bg-muted">
      <h2 className="text-lg font-semibold mb-4">Form Submission Output</h2>

      {/* Display Options */}
      <div className="flex space-x-2 mb-4">
        {displayOptions.includes('table') && (
          <Button onClick={() => setViewFormat('table')}>Table</Button>
        )}
        {displayOptions.includes('json') && (
          <Button onClick={() => setViewFormat('json')}>JSON</Button>
        )}
        {displayOptions.includes('html') && (
          <Button onClick={() => setViewFormat('html')}>HTML</Button>
        )}
      </div>

      {/* Data Display based on View Format */}
      <div>
        {viewFormat === 'table' && (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Field</th>
                <th className="p-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data).map(([key, value]) => (
                <tr key={key} className="border-b">
                  <td className="p-2 font-medium">{key}</td>
                  <td className="p-2 whitespace-pre-wrap">{formatValue(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {viewFormat === 'json' && (
          <pre className="whitespace-pre-wrap text-sm p-4 bg-gray-200 rounded-md">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        {viewFormat === 'html' && (
          <div className="text-sm">
            {Object.entries(data).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {formatValue(value)}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Download Options */}
      <div className="flex space-x-2 mt-4">
        {downloadOptions.includes('csv') && <Button onClick={handleDownloadCSV}>Download CSV</Button>}
        {downloadOptions.includes('excel') && <Button onClick={handleDownloadExcel}>Download Excel</Button>}
        {downloadOptions.includes('pdf') && <Button onClick={handleDownloadPDF}>Download PDF</Button>}
      </div>
    </div>
  );
};

export default OutputForm;