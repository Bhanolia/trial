"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RPPData, defaultRPP, migrateRPPData } from "@/types/rpp";
import { exportToDocx } from "@/lib/docx-export";
import {
  Save, Download, FileText, Plus, Trash2, Printer, RotateCcw,
  BookOpen, Users, Lightbulb, GraduationCap, ClipboardCheck, FileSpreadsheet,
  Eye, EyeOff
} from "lucide-react";

// ─── Live Preview Component ───
function RPPLivePreview({ data }: { data: RPPData }) {
  const checkedDPL = data.identifikasi.dimensiProfilLulusan.filter(d => d.checked);
  const uncheckedDPL = data.identifikasi.dimensiProfilLulusan.filter(d => !d.checked);

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 text-sm text-gray-800 rpp-preview">
      <style jsx>{`
        .rpp-preview h2 { font-size: 1.1rem; font-weight: 700; text-align: center; margin-bottom: 0.25rem; }
        .rpp-preview h3 { font-size: 0.95rem; font-weight: 700; text-align: center; margin-bottom: 1rem; color: #1e3a5f; }
        .rpp-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
        .rpp-table th, .rpp-table td { border: 1px solid #333; padding: 4px 6px; vertical-align: top; }
        .rpp-table th { background: #e0e7ff; font-weight: 600; text-align: center; }
        .rpp-table .shaded { background: #f3f4f6; }
        .rpp-table .center { text-align: center; }
        .rpp-table .bold { font-weight: 700; }
        .rpp-table .dpl-check { display: inline-block; width: 1.2em; text-align: center; }
        .rpp-table .dpl-checked { color: #16a34a; font-weight: 700; }
        .rpp-table .dpl-unchecked { color: #9ca3af; }
        .rpp-table ul { margin: 0; padding-left: 1.2em; }
        .rpp-table li { margin-bottom: 2px; }
        .signature-row { margin-top: 2rem; display: flex; justify-content: space-between; text-align: center; }
        .signature-col { width: 30%; }
        .signature-line { border-top: 1px solid #333; margin-top: 3rem; padding-top: 4px; font-weight: 600; }
        .lampiran-title { font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        .rubrik-table { width: 100%; border-collapse: collapse; font-size: 0.75rem; margin-top: 0.5rem; }
        .rubrik-table th, .rubrik-table td { border: 1px solid #333; padding: 4px; vertical-align: top; }
        .rubrik-table th { background: #e0e7ff; }
        .rubrik-table td:first-child { font-weight: 600; }
      `}</style>

      <h2>RENCANA PELAKSANAAN PEMBELAJARAN</h2>
      <h3>DEEP LEARNING</h3>

      <table className="rpp-table">
        <tbody>
          {/* IDENTITAS */}
          <tr>
            <td rowSpan={5} className="shaded bold center">IDENTITAS</td>
            <td>Nama Satuan Pendidikan</td>
            <td className="center">:</td>
            <td colSpan={8}>{data.identitas.satuanPendidikan}</td>
          </tr>
          <tr>
            <td>Mata Pelajaran</td>
            <td className="center">:</td>
            <td colSpan={8}>{data.identitas.mataPelajaran}</td>
          </tr>
          <tr>
            <td>Nama Guru</td>
            <td className="center">:</td>
            <td colSpan={8}>{data.identitas.namaGuru}</td>
          </tr>
          <tr>
            <td>Kelas/ semester</td>
            <td className="center">:</td>
            <td colSpan={8}>{data.identitas.kelasSemester}</td>
          </tr>
          <tr>
            <td>Alokasi Waktu</td>
            <td className="center"></td>
            <td colSpan={8}>{data.identitas.alokasiWaktu}</td>
          </tr>

          {/* IDENTIFIKASI */}
          <tr>
            <td rowSpan={19} className="shaded bold center">IDENTIFIKASI</td>
            <td colSpan={10} className="bold center" style={{background:'#e0e7ff'}}>KARAKTERISTIK PESERTA DIDIK</td>
          </tr>
          <tr>
            <td rowSpan={2}>Kesiapan Belajar</td>
            <td colSpan={4} className="center">Belum Siap</td>
            <td colSpan={4} className="center">Siap</td>
            <td className="center">Sangat Siap</td>
          </tr>
          <tr>
            <td colSpan={4}></td>
            <td colSpan={4}>{data.identifikasi.karakteristikPeserta.kesiapanBelajar.deskripsi}</td>
            <td className="center">.</td>
          </tr>
          <tr>
            <td rowSpan={2}>Minat</td>
            <td colSpan={4} className="center">Teknik</td>
            <td colSpan={4} className="center">Sains/Kedokteran</td>
            <td className="center">Humaniora</td>
          </tr>
          <tr>
            <td colSpan={4}>{data.identifikasi.karakteristikPeserta.minat.deskripsi}</td>
            <td colSpan={4}></td>
            <td></td>
          </tr>
          <tr>
            <td rowSpan={2}>Bakat</td>
            <td colSpan={4}></td>
            <td colSpan={4}></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
            <td colSpan={4}>{data.identifikasi.karakteristikPeserta.bakat.deskripsi}</td>
            <td></td>
          </tr>
          <tr>
            <td rowSpan={2}>Profil Belajar</td>
            <td colSpan={4} className="center">Visual</td>
            <td colSpan={4} className="center">Auditori</td>
            <td className="center">Kinestetik</td>
          </tr>
          <tr>
            <td colSpan={4}></td>
            <td colSpan={4}></td>
            <td>{data.identifikasi.karakteristikPeserta.profilBelajar.deskripsi}</td>
          </tr>

          <tr>
            <td colSpan={10} className="bold center" style={{background:'#e0e7ff'}}>KARAKTERISTIK MATA PELAJARAN</td>
          </tr>
          <tr>
            <td>Jenis pengetahuan yang akan dicapai</td>
            <td colSpan={9}>
              <ul>{data.identifikasi.karakteristikMapel.jenisPengetahuan.map((p,i)=><li key={i}>{i+1}. {p}</li>)}</ul>
            </td>
          </tr>
          <tr>
            <td>Relevansi dengan kehidupan nyata</td>
            <td colSpan={9}>
              <ul>{data.identifikasi.karakteristikMapel.relevansi.map((r,i)=><li key={i}>{i+1}. {r}</li>)}</ul>
            </td>
          </tr>
          <tr>
            <td>Tingkat kesulitan</td>
            <td colSpan={9}>{data.identifikasi.karakteristikMapel.tingkatKesulitan}</td>
          </tr>
          <tr>
            <td>Struktur Materi</td>
            <td colSpan={9}>{data.identifikasi.karakteristikMapel.strukturMateri}</td>
          </tr>
          <tr>
            <td>Integrasi Nilai dan karakter</td>
            <td colSpan={9}>
              <ul>{data.identifikasi.karakteristikMapel.integrasiNilai.map((n,i)=><li key={i}>{i+1}. {n}</li>)}</ul>
            </td>
          </tr>

          {/* DPL */}
          <tr>
            <td rowSpan={Math.max(4, 1 + Math.ceil(checkedDPL.length/2) + (uncheckedDPL.length>0 ? 1+Math.ceil(uncheckedDPL.length/2) : 0))} className="bold">Dimensi Profil Lulusan</td>
            <td colSpan={9} className="bold" style={{background:'#e0e7ff'}}>DPL yang dicapai:</td>
          </tr>
          {checkedDPL.length > 0 ? (
            Array.from({length: Math.ceil(checkedDPL.length/2)}).map((_, rowIdx) => (
              <tr key={`dpl-c-${rowIdx}`}>
                <td colSpan={4}><span className="dpl-check dpl-checked">[v]</span> {checkedDPL[rowIdx*2]?.label}</td>
                <td colSpan={5}><span className="dpl-check dpl-checked">[v]</span> {checkedDPL[rowIdx*2+1]?.label || ''}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={9} className="center">(Tidak ada DPL yang dicentang)</td></tr>
          )}
          {uncheckedDPL.length > 0 && (
            <>
              <tr><td colSpan={9} className="bold" style={{background:'#f3f4f6'}}>DPL lainnya:</td></tr>
              {Array.from({length: Math.ceil(uncheckedDPL.length/2)}).map((_, rowIdx) => (
                <tr key={`dpl-u-${rowIdx}`}>
                  <td colSpan={4}><span className="dpl-check dpl-unchecked">[ ]</span> {uncheckedDPL[rowIdx*2]?.label}</td>
                  <td colSpan={5}><span className="dpl-check dpl-unchecked">[ ]</span> {uncheckedDPL[rowIdx*2+1]?.label || ''}</td>
                </tr>
              ))}
            </>
          )}

          {/* DESAIN PEMBELAJARAN */}
          <tr>
            <td rowSpan={15} className="shaded bold center">DESAIN PEMBELAJARAN</td>
            <td>Capaian Pembelajaran</td>
            <td colSpan={9}>{data.desain.capaianPembelajaran}</td>
          </tr>
          <tr>
            <td>Lintas Disiplin Ilmu</td>
            <td colSpan={9}>{data.desain.lintasDisiplin}</td>
          </tr>
          <tr>
            <td>Tujuan Pembelajaran</td>
            <td colSpan={9}>
              <ul>{data.desain.tujuanPembelajaran.map((t,i)=><li key={i}>{i+1}. {t}</li>)}</ul>
            </td>
          </tr>
          <tr>
            <td>Topik Pembelajaran</td>
            <td colSpan={9}>{data.desain.topik}</td>
          </tr>
          <tr>
            <td colSpan={5}>Model Pembelajaran</td>
            <td colSpan={5}>{data.desain.modelPembelajaran}</td>
          </tr>
          <tr>
            <td colSpan={5}>Metode Pembelajaran</td>
            <td colSpan={5}>{data.desain.metodePembelajaran}</td>
          </tr>
          <tr>
            <td rowSpan={3}>Kemitraan Pembelajaran</td>
            <td colSpan={5}>Lingkungan Sekolah</td>
            <td colSpan={4}>{data.desain.kemitraan.sekolah}</td>
          </tr>
          <tr>
            <td colSpan={5}>Lingkungan Luar Sekolah</td>
            <td colSpan={4}>{data.desain.kemitraan.luarSekolah}</td>
          </tr>
          <tr>
            <td colSpan={5}>Masyarakat</td>
            <td colSpan={4}>{data.desain.kemitraan.masyarakat}</td>
          </tr>
          <tr>
            <td rowSpan={3}>Lingkungan Pembelajaran</td>
            <td colSpan={5}>Budaya Belajar</td>
            <td colSpan={4}>{data.desain.lingkungan.budaya}</td>
          </tr>
          <tr>
            <td colSpan={5}>Optimalisasi Ruang Fisik</td>
            <td colSpan={4}>{data.desain.lingkungan.fisik}</td>
          </tr>
          <tr>
            <td colSpan={5}>Pemanfaatan Ruang Virtual</td>
            <td colSpan={4}>{data.desain.lingkungan.virtual}</td>
          </tr>
          <tr>
            <td rowSpan={3}>Pemanfaatan Digital</td>
            <td colSpan={5}>Perencanaan Pembelajaran</td>
            <td colSpan={4}>{data.desain.digital.perencanaan}</td>
          </tr>
          <tr>
            <td colSpan={5}>Pelaksanaan Pembelajaran</td>
            <td colSpan={4}>{data.desain.digital.pelaksanaan}</td>
          </tr>
          <tr>
            <td colSpan={5}>Asesmen Pembelajaran</td>
            <td colSpan={4}>{data.desain.digital.asesmen}</td>
          </tr>

          {/* PENGALAMAN BELAJAR */}
          <tr>
            <td rowSpan={10} className="shaded bold center">PENGALAMAN BELAJAR</td>
            <td colSpan={10} className="bold center" style={{background:'#e0e7ff'}}>Langkah Pembelajaran</td>
          </tr>
          <tr>
            <td rowSpan={3}>Awal</td>
            <td rowSpan={2}>Prinsip Pembelajaran</td>
            <td colSpan={3} className="center">Mindful (Berkesadaran)</td>
            <td colSpan={3} className="center">Meaningful (Bermakna)</td>
            <td colSpan={2} className="center">Joyful (Menyenangkan)</td>
          </tr>
          <tr>
            <td colSpan={3} className="center bold">{data.pengalaman.awal.mindful ? 'V' : ''}</td>
            <td colSpan={3} className="center bold">{data.pengalaman.awal.meaningful ? 'V' : ''}</td>
            <td colSpan={2} className="center bold">{data.pengalaman.awal.joyful ? 'V' : ''}</td>
          </tr>
          <tr>
            <td colSpan={9}>
              <ul>{data.pengalaman.awal.langkah.map((l,i)=><li key={i}>{i+1}. {l}</li>)}</ul>
            </td>
          </tr>
          <tr>
            <td rowSpan={3}>Inti</td>
            <td>Memahami</td>
            <td colSpan={8}>
              <ul>{data.pengalaman.inti.memahami.map((l,i)=><li key={i}>{i+1}. {l}</li>)}</ul>
            </td>
          </tr>
          <tr>
            <td>Mengaplikasi</td>
            <td colSpan={8}>
              <ul>{data.pengalaman.inti.mengaplikasi.map((l,i)=><li key={i}>{i+1}. {l}</li>)}</ul>
            </td>
          </tr>
          <tr>
            <td>Merefleksi</td>
            <td colSpan={8}>
              <ul>{data.pengalaman.inti.merefleksi.map((l,i)=><li key={i}>{i+1}. {l}</li>)}</ul>
            </td>
          </tr>
          <tr>
            <td rowSpan={3}>Penutup</td>
            <td rowSpan={2}>Prinsip Pembelajaran</td>
            <td colSpan={3} className="center">Mindful (Berkesadaran)</td>
            <td colSpan={3} className="center">Meaningful (Bermakna)</td>
            <td colSpan={2} className="center">Joyful (Menyenangkan)</td>
          </tr>
          <tr>
            <td colSpan={3} className="center bold">{data.pengalaman.penutup.mindful ? 'v' : ''}</td>
            <td colSpan={3} className="center bold">{data.pengalaman.penutup.meaningful ? 'v' : ''}</td>
            <td colSpan={2} className="center bold">{data.pengalaman.penutup.joyful ? 'v' : ''}</td>
          </tr>
          <tr>
            <td colSpan={9}>
              <ul>{data.pengalaman.penutup.langkah.map((l,i)=><li key={i}>{i+1}. {l}</li>)}</ul>
            </td>
          </tr>

          {/* ASESMEN */}
          <tr>
            <td rowSpan={3} className="shaded bold center">ASESMEN</td>
            <td>Asesmen pada Awal Pembelajaran</td>
            <td colSpan={9}>{data.asesmen.awal}</td>
          </tr>
          <tr>
            <td>Asesmen pada Proses Pembelajaran</td>
            <td colSpan={9}>{data.asesmen.proses}</td>
          </tr>
          <tr>
            <td>Asesmen pada Akhir Pembelajaran</td>
            <td colSpan={9}>{data.asesmen.akhir}</td>
          </tr>
        </tbody>
      </table>

      {/* Lampiran */}
      <div className="lampiran-title">Lampiran</div>
      <div className="lampiran-title">1. Rubrik penilaian observasi sikap</div>
      <table className="rubrik-table">
        <thead>
          <tr>
            <th>Aspek</th>
            <th>Indikator</th>
            <th>Skor 4 (Sangat Baik)</th>
            <th>Skor 3 (Baik)</th>
            <th>Skor 2 (Cukup)</th>
            <th>Skor 1 (Perlu Bimbingan)</th>
          </tr>
        </thead>
        <tbody>
          {data.lampiran.rubrikSikap.map((r,i) => (
            <tr key={i}>
              <td>{r.aspek}</td>
              <td>{r.indikator}</td>
              <td>{r.skor4}</td>
              <td>{r.skor3}</td>
              <td>{r.skor2}</td>
              <td>{r.skor1}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="lampiran-title">2. Jobsheet: {data.lampiran.jobsheet}</div>
      <div className="lampiran-title">3. Rubrik penilaian presentasi penggunaan alat</div>

      <div style={{marginTop:'2rem', textAlign:'right'}}>{data.tempat}, {data.tanggal}</div>

      <div className="signature-row">
        <div className="signature-col">
          <div>Kepala Sekolah</div>
          <div className="signature-line">{data.lampiran.penandatangan.kepalaSekolah || "_________________"}</div>
        </div>
        <div className="signature-col">
          <div>Kurikulum</div>
          <div className="signature-line">{data.lampiran.penandatangan.kurikulum || "_________________"}</div>
        </div>
        <div className="signature-col">
          <div>Guru</div>
          <div className="signature-line">{data.lampiran.penandatangan.guru || "_________________"}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Editor ───
export default function RPPEditor() {
  const [data, setData] = useState<RPPData>(defaultRPP);
  const [activeTab, setActiveTab] = useState("identitas");
  const [saved, setSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount with migration
  useEffect(() => {
    const savedRaw = localStorage.getItem("rpp-data");
    if (savedRaw) {
      try {
        const parsed = JSON.parse(savedRaw);
        setData(migrateRPPData(parsed));
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
            <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
              {showPreview ? "Tutup Preview" : "Live Preview"}
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

              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" /> Karakteristik Mata Pelajaran
              </h3>
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Jenis Pengetahuan yang Akan Dicapai</label>
                  {data.identifikasi.karakteristikMapel.jenisPengetahuan.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={e => {
                          const updated = [...data.identifikasi.karakteristikMapel.jenisPengetahuan];
                          updated[i] = e.target.value;
                          updateNested("identifikasi", "karakteristikMapel", {
                            ...data.identifikasi.karakteristikMapel,
                            jenisPengetahuan: updated,
                          });
                        }}
                        placeholder={`Item ${i + 1}`}
                      />
                      <Button variant="ghost" size="icon" onClick={() => {
                        const updated = [...data.identifikasi.karakteristikMapel.jenisPengetahuan];
                        updated.splice(i, 1);
                        updateNested("identifikasi", "karakteristikMapel", {
                          ...data.identifikasi.karakteristikMapel,
                          jenisPengetahuan: updated,
                        });
                      }}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => {
                    updateNested("identifikasi", "karakteristikMapel", {
                      ...data.identifikasi.karakteristikMapel,
                      jenisPengetahuan: [...data.identifikasi.karakteristikMapel.jenisPengetahuan, ""],
                    });
                  }}>
                    <Plus className="w-4 h-4 mr-1" /> Tambah
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Relevansi dengan Kehidupan Nyata</label>
                  {data.identifikasi.karakteristikMapel.relevansi.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <Textarea
                        value={item}
                        onChange={e => {
                          const updated = [...data.identifikasi.karakteristikMapel.relevansi];
                          updated[i] = e.target.value;
                          updateNested("identifikasi", "karakteristikMapel", {
                            ...data.identifikasi.karakteristikMapel,
                            relevansi: updated,
                          });
                        }}
                        placeholder={`Item ${i + 1}`}
                        rows={2}
                      />
                      <Button variant="ghost" size="icon" onClick={() => {
                        const updated = [...data.identifikasi.karakteristikMapel.relevansi];
                        updated.splice(i, 1);
                        updateNested("identifikasi", "karakteristikMapel", {
                          ...data.identifikasi.karakteristikMapel,
                          relevansi: updated,
                        });
                      }}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => {
                    updateNested("identifikasi", "karakteristikMapel", {
                      ...data.identifikasi.karakteristikMapel,
                      relevansi: [...data.identifikasi.karakteristikMapel.relevansi, ""],
                    });
                  }}>
                    <Plus className="w-4 h-4 mr-1" /> Tambah
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tingkat Kesulitan</label>
                    <Input
                      value={data.identifikasi.karakteristikMapel.tingkatKesulitan}
                      onChange={e => updateNested("identifikasi", "karakteristikMapel", {
                        ...data.identifikasi.karakteristikMapel,
                        tingkatKesulitan: e.target.value,
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Struktur Materi</label>
                    <Input
                      value={data.identifikasi.karakteristikMapel.strukturMateri}
                      onChange={e => updateNested("identifikasi", "karakteristikMapel", {
                        ...data.identifikasi.karakteristikMapel,
                        strukturMateri: e.target.value,
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Integrasi Nilai dan Karakter</label>
                  {data.identifikasi.karakteristikMapel.integrasiNilai.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <Textarea
                        value={item}
                        onChange={e => {
                          const updated = [...data.identifikasi.karakteristikMapel.integrasiNilai];
                          updated[i] = e.target.value;
                          updateNested("identifikasi", "karakteristikMapel", {
                            ...data.identifikasi.karakteristikMapel,
                            integrasiNilai: updated,
                          });
                        }}
                        placeholder={`Item ${i + 1}`}
                        rows={2}
                      />
                      <Button variant="ghost" size="icon" onClick={() => {
                        const updated = [...data.identifikasi.karakteristikMapel.integrasiNilai];
                        updated.splice(i, 1);
                        updateNested("identifikasi", "karakteristikMapel", {
                          ...data.identifikasi.karakteristikMapel,
                          integrasiNilai: updated,
                        });
                      }}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => {
                    updateNested("identifikasi", "karakteristikMapel", {
                      ...data.identifikasi.karakteristikMapel,
                      integrasiNilai: [...data.identifikasi.karakteristikMapel.integrasiNilai, ""],
                    });
                  }}>
                    <Plus className="w-4 h-4 mr-1" /> Tambah
                  </Button>
                </div>
              </div>

              {/* DPL Checkbox Section - FIXED */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 mb-3 block">Dimensi Profil Lulusan (DPL)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg border">
                  {data.identifikasi.dimensiProfilLulusan.map((item, i) => (
                    <label key={i} className="flex items-start gap-3 p-2 rounded hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-gray-200">
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
                    <div key={i} className="flex gap-2">
                      <Textarea
                        value={item}
                        onChange={e => updateListItem("desain", "tujuanPembelajaran", i, e.target.value)}
                        placeholder={`Tujuan ${i + 1}`}
                        rows={2}
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeListItem("desain", "tujuanPembelajaran", i)}>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Kemitraan - Sekolah</label>
                    <Input
                      value={data.desain.kemitraan.sekolah}
                      onChange={e => updateNested("desain", "kemitraan", { ...data.desain.kemitraan, sekolah: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Kemitraan - Luar Sekolah</label>
                    <Input
                      value={data.desain.kemitraan.luarSekolah}
                      onChange={e => updateNested("desain", "kemitraan", { ...data.desain.kemitraan, luarSekolah: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Kemitraan - Masyarakat</label>
                    <Input
                      value={data.desain.kemitraan.masyarakat}
                      onChange={e => updateNested("desain", "kemitraan", { ...data.desain.kemitraan, masyarakat: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Lingkungan - Budaya</label>
                    <Input
                      value={data.desain.lingkungan.budaya}
                      onChange={e => updateNested("desain", "lingkungan", { ...data.desain.lingkungan, budaya: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Lingkungan - Fisik</label>
                    <Input
                      value={data.desain.lingkungan.fisik}
                      onChange={e => updateNested("desain", "lingkungan", { ...data.desain.lingkungan, fisik: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Lingkungan - Virtual</label>
                    <Input
                      value={data.desain.lingkungan.virtual}
                      onChange={e => updateNested("desain", "lingkungan", { ...data.desain.lingkungan, virtual: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Digital - Perencanaan</label>
                    <Input
                      value={data.desain.digital.perencanaan}
                      onChange={e => updateNested("desain", "digital", { ...data.desain.digital, perencanaan: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Digital - Pelaksanaan</label>
                    <Input
                      value={data.desain.digital.pelaksanaan}
                      onChange={e => updateNested("desain", "digital", { ...data.desain.digital, pelaksanaan: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Digital - Asesmen</label>
                    <Input
                      value={data.desain.digital.asesmen}
                      onChange={e => updateNested("desain", "digital", { ...data.desain.digital, asesmen: e.target.value })}
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
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-3">Kegiatan Awal</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {(["mindful", "meaningful", "joyful"] as const).map(prinsip => (
                    <label key={prinsip} className="flex items-center gap-2 p-3 bg-white rounded border cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={data.pengalaman.awal[prinsip]}
                        onChange={e => updateNested("pengalaman", "awal", {
                          ...data.pengalaman.awal,
                          [prinsip]: e.target.checked,
                        })}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-sm capitalize">{prinsip === "mindful" ? "Mindful" : prinsip === "meaningful" ? "Meaningful" : "Joyful"}</span>
                    </label>
                  ))}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Langkah-langkah</label>
                  {data.pengalaman.awal.langkah.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <Textarea
                        value={item}
                        onChange={e => {
                          const updated = [...data.pengalaman.awal.langkah];
                          updated[i] = e.target.value;
                          updateNested("pengalaman", "awal", { ...data.pengalaman.awal, langkah: updated });
                        }}
                        placeholder={`Langkah ${i + 1}`}
                        rows={2}
                      />
                      <Button variant="ghost" size="icon" onClick={() => {
                        const updated = [...data.pengalaman.awal.langkah];
                        updated.splice(i, 1);
                        updateNested("pengalaman", "awal", { ...data.pengalaman.awal, langkah: updated });
                      }}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => {
                    updateNested("pengalaman", "awal", { ...data.pengalaman.awal, langkah: [...data.pengalaman.awal.langkah, ""] });
                  }}>
                    <Plus className="w-4 h-4 mr-1" /> Tambah Langkah
                  </Button>
                </div>
              </div>

              {/* Inti */}
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-100">
                <h3 className="font-bold text-green-900 mb-3">Kegiatan Inti</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Memahami</label>
                    {data.pengalaman.inti.memahami.map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <Textarea
                          value={item}
                          onChange={e => {
                            const updated = [...data.pengalaman.inti.memahami];
                            updated[i] = e.target.value;
                            updateNested("pengalaman", "inti", { ...data.pengalaman.inti, memahami: updated });
                          }}
                          placeholder={`Langkah ${i + 1}`}
                          rows={2}
                        />
                        <Button variant="ghost" size="icon" onClick={() => {
                          const updated = [...data.pengalaman.inti.memahami];
                          updated.splice(i, 1);
                          updateNested("pengalaman", "inti", { ...data.pengalaman.inti, memahami: updated });
                        }}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => {
                      updateNested("pengalaman", "inti", { ...data.pengalaman.inti, memahami: [...data.pengalaman.inti.memahami, ""] });
                    }}>
                      <Plus className="w-4 h-4 mr-1" /> Tambah
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Mengaplikasi</label>
                    {data.pengalaman.inti.mengaplikasi.map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <Textarea
                          value={item}
                          onChange={e => {
                            const updated = [...data.pengalaman.inti.mengaplikasi];
                            updated[i] = e.target.value;
                            updateNested("pengalaman", "inti", { ...data.pengalaman.inti, mengaplikasi: updated });
                          }}
                          placeholder={`Langkah ${i + 1}`}
                          rows={2}
                        />
                        <Button variant="ghost" size="icon" onClick={() => {
                          const updated = [...data.pengalaman.inti.mengaplikasi];
                          updated.splice(i, 1);
                          updateNested("pengalaman", "inti", { ...data.pengalaman.inti, mengaplikasi: updated });
                        }}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => {
                      updateNested("pengalaman", "inti", { ...data.pengalaman.inti, mengaplikasi: [...data.pengalaman.inti.mengaplikasi, ""] });
                    }}>
                      <Plus className="w-4 h-4 mr-1" /> Tambah
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Merefleksi</label>
                    {data.pengalaman.inti.merefleksi.map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <Textarea
                          value={item}
                          onChange={e => {
                            const updated = [...data.pengalaman.inti.merefleksi];
                            updated[i] = e.target.value;
                            updateNested("pengalaman", "inti", { ...data.pengalaman.inti, merefleksi: updated });
                          }}
                          placeholder={`Langkah ${i + 1}`}
                          rows={2}
                        />
                        <Button variant="ghost" size="icon" onClick={() => {
                          const updated = [...data.pengalaman.inti.merefleksi];
                          updated.splice(i, 1);
                          updateNested("pengalaman", "inti", { ...data.pengalaman.inti, merefleksi: updated });
                        }}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => {
                      updateNested("pengalaman", "inti", { ...data.pengalaman.inti, merefleksi: [...data.pengalaman.inti.merefleksi, ""] });
                    }}>
                      <Plus className="w-4 h-4 mr-1" /> Tambah
                    </Button>
                  </div>
                </div>
              </div>

              {/* Penutup */}
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                <h3 className="font-bold text-amber-900 mb-3">Kegiatan Penutup</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {(["mindful", "meaningful", "joyful"] as const).map(prinsip => (
                    <label key={prinsip} className="flex items-center gap-2 p-3 bg-white rounded border cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={data.pengalaman.penutup[prinsip]}
                        onChange={e => updateNested("pengalaman", "penutup", {
                          ...data.pengalaman.penutup,
                          [prinsip]: e.target.checked,
                        })}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-sm capitalize">{prinsip === "mindful" ? "Mindful" : prinsip === "meaningful" ? "Meaningful" : "Joyful"}</span>
                    </label>
                  ))}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Langkah-langkah</label>
                  {data.pengalaman.penutup.langkah.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <Textarea
                        value={item}
                        onChange={e => {
                          const updated = [...data.pengalaman.penutup.langkah];
                          updated[i] = e.target.value;
                          updateNested("pengalaman", "penutup", { ...data.pengalaman.penutup, langkah: updated });
                        }}
                        placeholder={`Langkah ${i + 1}`}
                        rows={2}
                      />
                      <Button variant="ghost" size="icon" onClick={() => {
                        const updated = [...data.pengalaman.penutup.langkah];
                        updated.splice(i, 1);
                        updateNested("pengalaman", "penutup", { ...data.pengalaman.penutup, langkah: updated });
                      }}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => {
                    updateNested("pengalaman", "penutup", { ...data.pengalaman.penutup, langkah: [...data.pengalaman.penutup.langkah, ""] });
                  }}>
                    <Plus className="w-4 h-4 mr-1" /> Tambah Langkah
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ASESMEN */}
          <TabsContent value="asesmen" className="space-y-4">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5" /> Asesmen
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Asesmen pada Awal Pembelajaran</label>
                  <Textarea
                    value={data.asesmen.awal}
                    onChange={e => updateNested("asesmen", "awal", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Asesmen pada Proses Pembelajaran</label>
                  <Textarea
                    value={data.asesmen.proses}
                    onChange={e => updateNested("asesmen", "proses", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Asesmen pada Akhir Pembelajaran</label>
                  <Textarea
                    value={data.asesmen.akhir}
                    onChange={e => updateNested("asesmen", "akhir", e.target.value)}
                    rows={3}
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

              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Link Jobsheet</label>
                  <Input
                    value={data.lampiran.jobsheet}
                    onChange={e => updateNested("lampiran", "jobsheet", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mb-3">Rubrik Penilaian Observasi Sikap</h3>
              <div className="space-y-4 mb-6">
                {data.lampiran.rubrikSikap.map((r, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg border space-y-2">
                    <div className="flex items-center justify-between">
                      <Input
                        value={r.aspek}
                        onChange={e => {
                          const updated = [...data.lampiran.rubrikSikap];
                          updated[i] = { ...updated[i], aspek: e.target.value };
                          updateNested("lampiran", "rubrikSikap", updated);
                        }}
                        placeholder="Aspek"
                        className="font-semibold max-w-xs"
                      />
                      <Button variant="ghost" size="icon" onClick={() => {
                        const updated = [...data.lampiran.rubrikSikap];
                        updated.splice(i, 1);
                        updateNested("lampiran", "rubrikSikap", updated);
                      }}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                    <Input
                      value={r.indikator}
                      onChange={e => {
                        const updated = [...data.lampiran.rubrikSikap];
                        updated[i] = { ...updated[i], indikator: e.target.value };
                        updateNested("lampiran", "rubrikSikap", updated);
                      }}
                      placeholder="Indikator"
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Input
                        value={r.skor4}
                        onChange={e => {
                          const updated = [...data.lampiran.rubrikSikap];
                          updated[i] = { ...updated[i], skor4: e.target.value };
                          updateNested("lampiran", "rubrikSikap", updated);
                        }}
                        placeholder="Skor 4 (Sangat Baik)"
                      />
                      <Input
                        value={r.skor3}
                        onChange={e => {
                          const updated = [...data.lampiran.rubrikSikap];
                          updated[i] = { ...updated[i], skor3: e.target.value };
                          updateNested("lampiran", "rubrikSikap", updated);
                        }}
                        placeholder="Skor 3 (Baik)"
                      />
                      <Input
                        value={r.skor2}
                        onChange={e => {
                          const updated = [...data.lampiran.rubrikSikap];
                          updated[i] = { ...updated[i], skor2: e.target.value };
                          updateNested("lampiran", "rubrikSikap", updated);
                        }}
                        placeholder="Skor 2 (Cukup)"
                      />
                      <Input
                        value={r.skor1}
                        onChange={e => {
                          const updated = [...data.lampiran.rubrikSikap];
                          updated[i] = { ...updated[i], skor1: e.target.value };
                          updateNested("lampiran", "rubrikSikap", updated);
                        }}
                        placeholder="Skor 1 (Perlu Bimbingan)"
                      />
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => {
                  const updated = [...data.lampiran.rubrikSikap, {
                    aspek: "",
                    indikator: "",
                    skor4: "",
                    skor3: "",
                    skor2: "",
                    skor1: "",
                  }];
                  updateNested("lampiran", "rubrikSikap", updated);
                }}>
                  <Plus className="w-4 h-4 mr-1" /> Tambah Rubrik
                </Button>
              </div>

              <h3 className="font-bold text-gray-900 mb-3">Penandatangan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Kepala Sekolah</label>
                  <Input
                    value={data.lampiran.penandatangan.kepalaSekolah}
                    onChange={e => updateNested("lampiran", "penandatangan", {
                      ...data.lampiran.penandatangan,
                      kepalaSekolah: e.target.value,
                    })}
                    placeholder="Nama Kepala Sekolah"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Kurikulum</label>
                  <Input
                    value={data.lampiran.penandatangan.kurikulum}
                    onChange={e => updateNested("lampiran", "penandatangan", {
                      ...data.lampiran.penandatangan,
                      kurikulum: e.target.value,
                    })}
                    placeholder="Nama Kurikulum"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Guru</label>
                  <Input
                    value={data.lampiran.penandatangan.guru}
                    onChange={e => updateNested("lampiran", "penandatangan", {
                      ...data.lampiran.penandatangan,
                      guru: e.target.value,
                    })}
                    placeholder="Nama Guru"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tempat</label>
                  <Input
                    value={data.tempat}
                    onChange={e => updateField("tempat", e.target.value)}
                    placeholder="Kota"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tanggal</label>
                  <Input
                    value={data.tanggal}
                    onChange={e => updateField("tanggal", e.target.value)}
                    placeholder="02 Juni 2025"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Live Preview Panel */}
      {showPreview && (
        <div ref={previewRef} className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" /> Live Preview - RPP Final Output
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-1" /> Print
                </Button>
                <Button size="sm" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-1" /> Export DOCX
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setShowPreview(false)}>
                  <EyeOff className="w-5 h-5" />
                </Button>
              </div>
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
