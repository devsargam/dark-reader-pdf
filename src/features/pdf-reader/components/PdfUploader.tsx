"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PdfUploaderProps } from "../types";

export function PdfUploader({ onFileSelect }: PdfUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && file.type === "application/pdf") {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full flex flex-col items-center">
      <div
        {...getRootProps()}
        className={`w-full cursor-pointer flex flex-col items-center justify-center p-8 rounded-lg transition-colors ${
          isDragActive
            ? "bg-primary/10 border-primary"
            : "hover:bg-primary/5 border-transparent"
        }`}
      >
        <input {...getInputProps()} />
        <FileUp className="h-12 w-12 text-primary mb-4" />
        <p className="text-lg font-medium text-foreground mb-2">
          {isDragActive ? "Drop your PDF here" : "Drag & drop your PDF here"}
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          or click to browse files
        </p>
        <Button variant="outline" className="mt-2">
          Select PDF
        </Button>
      </div>
    </div>
  );
}
