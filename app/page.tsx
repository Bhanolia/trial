"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RPPData, defaultRPP, migrateRPPData } from "@/types/rpp";
import { exportToDocx } from "@/lib/docx-export";
import { validateRPP, ValidationErrors } from "@/lib/validation";
import {
  Save, Download, FileText, Printer, RotateCcw,
  BookOpen, Users, Lightbulb, GraduationCap, ClipboardCheck, FileSpreadsheet,
  Eye, EyeOff, Undo2, Redo2, AlertCircle
} from "lucide-react";

import { IdentitasTab } from "@/components/rpp/IdentitasTab";
import { IdentifikasiTab } from "@/components/rpp/IdentifikasiTab";
import { DesainTab } from "@/components/rpp/DesainTab";
import { PengalamanTab } from "@/components/rpp/PengalamanTab";
import { AsesmenTab } from "@/components/rpp/AsesmenTab";
import { LampiranTab } from "@/components/rpp/LampiranTab";
import { RPPLivePreview } from "@/components/rpp/RPPLivePreview";

interface HistoryState {
  past: RPPData[];
  present: RPPData;
  future: RPPData[];
}

export default function RPPEditor() {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: defaultRPP,
    future: [],
  });
  const [activeTab, setActiveTab] = useState("identitas");
  const [showPreview, setShowPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);

  const isFirstLoad = useRef(true);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("rpp-data");
      if (raw) {
        const parsed = JSON.parse(raw);
        const migrated = migrateRPPData(parsed);
        setHistory({ past: [], present: migrated, future: [] });
      }
    } catch {
      // Invalid data, use default
    }
  }, []);

  // Auto-save
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    const timer = setTimeout(() => {
      localStorage.setItem("rpp-data", JSON.stringify(history.present));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
    return () => clearTimeout(timer);
  }, [history.present]);

  // Keyboard shortcuts: Ctrl+Z, Ctrl+Y, Ctrl+Shift+Z
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [history]);

  const setData = (updater: (prev: RPPData) => RPPData) => {
    setHistory(prev => {
      const newPresent = updater(prev.present);
      return {
        past: [...prev.past, prev.present].slice(-50),
        present: newPresent,
        future: [],
      };
    });
    setShowErrors(false);
  };

  const handleUndo = () => {
    setHistory(prev => {
      if (prev.past.length === 0) return prev;
      const previous = prev.past[prev.past.length - 1];
      const newPast = prev.past.slice(0, -1);
      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future],
      };
    });
  };

  const handleRedo = () => {
    setHistory(prev => {
      if (prev.future.length === 0) return prev;
      const next = prev.future[0];
      const newFuture = prev.future.slice(1);
      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture,
      };
    });
  };

  const handleExport = async () => {
    const validation = validateRPP(history.present);
    if (!validation.valid) {
      setErrors(validation.errors);
      setShowErrors(true);
      const firstErrorTab = Object.keys(validation.errors)[0];
      if (firstErrorTab) setActiveTab(firstErrorTab);
      return;
    }
    setErrors({});
    setShowErrors(false);
    await exportToDocx(history.present);
  };

  const handlePrint = () => window.print();

  const handleReset = () => {
    if (confirm("Reset semua data ke default? Data yang belum diexport akan hilang.")) {
      setHistory({ past: [], present: defaultRPP, future: [] });
      localStorage.removeItem("rpp-data");
    }
  };

  const data = history.present;
  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">RPP Editor</h1>
              <p className="text-xs text-gray-500">Rencana Pelaksanaan Pembelajaran</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {saved && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded flex items-center gap-1">
                <Save className="w-3 h-3" /> Tersimpan
              </span>
            )}
            {showErrors && Object.keys(errors).length > 0 && (
              <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {Object.keys(errors).length} field perlu diisi
              </span>
            )}
            <Button variant="outline" size="sm" onClick={handleUndo} disabled={!canUndo} title="Undo (Ctrl+Z)">
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleRedo} disabled={!canRedo} title="Redo (Ctrl+Y)">
              <Redo2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
              {showPreview ? "Tutup" : "Preview"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-1" /> Reset
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-1" /> Print
            </Button>
            <Button size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-1" /> Export DOCX
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 no-print">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="identitas" className="gap-1">
              <FileText className="w-4 h-4" /> Identitas
            </TabsTrigger>
            <TabsTrigger value="identifikasi" className="gap-1">
              <Users className="w-4 h-4" /> Identifikasi
            </TabsTrigger>
            <TabsTrigger value="desain" className="gap-1">
              <Lightbulb className="w-4 h-4" /> Desain
            </TabsTrigger>
            <TabsTrigger value="pengalaman" className="gap-1">
              <GraduationCap className="w-4 h-4" /> Pengalaman
            </TabsTrigger>
            <TabsTrigger value="asesmen" className="gap-1">
              <ClipboardCheck className="w-4 h-4" /> Asesmen
            </TabsTrigger>
            <TabsTrigger value="lampiran" className="gap-1">
              <FileSpreadsheet className="w-4 h-4" /> Lampiran
            </TabsTrigger>
          </TabsList>

          <TabsContent value="identitas">
            <IdentitasTab data={data} setData={setData} errors={errors.identitas} />
          </TabsContent>
          <TabsContent value="identifikasi">
            <IdentifikasiTab data={data} setData={setData} errors={errors.identifikasi} />
          </TabsContent>
          <TabsContent value="desain">
            <DesainTab data={data} setData={setData} errors={errors.desain} />
          </TabsContent>
          <TabsContent value="pengalaman">
            <PengalamanTab data={data} setData={setData} errors={errors.pengalaman} />
          </TabsContent>
          <TabsContent value="asesmen">
            <AsesmenTab data={data} setData={setData} errors={errors.asesmen} />
          </TabsContent>
          <TabsContent value="lampiran">
            <LampiranTab data={data} setData={setData} errors={errors.lampiran} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Live Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-3 flex items-center justify-between">
              <h2 className="font-bold text-lg">Live Preview</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                <EyeOff className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-6">
              <RPPLivePreview data={data} />
            </div>
          </div>
        </div>
      )}

      {/* Print-only preview */}
      <div className="print-only hidden">
        <RPPLivePreview data={data} />
      </div>
    </div>
  );
}
