import React from "react";
import { FileText, School } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PdfLink = {
  title: string;
  fileName: string;
};

const PDFS: PdfLink[] = [
  { title: "町名別通学区域一覧", fileName: "町名別通学区域一覧.pdf" },
  { title: "小学校特定地域一覧", fileName: "小学校特定地域一覧.pdf" },
  { title: "中学校特定地域一覧", fileName: "中学校特定地域一覧.pdf" },
];

export const SchoolDistrict: React.FC = () => {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="w-5 h-5 text-accent" />
            学区（PDF）
          </CardTitle>
          <p className="text-sm text-slate-500">自治体が公開している学区PDFを一覧で確認できます</p>
        </CardHeader>

        <CardContent className="space-y-3">
          {PDFS.map((pdf) => {
            const url = `${baseUrl}pdfs/${encodeURIComponent(pdf.fileName)}`;
            return (
              <a
                key={pdf.fileName}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-500" />
                  {pdf.title}
                </span>
                <span className="text-xs text-slate-500">開く</span>
              </a>
            );
          })}

          <div className="text-xs text-slate-400 bg-slate-50 p-3 rounded border border-slate-100">
            学区指定は変更される可能性があります。最新情報は自治体の公式資料もあわせて確認してください。
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
