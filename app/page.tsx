"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  const [mdContent, setMdContent] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/cursorrules.mdc")
      .then((res) => res.text())
      .then(setMdContent);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mdContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([mdContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cursorrules.mdc";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <h1 className="text-3xl font-bold text-center mt-8 mb-8">vibeCoding Tutorial</h1>
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Markdown Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <Button onClick={handleCopy} type="button">
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button onClick={handleDownload} type="button" variant="secondary">
              Download
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded text-sm whitespace-pre-wrap min-h-[200px]">
            {mdContent || "Loading..."}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
