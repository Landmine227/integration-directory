import fs from 'fs';
import path from 'path';

interface Integration {
  tool_a: string;
  tool_b: string;
  use_case: string;
  slug: string;
}

export default async function Home() {
  // 1. Locate and read the data file updated by n8n
  const filePath = path.join(process.cwd(), 'data', 'integrations.json');
  let integrations: Integration[] = [];

  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    integrations = JSON.parse(fileData);
  } catch (error) {
    console.error("No data file found yet or invalid JSON format.", error);
  }

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 font-sans">
      <header className="mb-12 border-b pb-6">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          B2B Integration Middleware Registry
        </h1>
        <p className="text-slate-600 mt-2">
          Automated live monitoring of custom webhook connectors and automation bridges.
        </p>
      </header>

      <div className="space-y-4">
        {integrations.length === 0 ? (
          <p className="text-slate-500 italic">Awaiting first automated n8n data sync stream...</p>
        ) : (
          integrations.map((item, idx) => (
            <div key={idx} className="p-6 border rounded-xl bg-white shadow-sm hover:border-blue-500 transition-colors">
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-2">
                <span>{item.tool_a}</span>
                <span className="text-slate-400">➔</span>
                <span>{item.tool_b}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-800 capitalize mb-2">
                {item.tool_a} to {item.tool_b} Data Bridge
              </h2>
              <p className="text-slate-600 text-sm mb-4">{item.use_case}</p>
              
              {/* The Monetization Gate Hook */}
              <div className="flex items-center justify-between border-t pt-4 mt-4 bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-xl">
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                  ● Connected Live Stream
                </span>
                <button className="text-xs font-semibold text-white bg-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-700">
                  Unlock Live Sync Template ($49/mo)
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
