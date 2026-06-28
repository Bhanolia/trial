"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RPPData } from "@/types/rpp";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: RPPData;
  setData: (updater: (prev: RPPData) => RPPData) => void;
  errors?: Record<string, string>;
}

export function IdentifikasiTab({ data, setData, errors }: Props) {
  const updatePeserta = (field: keyof RPPData["identifikasi"]["karakteristikPeserta"], sub: "level" | "deskripsi" | "bidang" | "gaya", value: string) => {
    setData(prev => {
      const updated = { ...prev.identifikasi.karakteristikPeserta };
      (updated as any)[field] = { ...(updated as any)[field], [sub]: value };
      return { ...prev, identifikasi: { ...prev.identifikasi, karakteristikPeserta: updated } };
    });
  };

  const addListItem = (field: "jenisPengetahuan" | "relevansi" | "integrasiNilai") => {
    setData(prev => ({
      ...prev,
      identifikasi: {
        ...prev.identifikasi,
        karakteristikMapel: {
          ...prev.identifikasi.karakteristikMapel,
          [field]: [...prev.identifikasi.karakteristikMapel[field], ""],
        },
      },
    }));
  };

  const updateListItem = (field: "jenisPengetahuan" | "relevansi" | "integrasiNilai", index: number, value: string) => {
    setData(prev => {
      const updated = [...prev.identifikasi.karakteristikMapel[field]];
      updated[index] = value;
      return {
        ...prev,
        identifikasi: {
          ...prev.identifikasi,
          karakteristikMapel: { ...prev.identifikasi.karakteristikMapel, [field]: updated },
        },
      };
    });
  };

  const removeListItem = (field: "jenisPengetahuan" | "relevansi" | "integrasiNilai", index: number) => {
    setData(prev => {
      const updated = [...prev.identifikasi.karakteristikMapel[field]];
      updated.splice(index, 1);
      return {
        ...prev,
        identifikasi: {
          ...prev.identifikasi,
          karakteristikMapel: { ...prev.identifikasi.karakteristikMapel, [field]: updated },
        },
      };
    });
  };

  const toggleDPL = (index: number) => {
    setData(prev => {
      const updated = [...prev.identifikasi.dimensiProfilLulusan];
      updated[index] = { ...updated[index], checked: !updated[index].checked };
      return { ...prev, identifikasi: { ...prev.identifikasi, dimensiProfilLulusan: updated } };
    });
  };

  return (
    <div className="space-y-4">
      {/* Karakteristik Peserta */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">👥</span> Karakteristik Peserta Didik
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Kesiapan Belajar - Level</label>
            <Input value={data.identifikasi.karakteristikPeserta.kesiapanBelajar.level} onChange={e => updatePeserta("kesiapanBelajar", "level", e.target.value)} />
            <label className="text-sm font-medium text-gray-700">Deskripsi</label>
            <Textarea value={data.identifikasi.karakteristikPeserta.kesiapanBelajar.deskripsi} onChange={e => updatePeserta("kesiapanBelajar", "deskripsi", e.target.value)} rows={2} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Minat - Bidang</label>
            <Input value={data.identifikasi.karakteristikPeserta.minat.bidang} onChange={e => updatePeserta("minat", "bidang", e.target.value)} />
            <label className="text-sm font-medium text-gray-700">Deskripsi</label>
            <Textarea value={data.identifikasi.karakteristikPeserta.minat.deskripsi} onChange={e => updatePeserta("minat", "deskripsi", e.target.value)} rows={2} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Bakat - Bidang</label>
            <Input value={data.identifikasi.karakteristikPeserta.bakat.bidang} onChange={e => updatePeserta("bakat", "bidang", e.target.value)} />
            <label className="text-sm font-medium text-gray-700">Deskripsi</label>
            <Textarea value={data.identifikasi.karakteristikPeserta.bakat.deskripsi} onChange={e => updatePeserta("bakat", "deskripsi", e.target.value)} rows={2} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Profil Belajar - Gaya</label>
            <Input value={data.identifikasi.karakteristikPeserta.profilBelajar.gaya} onChange={e => updatePeserta("profilBelajar", "gaya", e.target.value)} />
            <label className="text-sm font-medium text-gray-700">Deskripsi</label>
            <Textarea value={data.identifikasi.karakteristikPeserta.profilBelajar.deskripsi} onChange={e => updatePeserta("profilBelajar", "deskripsi", e.target.value)} rows={2} />
          </div>
        </div>
      </div>

      {/* Karakteristik Mapel */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">📚</span> Karakteristik Mata Pelajaran
        </h2>
        <div className="space-y-4">
          <ListField label="Jenis Pengetahuan" items={data.identifikasi.karakteristikMapel.jenisPengetahuan} onAdd={() => addListItem("jenisPengetahuan")} onUpdate={(i, v) => updateListItem("jenisPengetahuan", i, v)} onRemove={i => removeListItem("jenisPengetahuan", i)} />
          <ListField label="Relevansi" items={data.identifikasi.karakteristikMapel.relevansi} onAdd={() => addListItem("relevansi")} onUpdate={(i, v) => updateListItem("relevansi", i, v)} onRemove={i => removeListItem("relevansi", i)} />
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Tingkat Kesulitan</label>
            <Input value={data.identifikasi.karakteristikMapel.tingkatKesulitan} onChange={e => setData(prev => ({ ...prev, identifikasi: { ...prev.identifikasi, karakteristikMapel: { ...prev.identifikasi.karakteristikMapel, tingkatKesulitan: e.target.value } } }))} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Struktur Materi</label>
            <Input value={data.identifikasi.karakteristikMapel.strukturMateri} onChange={e => setData(prev => ({ ...prev, identifikasi: { ...prev.identifikasi, karakteristikMapel: { ...prev.identifikasi.karakteristikMapel, strukturMateri: e.target.value } } }))} />
          </div>
          <ListField label="Integrasi Nilai" items={data.identifikasi.karakteristikMapel.integrasiNilai} onAdd={() => addListItem("integrasiNilai")} onUpdate={(i, v) => updateListItem("integrasiNilai", i, v)} onRemove={i => removeListItem("integrasiNilai", i)} />
        </div>
      </div>

      {/* DPL Checkboxes */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">✅</span> Dimensi Profil Lulusan (DPL)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg border">
          {data.identifikasi.dimensiProfilLulusan.map((item, i) => (
            <label key={i} className="flex items-start gap-3 p-2 rounded hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-gray-200">
              <input type="checkbox" checked={item.checked} onChange={() => toggleDPL(i)} className="mt-1 w-4 h-4 accent-blue-600 cursor-pointer" />
              <span className="text-sm text-gray-700">{item.label}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">Centang DPL yang sesuai dengan capaian pembelajaran ini</p>
      </div>
    </div>
  );
}

function ListField({ label, items, onAdd, onUpdate, onRemove }: { label: string; items: string[]; onAdd: () => void; onUpdate: (i: number, v: string) => void; onRemove: (i: number) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input value={item} onChange={e => onUpdate(i, e.target.value)} placeholder={`${label} ${i + 1}`} />
          <Button variant="ghost" size="icon" onClick={() => onRemove(i)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={onAdd}><Plus className="w-4 h-4 mr-1" /> Tambah</Button>
    </div>
  );
}
