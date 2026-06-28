"use client";

import { Input } from "@/components/ui/input";
import { RPPData } from "@/types/rpp";

interface Props {
  data: RPPData;
  setData: (updater: (prev: RPPData) => RPPData) => void;
  errors?: Record<string, string>;
}

export function IdentitasTab({ data, setData, errors }: Props) {
  const updateNested = (field: keyof RPPData["identitas"], value: string) => {
    setData(prev => ({
      ...prev,
      identitas: { ...prev.identitas, [field]: value },
    }));
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">📝</span> Identitas Pembelajaran
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Nama Satuan Pendidikan <span className="text-red-500">*</span></label>
          <Input
            value={data.identitas.satuanPendidikan}
            onChange={e => updateNested("satuanPendidikan", e.target.value)}
            placeholder="SMK..."
            className={errors?.satuanPendidikan ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors?.satuanPendidikan && <p className="text-xs text-red-500">{errors.satuanPendidikan}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Mata Pelajaran <span className="text-red-500">*</span></label>
          <Input
            value={data.identitas.mataPelajaran}
            onChange={e => updateNested("mataPelajaran", e.target.value)}
            placeholder="Nama mata pelajaran..."
            className={errors?.mataPelajaran ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors?.mataPelajaran && <p className="text-xs text-red-500">{errors.mataPelajaran}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Nama Guru <span className="text-red-500">*</span></label>
          <Input
            value={data.identitas.namaGuru}
            onChange={e => updateNested("namaGuru", e.target.value)}
            placeholder="Nama lengkap guru..."
            className={errors?.namaGuru ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors?.namaGuru && <p className="text-xs text-red-500">{errors.namaGuru}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Kelas / Semester <span className="text-red-500">*</span></label>
          <Input
            value={data.identitas.kelasSemester}
            onChange={e => updateNested("kelasSemester", e.target.value)}
            placeholder="X / Gasal"
            className={errors?.kelasSemester ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors?.kelasSemester && <p className="text-xs text-red-500">{errors.kelasSemester}</p>}
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Alokasi Waktu</label>
          <Input
            value={data.identitas.alokasiWaktu}
            onChange={e => updateNested("alokasiWaktu", e.target.value)}
            placeholder="1 X 3 JP x @45 menit"
          />
        </div>
      </div>
    </div>
  );
}
