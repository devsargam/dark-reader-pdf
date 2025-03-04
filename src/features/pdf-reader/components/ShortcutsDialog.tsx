"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ShortcutsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ShortcutsDialog({
  isOpen,
  onOpenChange,
}: ShortcutsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div className="font-medium text-foreground bg-muted px-2 py-1 rounded text-center">
              Z
            </div>
            <div className="text-foreground">Toggle Zen Mode</div>

            <div className="font-medium text-foreground bg-muted px-2 py-1 rounded text-center">
              F
            </div>
            <div className="text-foreground">Toggle Fullscreen</div>

            <div className="font-medium text-foreground bg-muted px-2 py-1 rounded text-center">
              D
            </div>
            <div className="text-foreground">Toggle Dark Mode</div>

            <div className="font-medium text-foreground bg-muted px-2 py-1 rounded text-center">
              H
            </div>
            <div className="text-foreground">
              Hide/Show Controls in Zen Mode
            </div>

            <div className="font-medium text-foreground bg-muted px-2 py-1 rounded text-center">
              Escape
            </div>
            <div className="text-foreground">Exit Zen Mode / Fullscreen</div>

            <div className="font-medium text-foreground bg-muted px-2 py-1 rounded text-center">
              Double-click
            </div>
            <div className="text-foreground">Toggle Controls in Zen Mode</div>
          </div>

          <div className="pt-2 text-sm text-muted-foreground bg-card p-3 rounded-lg border border-border mt-4">
            <p>
              In Zen Mode, move your mouse to temporarily show controls, or
              double-click to toggle controls visibility.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
