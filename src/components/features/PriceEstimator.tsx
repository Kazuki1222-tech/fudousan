import React from "react";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const PriceEstimator: React.FC = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            住所から価格推定（TBD）
          </CardTitle>
          <p className="text-sm text-slate-500">
            住所から推定価格を出すロジックは検討中です。
            <br />
            <span className="text-xs text-slate-400">※データソース/算出方法が固まり次第、実装します。</span>
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex gap-2 flex-col sm:flex-row">
            <Input
              placeholder="住所を入力 (例: 東京都千代田区丸の内1丁目)"
              className="flex-1"
              disabled
            />
            <Button className="min-w-[120px]" disabled variant="secondary">
              推定（準備中）
            </Button>
          </div>

          <div className="bg-slate-50 rounded-lg p-8 text-center border border-dashed border-slate-200">
            <p className="text-slate-400">仕様・ロジック確定後に公開します</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

