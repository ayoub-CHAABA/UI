// components/JsonInput.tsx
import React, { useState } from 'react';

type JsonInputProps = {
  value: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
};

const JsonInput: React.FC<JsonInputProps> = ({ value, onChange }) => {
  const [jsonData, setJsonData] = useState(JSON.stringify(value, null, 2));

  const handleJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonData(event.target.value);
    try {
      const parsedData = JSON.parse(event.target.value);
      onChange(parsedData);
    } catch (error) {
      console.error("Invalid JSON");
    }
  };

  return (
    <textarea
      className="w-full p-2 border rounded-md"
      rows={6}
      value={jsonData}
      onChange={handleJsonChange}
    />
  );
};

export default JsonInput;
