"use client";

import React, { useState, useEffect, useRef } from "react";
import { Maximize2, Minimize2, Moon, Sun, Eye, EyeOff } from "lucide-react";

interface PdfViewerProps {
  file: File | null;
  onZenModeChange?: (zenMode: boolean) => void;
}

export function PdfViewer({ file, onZenModeChange }: PdfViewerProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isZenMode, setIsZenMode] = useState(false);
  const [showZenModeInfo, setShowZenModeInfo] = useState(false);
  const [controlsHidden, setControlsHidden] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`
        );
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleZenMode = () => {
    const newZenMode = !isZenMode;
    setIsZenMode(newZenMode);

    // Reset controls hidden state when toggling zen mode
    setControlsHidden(false);

    // Show zen mode info when entering zen mode
    if (newZenMode) {
      setShowZenModeInfo(true);
      setTimeout(() => {
        setShowZenModeInfo(false);
      }, 3000);
    }

    // Notify parent component about zen mode change
    if (onZenModeChange) {
      onZenModeChange(newZenMode);
    }
    // When entering zen mode, also enter fullscreen for best experience
    if (newZenMode && !document.fullscreenElement) {
      toggleFullScreen();
    }
  };

  const handleDoubleClick = () => {
    if (isZenMode) {
      setControlsHidden(!controlsHidden);

      // Show a brief message when controls are toggled
      const message = controlsHidden
        ? "Controls hidden (double-click to show)"
        : "Controls visible on mouse move";
      const messageElement = document.createElement("div");
      messageElement.className =
        "fixed top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded text-sm z-50";
      messageElement.textContent = message;
      document.body.appendChild(messageElement);

      setTimeout(() => {
        document.body.removeChild(messageElement);
      }, 1500);
    }
  };

  const showControlsTemporarily = () => {
    if (isZenMode && !controlsHidden) {
      // Show controls briefly when mouse moves in zen mode
      const controls = document.getElementById("pdf-controls");
      if (controls) {
        controls.classList.remove("opacity-0");
        controls.classList.add("opacity-100");

        // Clear any existing timeout
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }

        // Set a new timeout
        controlsTimeoutRef.current = setTimeout(() => {
          controls.classList.remove("opacity-100");
          controls.classList.add("opacity-0");
          controlsTimeoutRef.current = null;
        }, 2000);
      }
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
      // If exiting fullscreen, also exit zen mode
      if (!document.fullscreenElement && isZenMode) {
        setIsZenMode(false);
        setControlsHidden(false);
        if (onZenModeChange) {
          onZenModeChange(false);
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, [isZenMode, onZenModeChange]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle zen mode with 'Z' key
      if (e.key === "z" || e.key === "Z") {
        toggleZenMode();
      }
      // Toggle fullscreen with 'F' key
      if (e.key === "f" || e.key === "F") {
        toggleFullScreen();
      }
      // Toggle dark mode with 'D' key
      if (e.key === "d" || e.key === "D") {
        toggleDarkMode();
      }
      // Exit zen mode with Escape key
      if (e.key === "Escape" && isZenMode) {
        toggleZenMode();
      }
      // Toggle controls visibility with 'H' key
      if ((e.key === "h" || e.key === "H") && isZenMode) {
        setControlsHidden(!controlsHidden);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isZenMode, isDarkMode, isFullScreen, controlsHidden]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  if (!fileUrl) {
    return (
      <div className="text-center p-4 text-gray-500">No PDF file selected</div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`h-screen w-full relative ${isZenMode ? "zen-mode" : ""}`}
      onMouseMove={showControlsTemporarily}
      onDoubleClick={handleDoubleClick}
    >
      {/* Zen Mode Info Overlay */}
      {showZenModeInfo && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-black/70 text-white px-6 py-4 rounded-lg shadow-lg max-w-md text-center">
            <h3 className="text-lg font-semibold mb-2">Zen Mode Activated</h3>
            <p className="text-sm mb-2">
              Move your mouse to show controls. Double-click to hide/show
              controls completely.
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mt-3">
              <div>Z: Toggle Zen Mode</div>
              <div>F: Toggle Fullscreen</div>
              <div>D: Toggle Dark Mode</div>
              <div>H: Hide/Show Controls</div>
              <div>ESC: Exit</div>
              <div>Double-click: Toggle Controls</div>
            </div>
          </div>
        </div>
      )}

      <div
        id="pdf-controls"
        className={`absolute top-2 right-2 z-10 flex space-x-2 transition-opacity duration-300 ${
          isZenMode
            ? controlsHidden
              ? "opacity-0 pointer-events-none"
              : "opacity-0 hover:opacity-100"
            : "opacity-100"
        }`}
      >
        <button
          onClick={toggleZenMode}
          className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          aria-label={isZenMode ? "Exit zen mode" : "Enter zen mode"}
          title={isZenMode ? "Exit zen mode (Z)" : "Enter zen mode (Z)"}
        >
          {isZenMode ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        <button
          onClick={toggleDarkMode}
          className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          aria-label={isDarkMode ? "Light mode" : "Dark mode"}
          title={isDarkMode ? "Light mode (D)" : "Dark mode (D)"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={toggleFullScreen}
          className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
          title={
            isFullScreen ? "Exit full screen (F)" : "Enter full screen (F)"
          }
        >
          {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
      </div>

      <object
        data={fileUrl}
        type="application/pdf"
        className="w-full h-full"
        style={{
          backgroundColor: isDarkMode ? "#1a1a1a" : "white",
          filter: isDarkMode ? "invert(1) hue-rotate(180deg)" : "none",
        }}
      >
        <div className="text-center p-4 text-red-500">
          Your browser does not support PDF viewing. Please download the file to
          view it.
        </div>
      </object>
    </div>
  );
}
