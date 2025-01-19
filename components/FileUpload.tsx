"use client";
import { useTab } from "@/providers/tabs-provider";
import React, { useState } from "react";

const FileUploader = ({
  flow,
  selectedTab,
}: {
  flow: string;
  selectedTab: string;
}) => {
  const [file, setFile] = useState<any>(null);
  const [filePreview, setFilePreview] = useState<any>(null); // Preview for images and PDF
  const [uploadStatus, setUploadStatus] = useState<any>("");
  const [filePath, setFilePath] = useState("");

  const {updateFilePath} = useTab();

  // Handle file selection
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Check if the file is an image or a PDF to show appropriate preview
      if (selectedFile.type.startsWith("image/")) {
        // If it's an image, show a preview using FileReader
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else if (selectedFile.type === "application/pdf") {
        // If it's a PDF, show a link or embed the PDF
        setFilePreview(URL.createObjectURL(selectedFile));
      } else {
        setFilePreview(null); // Clear preview if the file type is neither image nor PDF
      }
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    setUploadStatus("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `http://127.0.0.1:7860/api/v1/files/upload/${flow}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file.");
      }

      const data = await response.json();
      setUploadStatus("Upload successful!");
      setFilePath(data.file_path);
      updateFilePath(data.file_path);
    } catch (error) {
      setUploadStatus(`Error: ${error}`);
    }
  };


  return (
    <div className="flex flex-col justify-center items-center  text-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10 font-minecraft">
      <h1 className="text-xl font-bold mb-4">
        {selectedTab === "Doubtnut"
          ? "Upload the Question!"
          : selectedTab === "Q&A"
          ? "Upload your DOCs!"
          : "Put your video lecture link in the chatbox and Voila you just saved yourself a lot of time with summarized output!"}
      </h1>

      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
        className="file:border-gray-600 file:bg-gray-700 file:text-white file:px-4 file:py-2 file:rounded-lg mb-4 w-full text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Show image preview if the file is an image */}
      {filePreview && file && file.type.startsWith("image/") && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Image Preview:</h2>
          <img
            src={filePreview}
            alt="Selected Preview"
            className="rounded-lg shadow-md w-80 h-auto mt-2"
          />
        </div>
      )}

      {/* Show PDF preview if the file is a PDF */}
      {filePreview && file && file.type === "application/pdf" && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">PDF Preview:</h2>
          <iframe
            src={filePreview}
            title="PDF Preview"
            className="rounded-lg shadow-md w-80 h-[32rem] mt-2"
            frameBorder="0"
          ></iframe>
        </div>
      )}

      <button
        onClick={handleFileUpload}
        className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
      >
        Upload File
      </button>

      {uploadStatus && (
        <p className="mt-4 text-sm text-gray-400">{uploadStatus}</p>
      )}
      {/* {filePath && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Uploaded File Path</h2>
          <p className="text-sm text-gray-400">{filePath}</p>
        </div>
      )} */}
    </div>
  );
};

export default FileUploader;
