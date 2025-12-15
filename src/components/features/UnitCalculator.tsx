import React, { useMemo, useState } from "react";
import { Calculator, PieChart } from "lucide-react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TSUBO_TO_M2_RATE } from "@/constants";
import { UnitType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const UnitCalculator: React.FC = () => {
  const [price, setPrice] = useState<string>(""); // 万円
  const [area, setArea] = useState<string>("");
  const [areaUnit, setAreaUnit] = useState<UnitType>(UnitType.TSUBO);

  const results = useMemo(() => {
    const priceManYen = Number(price);
    const areaNum = Number(area);

    if (!Number.isFinite(priceManYen) || !Number.isFinite(areaNum) || areaNum === 0) {
      return null;
    }

    const tsuboArea = areaUnit === UnitType.TSUBO ? areaNum : areaNum / TSUBO_TO_M2_RATE;
    const m2Area = areaUnit === UnitType.M2 ? areaNum : areaNum * TSUBO_TO_M2_RATE;

    const tsuboPriceManYen = priceManYen / tsuboArea;
    const m2PriceManYen = priceManYen / m2Area;

    return { tsuboPriceManYen, m2PriceManYen };
  }, [price, area, areaUnit]);

  const chartData = results
    ? [
        { name: "坪単価", value: results.tsuboPriceManYen, fill: "#0f172a" }, // slate-900
        { name: "㎡単価", value: results.m2PriceManYen, fill: "#3b82f6" }, // accent
      ]
    : [];

  const formatManYen = (val: number) => `${new Intl.NumberFormat("ja-JP", { maximumFractionDigits: 2 }).format(val)}万円`;

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-accent" />
            単価計算
          </CardTitle>
          <p className="text-sm text-slate-500">土地価格と面積から坪単価・㎡単価を算出します</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="w-full">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">土地価格 (万円)</label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="例: 3000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium pointer-events-none">
                  万円
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">面積</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="例: 30"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="rounded-r-none"
                />
                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0">
                  <button
                    type="button"
                    onClick={() => setAreaUnit(UnitType.TSUBO)}
                    className={[
                      "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                      areaUnit === UnitType.TSUBO
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-900",
                    ].join(" ")}
                  >
                    坪
                  </button>
                  <button
                    type="button"
                    onClick={() => setAreaUnit(UnitType.M2)}
                    className={[
                      "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                      areaUnit === UnitType.M2
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-900",
                    ].join(" ")}
                  >
                    ㎡
                  </button>
                </div>
              </div>
            </div>
          </div>

          {results ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
                <p className="text-slate-400 text-sm font-medium mb-1">坪単価</p>
                <p className="text-3xl font-bold tracking-tight">
                  {formatManYen(results.tsuboPriceManYen)}
                  <span className="text-base font-normal text-slate-400 ml-1">/坪</span>
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <p className="text-slate-400 text-sm font-medium mb-1">㎡単価</p>
                  <p className="text-xl font-semibold">
                    {formatManYen(results.m2PriceManYen)}
                    <span className="text-sm font-normal text-slate-400 ml-1">/㎡</span>
                  </p>
                </div>
              </div>

              <div className="h-48 w-full border border-slate-100 rounded-xl p-4 bg-white">
                <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
                  <PieChart className="w-3 h-3" /> 単価比較イメージ
                </p>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={50} tick={{ fontSize: 12 }} interval={0} />
                    <Tooltip formatter={(value: number) => formatManYen(value)} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-lg p-8 text-center border border-dashed border-slate-200">
              <p className="text-slate-400">数値を入力すると結果が表示されます</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
