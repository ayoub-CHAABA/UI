// components/ListInput.tsx
import React, { useState } from 'react';

type ListInputProps = {
  value: string[];
  onChange: (data: string[]) => void;
};

const ListInput: React.FC<ListInputProps> = ({ value, onChange }) => {
  const [listData, setListData] = useState(value.join('\n'));

  const handleListChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newList = event.target.value.split('\n').filter(item => item.trim());
    setListData(event.target.value);
    onChange(newList);
  };

  return (
    <textarea
      className="w-full p-2 border rounded-md"
      rows={4}
      value={listData}
      onChange={handleListChange}
      placeholder="Enter each item on a new line"
    />
  );
};

export default ListInput;
