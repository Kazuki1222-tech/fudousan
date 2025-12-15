import React, { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { TSUBO_TO_M2_RATE } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Converter: React.FC = () => {
  const [tsubo, setTsubo] = useState("");
  const [m2, setM2] = useState("");

  const handleTsuboChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTsubo(val);

    if (val === "") {
      setM2("");
      return;
    }

    const num = Number(val);
    if (!Number.isFinite(num)) return;
    setM2((num * TSUBO_TO_M2_RATE).toFixed(2));
  };

  const handleM2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setM2(val);

    if (val === "") {
      setTsubo("");
      return;
    }

    const num = Number(val);
    if (!Number.isFinite(num)) return;
    setTsubo((num / TSUBO_TO_M2_RATE).toFixed(2));
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-accent" />
            坪・平米 変換
          </CardTitle>
          <p className="text-sm text-slate-500">数値を入力すると自動的に変換されます</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-[1fr,auto,1fr] items-center">
            <div className="w-full">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">坪数</label>
              <div className="relative">
                <Input type="number" placeholder="例: 30" value={tsubo} onChange={handleTsuboChange} />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium pointer-events-none">
                  坪
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="bg-slate-100 p-2 rounded-full text-slate-400">
                <ArrowRightLeft className="w-6 h-6" />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">平米数 (㎡)</label>
              <div className="relative">
                <Input type="number" placeholder="例: 100" value={m2} onChange={handleM2Change} />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium pointer-events-none">
                  ㎡
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">計算式</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-500">
              <li>1 坪 = {TSUBO_TO_M2_RATE} ㎡</li>
              <li>㎡ → 坪 : ㎡ ÷ {TSUBO_TO_M2_RATE}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

