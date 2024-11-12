// components/OutputForm.tsx
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import JsonInput from './JsonInput';
import ListInput from './ListInput';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type OutputFormProps = {
  data: Record<string, any> | null;
  displayOptions?: ('table' | 'json' | 'html' | 'jsonInput' | 'listInput')[];
  downloadOptions?: ('csv' | 'excel' | 'pdf')[];
  onChange?: (newData: Record<string, any>) => void;
};

const OutputForm: React.FC<OutputFormProps> = ({
  data,
  displayOptions = ['table'],
  downloadOptions = ['csv', 'excel', 'pdf'],
  onChange
}) => {
  const [viewFormat, setViewFormat] = useState<'table' | 'json' | 'html' | 'jsonInput' | 'listInput'>(displayOptions[0]);
  const [editableData, setEditableData] = useState(data);

  useEffect(() => {
    if (data) {
      setEditableData(data);
      setViewFormat(displayOptions[0]);
    }
  }, [data, displayOptions]);

  const handleDataChange = (newData: any) => {
    setEditableData(newData);
    onChange && onChange(newData);
  };

  const handleDownloadCSV = () => {
    if (editableData) {
      const csvContent = "data:text/csv;charset=utf-8," +
        Object.keys(editableData).join(",") + "\n" +
        Object.values(editableData).join(",");
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
    if (editableData) {
      const worksheet = XLSX.utils.json_to_sheet([editableData]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Output");
      XLSX.writeFile(workbook, "output.xlsx");
    }
  };

  const handleDownloadPDF = () => {
    if (editableData) {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [["Field", "Value"]],
        body: Object.entries(editableData).map(([key, value]) => [key, String(value)]),
      });
      doc.save("output.pdf");
    }
  };

  if (!data) {
    return null;
  }

  return (
    <div className="mt-6 p-6 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Form Submission Output</h2>

      {/* Display Options */}
      <div className="flex space-x-2 mb-6">
        {displayOptions.includes('table') && (
          <Button onClick={() => setViewFormat('table')}>Table</Button>
        )}
        {displayOptions.includes('json') && (
          <Button onClick={() => setViewFormat('json')}>JSON</Button>
        )}
        {displayOptions.includes('html') && (
          <Button onClick={() => setViewFormat('html')}>HTML</Button>
        )}
        {displayOptions.includes('jsonInput') && (
          <Button onClick={() => setViewFormat('jsonInput')}>JSON Input</Button>
        )}
        {displayOptions.includes('listInput') && (
          <Button onClick={() => setViewFormat('listInput')}>List Input</Button>
        )}
      </div>

      {/* Display Data Based on Selected Format */}
      <div className="text-sm">
        {viewFormat === 'table' && editableData && (
          <table className="w-full border rounded-md">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-2 text-left font-medium">Field</th>
                <th className="p-2 text-left font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(editableData).map(([key, value]) => (
                <tr key={key} className="border-b dark:border-gray-600">
                  <td className="p-2">{key}</td>
                  <td className="p-2">{String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {viewFormat === 'json' && (
          <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-md overflow-auto">
            {JSON.stringify(editableData, null, 2)}
          </pre>
        )}
        {viewFormat === 'html' && (
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
            {Object.entries(editableData).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {String(value)}
              </p>
            ))}
          </div>
        )}
        {viewFormat === 'jsonInput' && (
          <JsonInput value={editableData || {}} onChange={handleDataChange} />
        )}
        {viewFormat === 'listInput' && Array.isArray(editableData) && (
          <ListInput value={editableData as string[]} onChange={newList => handleDataChange({ list: newList })} />
        )}
      </div>

      {/* Download Buttons */}
      <div className="flex space-x-2 mt-6">
        {downloadOptions.includes('csv') && <Button onClick={handleDownloadCSV}>Download CSV</Button>}
        {downloadOptions.includes('excel') && <Button onClick={handleDownloadExcel}>Download Excel</Button>}
        {downloadOptions.includes('pdf') && <Button onClick={handleDownloadPDF}>Download PDF</Button>}
      </div>
    </div>
  );
};

export default OutputForm;
