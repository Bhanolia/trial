"use client";

import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RPPData } from "@/types/rpp";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: RPPData;
  setData: (updater: (prev: RPPData) => RPPData) => void;
  errors?: Record<string, string>;
}

export function LampiranTab({ data, setData, errors }: Props) {
  const addRubrik = () => {
    setData(prev => ({
      ...prev,
      lampiran: {
        ...prev.lampiran,
        rubrikSikap: [...prev.lampiran.rubrikSikap, { aspek: "", indikator: "", skor4: "", skor3: "", skor2: "", skor1: "" }],
      },
    }));
  };

  const updateRubrik = (index: number, field: keyof RPPData["lampiran"]["rubrikSikap"][0], value: string) => {
    setData(prev => {
      const updated = [...prev.lampiran.rubrikSikap];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, lampiran: { ...prev.lampiran, rubrikSikap: updated } };
    });
  };

  const removeRubrik = (index: number) => {
    setData(prev => {
      const updated = [...prev.lampiran.rubrikSikap];
      updated.splice(index, 1);
      return { ...prev, lampiran: { ...prev.lampiran, rubrikSikap: updated } };
    });
  };

  const updatePenandatangan = (field: keyof RPPData["lampiran"]["penandatangan"], value: string) => {
    setData(prev => ({
      ...prev,
      lampiran: {
        ...prev.lampiran,
        penandatangan: { ...prev.lampiran.penandatangan, [field]: value },
      },
    }));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">📋</span> Rubrik Sikap
        </h2>
        {data.lampiran.rubrikSikap.map((item, i) => (
          <div key={i} className="grid grid-cols-6 gap-2 mb-3 items-end">
            <div className="space-y-1"><label className="text-xs text-gray-500">Aspek</label><Input value={item.aspek} onChange={e => updateRubrik(i, "aspek", e.target.value)} /></div>
            <div className="space-y-1"><label className="text-xs text-gray-500">Indikator</label><Input value={item.indikator} onChange={e => updateRubrik(i, "indikator", e.target.value)} /></div>
            <div className="space-y-1"><label className="text-xs text-gray-500">Skor 4</label><Input value={item.skor4} onChange={e => updateRubrik(i, "skor4", e.target.value)} /></div>
            <div className="space-y-1"><label className="text-xs text-gray-500">Skor 3</label><Input value={item.skor3} onChange={e => updateRubrik(i, "skor3", e.target.value)} /></div>
            <div className="space-y-1"><label className="text-xs text-gray-500">Skor 2</label><Input value={item.skor2} onChange={e => updateRubrik(i, "skor2", e.target.value)} /></div>
            <div className="flex gap-2">
              <div className="space-y-1 flex-1"><label className="text-xs text-gray-500">Skor 1</label><Input value={item.skor1} onChange={e => updateRubrik(i, "skor1", e.target.value)} /></div>
              <Button variant="ghost" size="icon" onClick={() => removeRubrik(i)} className="mb-0"><Trash2 className="w-4 h-4 text-red-500" /></Button>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={addRubrik}><Plus className="w-4 h-4 mr-1" /> Tambah Rubrik</Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">📎</span> Jobsheet & Info
        </h2>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Link Jobsheet</label>
          <Input value={data.lampiran.jobsheet} onChange={e => setData(prev => ({ ...prev, lampiran: { ...prev.lampiran, jobsheet: e.target.value } }))} placeholder="https://..." />
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">✍️</span> Penandatangan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Kepala Sekolah</label><Input value={data.lampiran.penandatangan.kepalaSekolah} onChange={e => updatePenandatangan("kepalaSekolah", e.target.value)} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Kurikulum</label><Input value={data.lampiran.penandatangan.kurikulum} onChange={e => updatePenandatangan("kurikulum", e.target.value)} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Guru</label><Input value={data.lampiran.penandatangan.guru} onChange={e => updatePenandatangan("guru", e.target.value)} /></div>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">📅</span> Tanggal & Tempat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Tanggal</label><Input value={data.tanggal} onChange={e => setData(prev => ({ ...prev, tanggal: e.target.value }))} placeholder="02 Juni 2025" /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Tempat</label><Input value={data.tempat} onChange={e => setData(prev => ({ ...prev, tempat: e.target.value }))} placeholder="Kota" /></div>
        </div>
      </div>
    </div>
  );
}
