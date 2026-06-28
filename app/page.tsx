"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RPPData, defaultRPP } from "@/types/rpp";
import { exportToDocx } from "@/lib/docx-export";
import {
  Save, Download, FileText, Plus, Trash2, Printer, RotateCcw,
  BookOpen, Users, Lightbulb, GraduationCap, ClipboardCheck, FileSpreadsheet
} from "lucide-react";

export default function RPPEditor() {
  const [data, setData] = useState<RPPData>(defaultRPP);
  const [activeTab, setActiveTab] = useState("identitas");
  const [saved, setSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("rpp-data");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved data", e);
      }
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("rpp-data", JSON.stringify(data));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
    return () => clearTimeout(timer);
  }, [data]);

  const updateField = useCallback(<K extends keyof RPPData>(
    section: K,
    value: RPPData[K]
  ) => {
    setData(prev => ({ ...prev, [section]: value }));
  }, []);

  const updateNested = useCallback(<K extends keyof RPPData, SK extends keyof RPPData[K]>(
    section: K,
    subSection: SK,
    value: RPPData[K][SK]
  ) => {
    setData(prev => ({
      ...prev,
      [section]: { ...prev[section], [subSection]: value },
    }));
  }, []);

  const handleExport = async () => {
    await exportToDocx(data);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm("Reset semua data ke default? Data yang belum diexport akan hilang.")) {
      setData(defaultRPP);
      localStorage.removeItem("rpp-data");
    }
  };

  const addListItem = (section: keyof RPPData, field: string) => {
    const current = (data[section] as any)[field] as string[];
    updateNested(section as any, field as any, [...current, ""]);
  };

  const updateListItem = (section: keyof RPPData, field: string, index: number, value: string) => {
    const current = [...(data[section] as any)[field] as string[]];
    current[index] = value;
    updateNested(section as any, field as any, current);
  };

  const removeListItem = (section: keyof RPPData, field: string, index: number) => {
    const current = [...(data[section] as any)[field] as string[]];
    current.splice(index, 1);
    updateNested(section as any, field as any, current);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">RPP Editor</h1>
              <p className="text-xs text-gray-500">Rencana Pelaksanaan Pembelajaran</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {saved && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                Tersimpan otomatis
              </span>
            )}
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

          {/* IDENTITAS */}
          <TabsContent value="identitas" className="space-y-4">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" /> Identitas Pembelajaran
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nama Satuan Pendidikan</label>
                  <Input
                    value={data.identitas.satuanPendidikan}
                    onChange={e => updateNested("identitas", "satuanPendidikan", e.target.value)}
                    placeholder="SMK..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Mata Pelajaran</label>
                  <Input
                    value={data.identitas.mataPelajaran}
                    onChange={e => updateNested("identitas", "mataPelajaran", e.target.value)}
                    placeholder="Nama mata pelajaran..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nama Guru</label>
                  <Input
                    value={data.identitas.namaGuru}
                    onChange={e => updateNested("identitas", "namaGuru", e.target.value)}
                    placeholder="Nama lengkap guru..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Kelas / Semester</label>
                  <Input
                    value={data.identitas.kelasSemester}
                    onChange={e => updateNested("identitas", "kelasSemester", e.target.value)}
                    placeholder="X / Gasal"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Alokasi Waktu</label>
                  <Input
                    value={data.identitas.alokasiWaktu}
                    onChange={e => updateNested("identitas", "alokasiWaktu", e.target.value)}
                    placeholder="1 X 3 JP x @45 menit"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* IDENTIFIKASI */}
          <TabsContent value="identifikasi" className="space-y-4">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" /> Karakteristik Peserta Didik
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Kesiapan Belajar - Level</label>
                  <Input
                    value={data.identifikasi.karakteristikPeserta.kesiapanBelajar.level}
                    onChange={e => {
                      const updated = { ...data.identifikasi.karakteristikPeserta };
                      updated.kesiapanBelajar = { ...updated.kesiapanBelajar, level: e.target.value };
                      updateNested("identifikasi", "karakteristikPeserta", updated);
                    }}
                  />
                  <label className="text-sm font-medium text-gray-700">Deskripsi</label>
                  <Textarea
                    value={data.identifikasi.karakteristikPeserta.kesiapanBelajar.deskripsi}
                    onChange={e => {
                      const updated = { ...data.identifikasi.karakteristikPeserta };
                      updated.kesiapanBelajar = { ...updated.kesiapanBelajar, deskripsi: e.target.value };
                      updateNested("identifikasi", "karakteristikPeserta", updated);
                    }}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Minat - Bidang</label>
                  <Input
                    value={data.identifikasi.karakteristikPeserta.minat.bidang}
                    onChange={e => {
                      const updated = { ...data.identifikasi.karakteristikPeserta };
                      updated.minat = { ...updated.minat, bidang: e.target.value };
                      updateNested("identifikasi", "karakteristikPeserta", updated);
                    }}
                  />
                  <label className="text-sm font-medium text-gray-700">Deskripsi</label>
                  <Textarea
                    value={data.identifikasi.karakteristikPeserta.minat.deskripsi}
                    onChange={e => {
                      const updated = { ...data.identifikasi.karakteristikPeserta };
                      updated.minat = { ...updated.minat, deskripsi: e.target.value };
                      updateNested("identifikasi", "karakteristikPeserta", updated);
                    }}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Bakat - Bidang</label>
                  <Input
                    value={data.identifikasi.karakteristikPeserta.bakat.bidang}
                    onChange={e => {
                      const updated = { ...data.identifikasi.karakteristikPeserta };
                      updated.bakat = { ...updated.bakat, bidang: e.target.value };
                      updateNested("identifikasi", "karakteristikPeserta", updated);
                    }}
                  />
                  <label className="text-sm font-medium text-gray-700">Deskripsi</label>
                  <Textarea
                    value={data.identifikasi.karakteristikPeserta.bakat.deskripsi}
                    onChange={e => {
                      const updated = { ...data.identifikasi.karakteristikPeserta };
                      updated.bakat = { ...updated.bakat, deskripsi: e.target.value };
                      updateNested("identifikasi", "karakteristikPeserta", updated);
                    }}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Profil Belajar - Gaya</label>
                  <Input
                    value={data.identifikasi.karakteristikPeserta.profilBelajar.gaya}
                    onChange={e => {
                      const updated = { ...data.identifikasi.karakteristikPeserta };
                      updated.profilBelajar = { ...updated.profilBelajar, gaya: e.target.value };
                      updateNested("identifikasi", "karakteristikPeserta", updated);
                    }}
                  />
                  <label className="text-sm font-medium text-gray-700">Deskripsi</label>
                  <Textarea
                    value={data.identifikasi.karakteristikPeserta.profilBelajar.deskripsi}
                    onChange={e => {
                      const updated = { ...data.identifikasi.karakteristikPeserta };
                      updated.profilBelajar = { ...updated.profilBelajar, deskripsi: e.target.value };
                      updateNested("identifikasi", "karakteristikPeserta", updated);
                    }}
                    rows={2}
                  />
                </div>
              </div>

              <h3 className="text-lg font-bold text-blue-900 mb-4">Karakteristik Mata Pelajaran</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Jenis Pengetahuan</label>
                  {data.identifikasi.karakteristikMapel.jenisPengetahuan.map((item, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <span className="text-sm text-gray-500 w-6">{i + 1}.</span>
                      <Textarea
                        value={item}
                        onChange={e => updateListItem("identifikasi", "karakteristikMapel", i, e.target.value)}
                        className="flex-1"
                        rows={1}
                      />
                      <Button variant="ghost" size="sm" onClick={() => removeListItem("identifikasi", "karakteristikMapel", i)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addListItem("identifikasi", "karakteristikMapel")}>
                    <Plus className="w-4 h-4 mr-1" /> Tambah
                  </Button>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Relevansi</label>
                  {data.identifikasi.karakteristikMapel.relevansi.map((item, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <span className="text-sm text-gray-500 w-6">{i + 1}.</span>
                      <Textarea
                        value={item}
                        onChange={e => updateListItem("identifikasi", "relevansi", i, e.target.value)}
                        className="flex-1"
                        rows={1}
                      />
                      <Button variant="ghost" size="sm" onClick={() => removeListItem("identifikasi", "relevansi", i)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addListItem("identifikasi", "relevansi")}>
                    <Plus className="w-4 h-4 mr-1" /> Tambah
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tingkat Kesulitan</label>
                    <Textarea
                      value={data.identifikasi.karakteristikMapel.tingkatKesulitan}
                      onChange={e => {
                        const updated = { ...data.identifikasi.karakteristikMapel, tingkatKesulitan: e.target.value };
                        updateNested("identifikasi", "karakteristikMapel", updated);
                      }}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Struktur Materi</label>
                    <Textarea
                      value={data.identifikasi.karakteristikMapel.strukturMateri}
                      onChange={e => {
                        const updated = { ...data.identifikasi.karakteristikMapel, strukturMateri: e.target.value };
                        updateNested("identifikasi", "karakteristikMapel", updated);
                      }}
                      rows={2}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Integrasi Nilai & Karakter</label>
                  {data.identifikasi.karakteristikMapel.integrasiNilai.map((item, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <span className="text-sm text-gray-500 w-6">{i + 1}.</span>
                      <Textarea
                        value={item}
                        onChange={e => updateListItem("identifikasi", "integrasiNilai", i, e.target.value)}
                        className="flex-1"
                        rows={1}
                      />
                      <Button variant="ghost" size="sm" onClick={() => removeListItem("identifikasi", "integrasiNilai", i)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addListItem("identifikasi", "integrasiNilai")}>
                    <Plus className="w-4 h-4 mr-1" /> Tambah
                  </Button>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Dimensi Profil Lulusan (DPL)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg border">
                    {data.identifikasi.dimensiProfilLulusan.map((item, i) => (
                      <label key={i} className="flex items-start gap-3 p-2 rounded hover:bg-white transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={e => {
                            const updated = [...data.identifikasi.dimensiProfilLulusan];
                            updated[i] = { ...updated[i], checked: e.target.checked };
                            updateNested("identifikasi", "dimensiProfilLulusan", updated);
                          }}
                          className="mt-1 w-4 h-4 accent-blue-600 cursor-pointer"
                        />
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Centang DPL yang sesuai dengan capaian pembelajaran ini</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* DESAIN */}
          <TabsContent value="desain" className="space-y-4">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" /> Desain Pembelajaran
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Capaian Pembelajaran</label>
                  <Textarea
                    value={data.desain.capaianPembelajaran}
                    onChange={e => updateNested("desain", "capaianPembelajaran", e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Lintas Disiplin Ilmu</label>
                    <Input
                      value={data.desain.lintasDisiplin}
                      onChange={e => updateNested("desain", "lintasDisiplin", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Topik Pembelajaran</label>
                    <Input
                      value={data.desain.topik}
                      onChange={e => updateNested("desain", "topik", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tujuan Pembelajaran</label>
                  {data.desain.tujuanPembelajaran.map((item, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <span className="text-sm text-gray-500 w-6">{i + 1}.</span>
                      <Textarea
                        value={item}
                        onChange={e => updateListItem("desain", "tujuanPembelajaran", i, e.target.value)}
                        className="flex-1"
                        rows={1}
                      />
                      <Button variant="ghost" size="sm" onClick={() => removeListItem("desain", "tujuanPembelajaran", i)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addListItem("desain", "tujuanPembelajaran")}>
                    <Plus className="w-4 h-4 mr-1" /> Tambah Tujuan
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Model Pembelajaran</label>
                    <Input
                      value={data.desain.modelPembelajaran}
                      onChange={e => updateNested("desain", "modelPembelajaran", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Metode Pembelajaran</label>
                    <Input
                      value={data.desain.metodePembelajaran}
                      onChange={e => updateNested("desain", "metodePembelajaran", e.target.value)}
                    />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-blue-900 mt-6">Kemitraan Pembelajaran</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Lingkungan Sekolah</label>
                    <Textarea
                      value={data.desain.kemitraan.sekolah}
                      onChange={e => {
                        const updated = { ...data.desain.kemitraan, sekolah: e.target.value };
                        updateNested("desain", "kemitraan", updated);
                      }}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Lingkungan Luar Sekolah</label>
                    <Textarea
                      value={data.desain.kemitraan.luarSekolah}
                      onChange={e => {
                        const updated = { ...data.desain.kemitraan, luarSekolah: e.target.value };
                        updateNested("desain", "kemitraan", updated);
                      }}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Masyarakat</label>
                    <Textarea
                      value={data.desain.kemitraan.masyarakat}
                      onChange={e => {
                        const updated = { ...data.desain.kemitraan, masyarakat: e.target.value };
                        updateNested("desain", "kemitraan", updated);
                      }}
                      rows={3}
                    />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-blue-900 mt-6">Lingkungan Pembelajaran</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Budaya Belajar</label>
                    <Textarea
                      value={data.desain.lingkungan.budaya}
                      onChange={e => {
                        const updated = { ...data.desain.lingkungan, budaya: e.target.value };
                        updateNested("desain", "lingkungan", updated);
                      }}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Ruang Fisik</label>
                    <Textarea
                      value={data.desain.lingkungan.fisik}
                      onChange={e => {
                        const updated = { ...data.desain.lingkungan, fisik: e.target.value };
                        updateNested("desain", "lingkungan", updated);
                      }}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Ruang Virtual</label>
                    <Textarea
                      value={data.desain.lingkungan.virtual}
                      onChange={e => {
                        const updated = { ...data.desain.lingkungan, virtual: e.target.value };
                        updateNested("desain", "lingkungan", updated);
                      }}
                      rows={2}
                    />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-blue-900 mt-6">Pemanfaatan Digital</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Perencanaan</label>
                    <Input
                      value={data.desain.digital.perencanaan}
                      onChange={e => {
                        const updated = { ...data.desain.digital, perencanaan: e.target.value };
                        updateNested("desain", "digital", updated);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Pelaksanaan</label>
                    <Input
                      value={data.desain.digital.pelaksanaan}
                      onChange={e => {
                        const updated = { ...data.desain.digital, pelaksanaan: e.target.value };
                        updateNested("desain", "digital", updated);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Asesmen</label>
                    <Input
                      value={data.desain.digital.asesmen}
                      onChange={e => {
                        const updated = { ...data.desain.digital, asesmen: e.target.value };
                        updateNested("desain", "digital", updated);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* PENGALAMAN BELAJAR */}
          <TabsContent value="pengalaman" className="space-y-4">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" /> Pengalaman Belajar
              </h2>

              {/* Awal */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-blue-800 mb-3">Kegiatan Awal</h3>
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.pengalaman.awal.mindful}
                      onChange={e => {
                        const updated = { ...data.pengalaman.awal, mindful: e.target.checked };
                        updateNested("pengalaman", "awal", updated);
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">Mindful (Berkesadaran)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.pengalaman.awal.meaningful}
                      onChange={e => {
                        const updated = { ...data.pengalaman.awal, meaningful: e.target.checked };
                        updateNested("pengalaman", "awal", updated);
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">Meaningful (Bermakna)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.pengalaman.awal.joyful}
                      onChange={e => {
                        const updated = { ...data.pengalaman.awal, joyful: e.target.checked };
                        updateNested("pengalaman", "awal", updated);
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">Joyful (Menyenangkan)</span>
                  </label>
                </div>
                {data.pengalaman.awal.langkah.map((item, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <span className="text-sm text-gray-500 w-6">{i + 1}.</span>
                    <Textarea
                      value={item}
                      onChange={e => {
                        const updated = [...data.pengalaman.awal.langkah];
                        updated[i] = e.target.value;
                        updateNested("pengalaman", "awal", { ...data.pengalaman.awal, langkah: updated });
                      }}
                      className="flex-1"
                      rows={2}
                    />
                    <Button variant="ghost" size="sm" onClick={() => {
                      const updated = [...data.pengalaman.awal.langkah];
                      updated.splice(i, 1);
                      updateNested("pengalaman", "awal", { ...data.pengalaman.awal, langkah: updated });
                    }}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => {
                  const updated = [...data.pengalaman.awal.langkah, ""];
                  updateNested("pengalaman", "awal", { ...data.pengalaman.awal, langkah: updated });
                }}>
                  <Plus className="w-4 h-4 mr-1" /> Tambah Langkah
                </Button>
              </div>

              {/* Inti - Memahami */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-blue-800 mb-3">Kegiatan Inti - Memahami</h3>
                {data.pengalaman.inti.memahami.map((item, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <span className="text-sm text-gray-500 w-6">{i + 1}.</span>
                    <Textarea
                      value={item}
                      onChange={e => {
                        const updated = { ...data.pengalaman.inti };
                        updated.memahami = [...updated.memahami];
                        updated.memahami[i] = e.target.value;
                        updateNested("pengalaman", "inti", updated);
                      }}
                      className="flex-1"
                      rows={2}
                    />
                    <Button variant="ghost" size="sm" onClick={() => {
                      const updated = { ...data.pengalaman.inti };
                      updated.memahami = [...updated.memahami];
                      updated.memahami.splice(i, 1);
                      updateNested("pengalaman", "inti", updated);
                    }}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => {
                  const updated = { ...data.pengalaman.inti };
                  updated.memahami = [...updated.memahami, ""];
                  updateNested("pengalaman", "inti", updated);
                }}>
                  <Plus className="w-4 h-4 mr-1" /> Tambah
                </Button>
              </div>

              {/* Inti - Mengaplikasi */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-blue-800 mb-3">Kegiatan Inti - Mengaplikasi</h3>
                {data.pengalaman.inti.mengaplikasi.map((item, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <span className="text-sm text-gray-500 w-6">{i + 1}.</span>
                    <Textarea
                      value={item}
                      onChange={e => {
                        const updated = { ...data.pengalaman.inti };
                        updated.mengaplikasi = [...updated.mengaplikasi];
                        updated.mengaplikasi[i] = e.target.value;
                        updateNested("pengalaman", "inti", updated);
                      }}
                      className="flex-1"
                      rows={2}
                    />
                    <Button variant="ghost" size="sm" onClick={() => {
                      const updated = { ...data.pengalaman.inti };
                      updated.mengaplikasi = [...updated.mengaplikasi];
                      updated.mengaplikasi.splice(i, 1);
                      updateNested("pengalaman", "inti", updated);
                    }}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => {
                  const updated = { ...data.pengalaman.inti };
                  updated.mengaplikasi = [...updated.mengaplikasi, ""];
                  updateNested("pengalaman", "inti", updated);
                }}>
                  <Plus className="w-4 h-4 mr-1" /> Tambah
                </Button>
              </div>

              {/* Inti - Merefleksi */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-blue-800 mb-3">Kegiatan Inti - Merefleksi</h3>
                {data.pengalaman.inti.merefleksi.map((item, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <span className="text-sm text-gray-500 w-6">{i + 1}.</span>
                    <Textarea
                      value={item}
                      onChange={e => {
                        const updated = { ...data.pengalaman.inti };
                        updated.merefleksi = [...updated.merefleksi];
                        updated.merefleksi[i] = e.target.value;
                        updateNested("pengalaman", "inti", updated);
                      }}
                      className="flex-1"
                      rows={2}
                    />
                    <Button variant="ghost" size="sm" onClick={() => {
                      const updated = { ...data.pengalaman.inti };
                      updated.merefleksi = [...updated.merefleksi];
                      updated.merefleksi.splice(i, 1);
                      updateNested("pengalaman", "inti", updated);
                    }}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => {
                  const updated = { ...data.pengalaman.inti };
                  updated.merefleksi = [...updated.merefleksi, ""];
                  updateNested("pengalaman", "inti", updated);
                }}>
                  <Plus className="w-4 h-4 mr-1" /> Tambah
                </Button>
              </div>

              {/* Penutup */}
              <div>
                <h3 className="text-lg font-bold text-blue-800 mb-3">Kegiatan Penutup</h3>
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.pengalaman.penutup.mindful}
                      onChange={e => {
                        const updated = { ...data.pengalaman.penutup, mindful: e.target.checked };
                        updateNested("pengalaman", "penutup", updated);
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">Mindful</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.pengalaman.penutup.meaningful}
                      onChange={e => {
                        const updated = { ...data.pengalaman.penutup, meaningful: e.target.checked };
                        updateNested("pengalaman", "penutup", updated);
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">Meaningful</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.pengalaman.penutup.joyful}
                      onChange={e => {
                        const updated = { ...data.pengalaman.penutup, joyful: e.target.checked };
                        updateNested("pengalaman", "penutup", updated);
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">Joyful</span>
                  </label>
                </div>
                {data.pengalaman.penutup.langkah.map((item, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <span className="text-sm text-gray-500 w-6">{i + 1}.</span>
                    <Textarea
                      value={item}
                      onChange={e => {
                        const updated = [...data.pengalaman.penutup.langkah];
                        updated[i] = e.target.value;
                        updateNested("pengalaman", "penutup", { ...data.pengalaman.penutup, langkah: updated });
                      }}
                      className="flex-1"
                      rows={2}
                    />
                    <Button variant="ghost" size="sm" onClick={() => {
                      const updated = [...data.pengalaman.penutup.langkah];
                      updated.splice(i, 1);
                      updateNested("pengalaman", "penutup", { ...data.pengalaman.penutup, langkah: updated });
                    }}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => {
                  const updated = [...data.pengalaman.penutup.langkah, ""];
                  updateNested("pengalaman", "penutup", { ...data.pengalaman.penutup, langkah: updated });
                }}>
                  <Plus className="w-4 h-4 mr-1" /> Tambah Langkah
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* ASESMEN */}
          <TabsContent value="asesmen" className="space-y-4">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5" /> Asesmen Pembelajaran
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Asesmen Awal</label>
                  <Textarea
                    value={data.asesmen.awal}
                    onChange={e => updateNested("asesmen", "awal", e.target.value)}
                    rows={3}
                    placeholder="Deskripsi asesmen awal..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Asesmen Proses</label>
                  <Textarea
                    value={data.asesmen.proses}
                    onChange={e => updateNested("asesmen", "proses", e.target.value)}
                    rows={3}
                    placeholder="Deskripsi asesmen proses..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Asesmen Akhir</label>
                  <Textarea
                    value={data.asesmen.akhir}
                    onChange={e => updateNested("asesmen", "akhir", e.target.value)}
                    rows={3}
                    placeholder="Deskripsi asesmen akhir..."
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* LAMPIRAN */}
          <TabsContent value="lampiran" className="space-y-4">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5" /> Lampiran
              </h2>

              <h3 className="text-lg font-bold text-blue-800 mb-3">Rubrik Penilaian Sikap</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">Aspek</th>
                      <th className="border p-2">Indikator</th>
                      <th className="border p-2">Skor 4</th>
                      <th className="border p-2">Skor 3</th>
                      <th className="border p-2">Skor 2</th>
                      <th className="border p-2">Skor 1</th>
                      <th className="border p-2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.lampiran.rubrikSikap.map((item, i) => (
                      <tr key={i}>
                        <td className="border p-2">
                          <Textarea
                            value={item.aspek}
                            onChange={e => {
                              const updated = [...data.lampiran.rubrikSikap];
                              updated[i] = { ...updated[i], aspek: e.target.value };
                              updateNested("lampiran", "rubrikSikap", updated);
                            }}
                            className="min-h-[60px]"
                            rows={2}
                          />
                        </td>
                        <td className="border p-2">
                          <Textarea
                            value={item.indikator}
                            onChange={e => {
                              const updated = [...data.lampiran.rubrikSikap];
                              updated[i] = { ...updated[i], indikator: e.target.value };
                              updateNested("lampiran", "rubrikSikap", updated);
                            }}
                            className="min-h-[60px]"
                            rows={2}
                          />
                        </td>
                        <td className="border p-2">
                          <Textarea
                            value={item.skor4}
                            onChange={e => {
                              const updated = [...data.lampiran.rubrikSikap];
                              updated[i] = { ...updated[i], skor4: e.target.value };
                              updateNested("lampiran", "rubrikSikap", updated);
                            }}
                            className="min-h-[60px]"
                            rows={2}
                          />
                        </td>
                        <td className="border p-2">
                          <Textarea
                            value={item.skor3}
                            onChange={e => {
                              const updated = [...data.lampiran.rubrikSikap];
                              updated[i] = { ...updated[i], skor3: e.target.value };
                              updateNested("lampiran", "rubrikSikap", updated);
                            }}
                            className="min-h-[60px]"
                            rows={2}
                          />
                        </td>
                        <td className="border p-2">
                          <Textarea
                            value={item.skor2}
                            onChange={e => {
                              const updated = [...data.lampiran.rubrikSikap];
                              updated[i] = { ...updated[i], skor2: e.target.value };
                              updateNested("lampiran", "rubrikSikap", updated);
                            }}
                            className="min-h-[60px]"
                            rows={2}
                          />
                        </td>
                        <td className="border p-2">
                          <Textarea
                            value={item.skor1}
                            onChange={e => {
                              const updated = [...data.lampiran.rubrikSikap];
                              updated[i] = { ...updated[i], skor1: e.target.value };
                              updateNested("lampiran", "rubrikSikap", updated);
                            }}
                            className="min-h-[60px]"
                            rows={2}
                          />
                        </td>
                        <td className="border p-2">
                          <Button variant="ghost" size="sm" onClick={() => {
                            const updated = [...data.lampiran.rubrikSikap];
                            updated.splice(i, 1);
                            updateNested("lampiran", "rubrikSikap", updated);
                          }}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button variant="outline" size="sm" onClick={() => {
                const updated = [...data.lampiran.rubrikSikap, {
                  aspek: "", indikator: "", skor4: "", skor3: "", skor2: "", skor1: ""
                }];
                updateNested("lampiran", "rubrikSikap", updated);
              }}>
                <Plus className="w-4 h-4 mr-1" /> Tambah Aspek
              </Button>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Link Jobsheet</label>
                  <Input
                    value={data.lampiran.jobsheet}
                    onChange={e => updateNested("lampiran", "jobsheet", e.target.value)}
                    placeholder="https://..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tempat</label>
                    <Input
                      value={data.tempat}
                      onChange={e => updateField("tempat", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tanggal</label>
                    <Input
                      value={data.tanggal}
                      onChange={e => updateField("tanggal", e.target.value)}
                    />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-blue-800 mt-4">Penandatangan</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Kepala Sekolah</label>
                    <Input
                      value={data.lampiran.penandatangan.kepalaSekolah}
                      onChange={e => {
                        const updated = { ...data.lampiran.penandatangan, kepalaSekolah: e.target.value };
                        updateNested("lampiran", "penandatangan", updated);
                      }}
                      placeholder="Nama Kepala Sekolah"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Kurikulum</label>
                    <Input
                      value={data.lampiran.penandatangan.kurikulum}
                      onChange={e => {
                        const updated = { ...data.lampiran.penandatangan, kurikulum: e.target.value };
                        updateNested("lampiran", "penandatangan", updated);
                      }}
                      placeholder="Nama Koordinator Kurikulum"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Guru</label>
                    <Input
                      value={data.lampiran.penandatangan.guru}
                      onChange={e => {
                        const updated = { ...data.lampiran.penandatangan, guru: e.target.value };
                        updateNested("lampiran", "penandatangan", updated);
                      }}
                      placeholder="Nama Guru"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Print Preview */}
      <div className="print-only hidden">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-2xl font-bold text-center mb-2">RENCANA PELAKSANAAN PEMBELAJARAN</h1>
          <h2 className="text-xl font-bold text-center mb-8">DEEP LEARNING</h2>
          <table className="w-full border-collapse border border-black text-sm">
            <tbody>
              <tr>
                <td rowSpan={5} className="border border-black p-2 font-bold bg-gray-100">IDENTITAS</td>
                <td className="border border-black p-2">Nama Satuan Pendidikan</td>
                <td className="border border-black p-2">:</td>
                <td colSpan={8} className="border border-black p-2">{data.identitas.satuanPendidikan}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">Mata Pelajaran</td>
                <td className="border border-black p-2">:</td>
                <td colSpan={8} className="border border-black p-2">{data.identitas.mataPelajaran}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">Nama Guru</td>
                <td className="border border-black p-2">:</td>
                <td colSpan={8} className="border border-black p-2">{data.identitas.namaGuru}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">Kelas/ semester</td>
                <td className="border border-black p-2">:</td>
                <td colSpan={8} className="border border-black p-2">{data.identitas.kelasSemester}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">Alokasi Waktu</td>
                <td className="border border-black p-2"></td>
                <td colSpan={8} className="border border-black p-2">{data.identitas.alokasiWaktu}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-8 text-right">
            <p>{data.tempat}, {data.tanggal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
