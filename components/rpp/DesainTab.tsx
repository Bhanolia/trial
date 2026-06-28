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

export function DesainTab({ data, setData, errors }: Props) {
  const updateNested = <K extends keyof RPPData["desain"]>(field: K, value: RPPData["desain"][K]) => {
    setData(prev => ({ ...prev, desain: { ...prev.desain, [field]: value } }));
  };

  const addTujuan = () => updateNested("tujuanPembelajaran", [...data.desain.tujuanPembelajaran, ""]);
  const updateTujuan = (index: number, value: string) => {
    const updated = [...data.desain.tujuanPembelajaran];
    updated[index] = value;
    updateNested("tujuanPembelajaran", updated);
  };
  const removeTujuan = (index: number) => {
    const updated = [...data.desain.tujuanPembelajaran];
    updated.splice(index, 1);
    updateNested("tujuanPembelajaran", updated);
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">💡</span> Desain Pembelajaran
      </h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Capaian Pembelajaran <span className="text-red-500">*</span></label>
          <Textarea value={data.desain.capaianPembelajaran} onChange={e => updateNested("capaianPembelajaran", e.target.value)} rows={4}
            className={errors?.capaianPembelajaran ? "border-red-500 focus-visible:ring-red-500" : ""} />
          {errors?.capaianPembelajaran && <p className="text-xs text-red-500">{errors.capaianPembelajaran}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Lintas Disiplin Ilmu</label>
            <Input value={data.desain.lintasDisiplin} onChange={e => updateNested("lintasDisiplin", e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Topik Pembelajaran <span className="text-red-500">*</span></label>
            <Input value={data.desain.topik} onChange={e => updateNested("topik", e.target.value)}
              className={errors?.topik ? "border-red-500 focus-visible:ring-red-500" : ""} />
            {errors?.topik && <p className="text-xs text-red-500">{errors.topik}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Tujuan Pembelajaran <span className="text-red-500">*</span></label>
          {data.desain.tujuanPembelajaran.map((item, i) => (
            <div key={i} className="flex gap-2">
              <Textarea value={item} onChange={e => updateTujuan(i, e.target.value)} placeholder={`Tujuan ${i + 1}`} rows={2}
                className={errors?.tujuanPembelajaran ? "border-red-500 focus-visible:ring-red-500" : ""} />
              <Button variant="ghost" size="icon" onClick={() => removeTujuan(i)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
            </div>
          ))}
          {errors?.tujuanPembelajaran && <p className="text-xs text-red-500">{errors.tujuanPembelajaran}</p>}
          <Button variant="outline" size="sm" onClick={addTujuan}><Plus className="w-4 h-4 mr-1" /> Tambah Tujuan</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Model Pembelajaran</label><Input value={data.desain.modelPembelajaran} onChange={e => updateNested("modelPembelajaran", e.target.value)} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Metode Pembelajaran</label><Input value={data.desain.metodePembelajaran} onChange={e => updateNested("metodePembelajaran", e.target.value)} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Kemitraan - Sekolah</label><Input value={data.desain.kemitraan.sekolah} onChange={e => updateNested("kemitraan", { ...data.desain.kemitraan, sekolah: e.target.value })} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Kemitraan - Luar Sekolah</label><Input value={data.desain.kemitraan.luarSekolah} onChange={e => updateNested("kemitraan", { ...data.desain.kemitraan, luarSekolah: e.target.value })} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Kemitraan - Masyarakat</label><Input value={data.desain.kemitraan.masyarakat} onChange={e => updateNested("kemitraan", { ...data.desain.kemitraan, masyarakat: e.target.value })} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Lingkungan - Budaya</label><Input value={data.desain.lingkungan.budaya} onChange={e => updateNested("lingkungan", { ...data.desain.lingkungan, budaya: e.target.value })} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Lingkungan - Fisik</label><Input value={data.desain.lingkungan.fisik} onChange={e => updateNested("lingkungan", { ...data.desain.lingkungan, fisik: e.target.value })} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Lingkungan - Virtual</label><Input value={data.desain.lingkungan.virtual} onChange={e => updateNested("lingkungan", { ...data.desain.lingkungan, virtual: e.target.value })} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Digital - Perencanaan</label><Input value={data.desain.digital.perencanaan} onChange={e => updateNested("digital", { ...data.desain.digital, perencanaan: e.target.value })} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Digital - Pelaksanaan</label><Input value={data.desain.digital.pelaksanaan} onChange={e => updateNested("digital", { ...data.desain.digital, pelaksanaan: e.target.value })} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Digital - Asesmen</label><Input value={data.desain.digital.asesmen} onChange={e => updateNested("digital", { ...data.desain.digital, asesmen: e.target.value })} /></div>
        </div>
      </div>
    </div>
  );
}
