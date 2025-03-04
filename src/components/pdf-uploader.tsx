"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";

interface PdfUploaderProps {
  onFileSelect: (file: File) => void;
}

export function PdfUploader({ onFileSelect }: PdfUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        onFileSelect(file);
      } else {
        alert("Please select a PDF file");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        onFileSelect(file);
      } else {
        alert("Please drop a PDF file");
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-primary bg-primary/10" : "border-gray-300"
        } transition-colors duration-200 cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/pdf"
          className="hidden"
        />

        {selectedFile ? (
          <div className="flex flex-col items-center">
            <FileText className="h-12 w-12 text-primary mb-2" />
            <p className="text-sm font-medium">{selectedFile.name}</p>
            <p className="text-xs text-gray-500 mt-1">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm font-medium">
              Drag & drop your PDF here or click to browse
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Only PDF files are supported
            </p>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFile(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
          >
            Remove file
          </Button>
        </div>
      )}
    </div>
  );
}
