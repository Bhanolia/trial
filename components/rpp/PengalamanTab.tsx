"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RPPData } from "@/types/rpp";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: RPPData;
  setData: (updater: (prev: RPPData) => RPPData) => void;
  errors?: Record<string, string>;
}

export function PengalamanTab({ data, setData, errors }: Props) {
  const updateLangkah = (phase: "awal" | "penutup", field: "mindful" | "meaningful" | "joyful") => {
    setData(prev => ({
      ...prev,
      pengalaman: {
        ...prev.pengalaman,
        [phase]: { ...prev.pengalaman[phase], [field]: !prev.pengalaman[phase][field] },
      },
    }));
  };

  const addLangkah = (phase: "awal" | "penutup") => {
    setData(prev => ({
      ...prev,
      pengalaman: {
        ...prev.pengalaman,
        [phase]: { ...prev.pengalaman[phase], langkah: [...prev.pengalaman[phase].langkah, ""] },
      },
    }));
  };

  const updateLangkahItem = (phase: "awal" | "penutup", index: number, value: string) => {
    setData(prev => {
      const updated = [...prev.pengalaman[phase].langkah];
      updated[index] = value;
      return { ...prev, pengalaman: { ...prev.pengalaman, [phase]: { ...prev.pengalaman[phase], langkah: updated } } };
    });
  };

  const removeLangkah = (phase: "awal" | "penutup", index: number) => {
    setData(prev => {
      const updated = [...prev.pengalaman[phase].langkah];
      updated.splice(index, 1);
      return { ...prev, pengalaman: { ...prev.pengalaman, [phase]: { ...prev.pengalaman[phase], langkah: updated } } };
    });
  };

  const addInti = (field: "memahami" | "mengaplikasi" | "merefleksi") => {
    setData(prev => ({
      ...prev,
      pengalaman: {
        ...prev.pengalaman,
        inti: { ...prev.pengalaman.inti, [field]: [...prev.pengalaman.inti[field], ""] },
      },
    }));
  };

  const updateInti = (field: "memahami" | "mengaplikasi" | "merefleksi", index: number, value: string) => {
    setData(prev => {
      const updated = [...prev.pengalaman.inti[field]];
      updated[index] = value;
      return { ...prev, pengalaman: { ...prev.pengalaman, inti: { ...prev.pengalaman.inti, [field]: updated } } };
    });
  };

  const removeInti = (field: "memahami" | "mengaplikasi" | "merefleksi", index: number) => {
    setData(prev => {
      const updated = [...prev.pengalaman.inti[field]];
      updated.splice(index, 1);
      return { ...prev, pengalaman: { ...prev.pengalaman, inti: { ...prev.pengalaman.inti, [field]: updated } } };
    });
  };

  const PrinsipBox = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
    <label className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors">
      <input type="checkbox" checked={checked} onChange={onChange} className="w-5 h-5 accent-blue-600" />
      <span className="text-sm font-medium">{label}</span>
    </label>
  );

  return (
    <div className="space-y-4">
      {/* Awal */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">🚀 Kegiatan Awal</h2>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <PrinsipBox label="Mindful (Berkesadaran)" checked={data.pengalaman.awal.mindful} onChange={() => updateLangkah("awal", "mindful")} />
          <PrinsipBox label="Meaningful (Bermakna)" checked={data.pengalaman.awal.meaningful} onChange={() => updateLangkah("awal", "meaningful")} />
          <PrinsipBox label="Joyful (Menyenangkan)" checked={data.pengalaman.awal.joyful} onChange={() => updateLangkah("awal", "joyful")} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Langkah-Langkah</label>
          {data.pengalaman.awal.langkah.map((item, i) => (
            <div key={i} className="flex gap-2">
              <Textarea value={item} onChange={e => updateLangkahItem("awal", i, e.target.value)} placeholder={`Langkah ${i + 1}`} rows={2} />
              <Button variant="ghost" size="icon" onClick={() => removeLangkah("awal", i)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => addLangkah("awal")}><Plus className="w-4 h-4 mr-1" /> Tambah Langkah</Button>
        </div>
      </div>

      {/* Inti */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">🎯 Kegiatan Inti</h2>
        <IntiSection label="Memahami" items={data.pengalaman.inti.memahami} onAdd={() => addInti("memahami")} onUpdate={(i, v) => updateInti("memahami", i, v)} onRemove={i => removeInti("memahami", i)} />
        <IntiSection label="Mengaplikasi" items={data.pengalaman.inti.mengaplikasi} onAdd={() => addInti("mengaplikasi")} onUpdate={(i, v) => updateInti("mengaplikasi", i, v)} onRemove={i => removeInti("mengaplikasi", i)} />
        <IntiSection label="Merefleksi" items={data.pengalaman.inti.merefleksi} onAdd={() => addInti("merefleksi")} onUpdate={(i, v) => updateInti("merefleksi", i, v)} onRemove={i => removeInti("merefleksi", i)} />
      </div>

      {/* Penutup */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">🏁 Kegiatan Penutup</h2>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <PrinsipBox label="Mindful (Berkesadaran)" checked={data.pengalaman.penutup.mindful} onChange={() => updateLangkah("penutup", "mindful")} />
          <PrinsipBox label="Meaningful (Bermakna)" checked={data.pengalaman.penutup.meaningful} onChange={() => updateLangkah("penutup", "meaningful")} />
          <PrinsipBox label="Joyful (Menyenangkan)" checked={data.pengalaman.penutup.joyful} onChange={() => updateLangkah("penutup", "joyful")} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Langkah-Langkah</label>
          {data.pengalaman.penutup.langkah.map((item, i) => (
            <div key={i} className="flex gap-2">
              <Textarea value={item} onChange={e => updateLangkahItem("penutup", i, e.target.value)} placeholder={`Langkah ${i + 1}`} rows={2} />
              <Button variant="ghost" size="icon" onClick={() => removeLangkah("penutup", i)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => addLangkah("penutup")}><Plus className="w-4 h-4 mr-1" /> Tambah Langkah</Button>
        </div>
      </div>
    </div>
  );
}

function IntiSection({ label, items, onAdd, onUpdate, onRemove }: { label: string; items: string[]; onAdd: () => void; onUpdate: (i: number, v: string) => void; onRemove: (i: number) => void }) {
  return (
    <div className="space-y-2 mb-4">
      <label className="text-sm font-bold text-gray-800">{label}</label>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Textarea value={item} onChange={e => onUpdate(i, e.target.value)} placeholder={`${label} ${i + 1}`} rows={2} />
          <Button variant="ghost" size="icon" onClick={() => onRemove(i)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={onAdd}><Plus className="w-4 h-4 mr-1" /> Tambah {label}</Button>
    </div>
  );
}
