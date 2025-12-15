import React, { useState } from "react";
import { ArrowRightLeft, Building2, Calculator, MapPin } from "lucide-react";
import { APP_DESCRIPTION, APP_NAME } from "@/constants";
import { TabType } from "@/types";
import { Converter } from "@/components/features/Converter";
import { UnitCalculator } from "@/components/features/UnitCalculator";
import { PriceEstimator } from "@/components/features/PriceEstimator";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.CONVERTER);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">{APP_NAME}</h1>
              <p className="text-[10px] text-slate-500 leading-none">{APP_DESCRIPTION}</p>
            </div>
          </div>
          <div className="text-xs font-mono text-slate-400 hidden sm:block">v0.1.0</div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-8 p-1 bg-slate-200/50 rounded-xl grid grid-cols-3 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab(TabType.CONVERTER)}
            className={[
              "flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === TabType.CONVERTER
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/5"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50",
            ].join(" ")}
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>変換</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(TabType.CALCULATOR)}
            className={[
              "flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === TabType.CALCULATOR
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/5"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50",
            ].join(" ")}
          >
            <Calculator className="w-4 h-4" />
            <span>単価</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(TabType.ESTIMATOR)}
            className={[
              "flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === TabType.ESTIMATOR
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/5"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50",
            ].join(" ")}
          >
            <MapPin className="w-4 h-4" />
            <span>推定</span>
          </button>
        </div>

        <div className="min-h-[400px]">
          {activeTab === TabType.CONVERTER && <Converter />}
          {activeTab === TabType.CALCULATOR && <UnitCalculator />}
          {activeTab === TabType.ESTIMATOR && <PriceEstimator />}
        </div>
      </main>

      <footer className="max-w-3xl mx-auto px-4 py-8 text-center text-slate-400 border-t border-slate-200 mt-8">
        <p className="text-xs mb-2">
          免責事項: 本ツールの結果（単価・推定価格など）は参考値であり、正確性を保証するものではありません。
          <br />
          最終的な判断はご自身で行ってください。
        </p>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} {APP_NAME}
        </p>
      </footer>
    </div>
  );
};

export default App;

