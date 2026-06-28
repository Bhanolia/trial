"use client";

import { Textarea } from "@/components/ui/textarea";
import { RPPData } from "@/types/rpp";

interface Props {
  data: RPPData;
  setData: (updater: (prev: RPPData) => RPPData) => void;
  errors?: Record<string, string>;
}

export function AsesmenTab({ data, setData, errors }: Props) {
  const update = (field: keyof RPPData["asesmen"], value: string) => {
    setData(prev => ({ ...prev, asesmen: { ...prev.asesmen, [field]: value } }));
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">📊</span> Asesmen Pembelajaran
      </h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Asesmen Awal <span className="text-red-500">*</span></label>
          <Textarea value={data.asesmen.awal} onChange={e => update("awal", e.target.value)} rows={3}
            className={errors?.awal ? "border-red-500 focus-visible:ring-red-500" : ""} />
          {errors?.awal && <p className="text-xs text-red-500">{errors.awal}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Asesmen Proses <span className="text-red-500">*</span></label>
          <Textarea value={data.asesmen.proses} onChange={e => update("proses", e.target.value)} rows={3}
            className={errors?.proses ? "border-red-500 focus-visible:ring-red-500" : ""} />
          {errors?.proses && <p className="text-xs text-red-500">{errors.proses}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Asesmen Akhir <span className="text-red-500">*</span></label>
          <Textarea value={data.asesmen.akhir} onChange={e => update("akhir", e.target.value)} rows={3}
            className={errors?.akhir ? "border-red-500 focus-visible:ring-red-500" : ""} />
          {errors?.akhir && <p className="text-xs text-red-500">{errors.akhir}</p>}
        </div>
      </div>
    </div>
  );
}
