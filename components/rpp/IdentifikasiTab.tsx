"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RPPData, defaultDPL } from "@/types/rpp";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface Props {
  data: RPPData;
  setData: (updater: (prev: RPPData) => RPPData) => void;
}

export function IdentifikasiTab({ data, setData }: Props) {
  const updatePeserta = (field: string, subfield: string, value: string) => {
    setData(prev => ({
      ...prev,
      identifikasi: {
        ...prev.identifikasi,
        karakteristikPeserta: {
          ...prev.identifikasi.karakteristikPeserta,
          [field]: { ...prev.identifikasi.karakteristikPeserta[field as keyof typeof prev.identifikasi.karakteristikPeserta], [subfield]: value },
        },
      },
    }));
  };

  const toggleDPL = (index: number) => {
    setData(prev => {
      const dpl = [...prev.identifikasi.dimensiProfilLulusan];
      dpl[index] = { ...dpl[index], checked: !dpl[index].checked };
      return { ...prev, identifikasi: { ...prev.identifikasi, dimensiProfilLulusan: dpl } };
    });
  };

  const updateMapelArray = (field: keyof typeof data.identifikasi.karakteristikMapel, index: number, value: string) => {
    setData(prev => {
      const arr = [...(prev.identifikasi.karakteristikMapel[field] as string[])];
      arr[index] = value;
      return { ...prev, identifikasi: { ...prev.identifikasi, karakteristikMapel: { ...prev.identifikasi.karakteristikMapel, [field]: arr } } };
    });
  };

  const addMapelItem = (field: keyof typeof data.identifikasi.karakteristikMapel) => {
    setData(prev => ({
      ...prev,
      identifikasi: {
        ...prev.identifikasi,
        karakteristikMapel: { ...prev.identifikasi.karakteristikMapel, [field]: [...(prev.identifikasi.karakteristikMapel[field] as string[]), ""] },
      },
    }));
  };

  const removeMapelItem = (field: keyof typeof data.identifikasi.karakteristikMapel, index: number) => {
    setData(prev => {
      const arr = [...(prev.identifikasi.karakteristikMapel[field] as string[])];
      arr.splice(index, 1);
      return { ...prev, identifikasi: { ...prev.identifikasi, karakteristikMapel: { ...prev.identifikasi.karakteristikMapel, [field]: arr } } };
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Karakteristik Peserta Didik</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["kesiapanBelajar", "minat", "bakat", "profilBelajar"].map((key) => (
            <div key={key} className="border rounded-lg p-4">
              <label className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
              <Input
                placeholder="Deskripsi"
                value={data.identifikasi.karakteristikPeserta[key as keyof typeof data.identifikasi.karakteristikPeserta].deskripsi}
                onChange={e => updatePeserta(key, "deskripsi", e.target.value)}
                className="mt-2"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Dimensi Profil Lulusan (DPL)</h3>
        <p className="text-sm text-gray-500 mb-3">Centang DPL yang sesuai dengan capaian pembelajaran ini</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.identifikasi.dimensiProfilLulusan.map((dpl, i) => (
            <label key={i} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${dpl.checked ? "bg-blue-50 border-blue-300" : "bg-white hover:bg-gray-50"}`}>
              <input type="checkbox" checked={dpl.checked} onChange={() => toggleDPL(i)} className="mt-1" />
              <span className="text-sm">{dpl.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Karakteristik Mata Pelajaran</h3>
        {(["jenisPengetahuan", "relevansi", "integrasiNilai"] as const).map(field => (
          <div key={field} className="mb-4">
            <label className="text-sm font-medium capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
            {data.identifikasi.karakteristikMapel[field].map((item, i) => (
              <div key={i} className="flex gap-2 mt-2">
                <Input value={item} onChange={e => updateMapelArray(field, i, e.target.value)} />
                <Button variant="outline" size="sm" onClick={() => removeMapelItem(field, i)}><Minus className="w-4 h-4" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" className="mt-2" onClick={() => addMapelItem(field)}><Plus className="w-4 h-4 mr-1" /> Tambah</Button>
          </div>
        ))}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-sm font-medium">Tingkat Kesulitan</label>
            <Input value={data.identifikasi.karakteristikMapel.tingkatKesulitan} onChange={e => setData(prev => ({ ...prev, identifikasi: { ...prev.identifikasi, karakteristikMapel: { ...prev.identifikasi.karakteristikMapel, tingkatKesulitan: e.target.value } } }))} />
          </div>
          <div>
            <label className="text-sm font-medium">Struktur Materi</label>
            <Input value={data.identifikasi.karakteristikMapel.strukturMateri} onChange={e => setData(prev => ({ ...prev, identifikasi: { ...prev.identifikasi, karakteristikMapel: { ...prev.identifikasi.karakteristikMapel, strukturMateri: e.target.value } } }))} />
          </div>
        </div>
      </div>
    </div>
  );
}
