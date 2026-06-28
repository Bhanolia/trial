"use client";

import { Input } from "@/components/ui/input";
import { RPPData } from "@/types/rpp";

interface Props {
  data: RPPData;
  setData: (updater: (prev: RPPData) => RPPData) => void;
  errors?: Record<string, string>;
}

export function IdentitasTab({ data, setData, errors }: Props) {
  const update = (field: keyof typeof data.identitas, value: string) => {
    setData(prev => ({ ...prev, identitas: { ...prev.identitas, [field]: value } }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Identitas Pembelajaran</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Nama Satuan Pendidikan</label>
          <Input value={data.identitas.satuanPendidikan} onChange={e => update("satuanPendidikan", e.target.value)} className={errors?.satuanPendidikan ? "input-error" : ""} />
          {errors?.satuanPendidikan && <p className="error-text">{errors.satuanPendidikan}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Mata Pelajaran</label>
          <Input value={data.identitas.mataPelajaran} onChange={e => update("mataPelajaran", e.target.value)} className={errors?.mataPelajaran ? "input-error" : ""} />
          {errors?.mataPelajaran && <p className="error-text">{errors.mataPelajaran}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Nama Guru</label>
          <Input value={data.identitas.namaGuru} onChange={e => update("namaGuru", e.target.value)} className={errors?.namaGuru ? "input-error" : ""} />
          {errors?.namaGuru && <p className="error-text">{errors.namaGuru}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Kelas / Semester</label>
          <Input value={data.identitas.kelasSemester} onChange={e => update("kelasSemester", e.target.value)} className={errors?.kelasSemester ? "input-error" : ""} />
          {errors?.kelasSemester && <p className="error-text">{errors.kelasSemester}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Alokasi Waktu</label>
          <Input value={data.identitas.alokasiWaktu} onChange={e => update("alokasiWaktu", e.target.value)} />
        </div>
      </div>
    </div>
  );
}
