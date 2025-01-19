"use client"

import React, { useState } from "react";

const FilePicker = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (file) {
      setFileName(file.name);

      // Optional: Read the file content (for text-based files like .txt or .json)
      const reader = new FileReader();
      reader.onload = () => setFileContent(reader.result as string);
      reader.readAsText(file); // Change to `readAsDataURL` for images or `readAsArrayBuffer` for binary files
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 z-20 rounded-xl">
      <button
        onClick={() => document.getElementById("fileInput")?.click()}
        className="px-4 py-2 bg-blue-500 text-white rounded-xl"
      >
        Select File
      </button>
      <input
        id="fileInput"
        type="file"
        onChange={handleFileSelect}
        className="hidden"
      />
      {fileName && (
        <div className="mt-2 text-sm">
          <strong>Selected File:</strong> {fileName}
        </div>
      )}
      {fileContent && (
        <div className="mt-2 text-sm">
          <strong>File Content:</strong> <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default FilePicker;
