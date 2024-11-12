// components/CopyButton.tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';

type CopyButtonProps = {
  textToCopy: string;
};

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <Button
      onClick={handleCopy}
      className="flex items-center gap-2 bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-600 rounded-md px-3 py-1"
    >
      {copied ? (
        <>
          <CheckIcon className="w-4 h-4" aria-hidden="true" />
          Copied!
        </>
      ) : (
        <>
          <ClipboardIcon className="w-4 h-4" aria-hidden="true" />
          Copy
        </>
      )}
    </Button>
  );
};

export default CopyButton;