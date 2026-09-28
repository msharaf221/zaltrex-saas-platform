"use client";

import React, { useState } from "react";
import { useSound } from "../audio/SoundContext";
import { useToast } from "../ui/ToastContext";

type LangKey = "bash" | "ts" | "python" | "rust";

export default function DeveloperConsole() {
  const [activeLang, setActiveLang] = useState<LangKey>("bash");
  const [isRunning, setIsRunning] = useState(false);
  const [outputHtml, setOutputHtml] = useState<React.ReactNode>(
    <>
      <span className="text-emerald-400">✔ Ready:</span> Click &quot;Run Command&quot; to simulate
      live deployment handshake.
    </>
  );

  const { playClick, playSuccess } = useSound();
  const { showToast } = useToast();

  const codeSnippets: Record<LangKey, string> = {
    bash: `# 1. Initialize high-performance cluster with zero-trust encryption
$ zaltrex cluster init --name="prod-omega" --regions=eu-west,us-east --ha

# 2. Deploy autonomous workload with sub-second scale
$ zaltrex deploy ./app.wasm --max-rps=500000 --latency-budget=8ms

# 3. Stream live distributed traces across edge nodes
$ zaltrex telemetry stream --filter="status=error || p99>15ms"`,

    ts: `import { ZaltrexClient } from '@zaltrex/sdk';

const zaltrex = new ZaltrexClient({
  apiKey: process.env.ZALTREX_API_KEY,
  cluster: 'fra-mesh-01',
  slaMode: 'ultra-low-latency'
});

// Deploy auto-healing microservice with sub-millisecond route
const cluster = await zaltrex.mesh.spawn({
  name: 'auth-gateway',
  replicas: 48,
  runtime: 'wasm-edge-v2'
});

console.log(\`Cluster online: \${cluster.endpoint} [Ping: \${cluster.p99}ms]\`);`,

    python: `from zaltrex import MeshEngine, ModelPipeline

mesh = MeshEngine.connect(region="global-edge")

# Attach distributed vector pipeline with 0ms memory leakage
pipeline = mesh.attach_pipeline(
    name="financial-copilot",
    embeddings="zaltrex-vector-dense",
    max_concurrency=100_000
)

results = pipeline.dispatch_inference({"query": "analyze 10k SEC filings"})
print(f"Executed in {results.duration_ms}ms with zero cold start.")`,

    rust: `use zaltrex_core::{Cluster, MeshConfig, Protocol};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let config = MeshConfig::builder()
        .heartbeat_ms(5)
        .protocol(Protocol::MtlsZeroTrust)
        .build();

    let mut cluster = Cluster::boot(config).await?;
    println!("Zaltrex engine booted: {:?}", cluster.telemetry().await);
    Ok(())
}`,
  };

  const executeCommand = () => {
    playClick();
    setIsRunning(true);
    setOutputHtml(
      <span className="text-cyan-400 animate-pulse">
        ⟳ Initializing cluster handshake...
      </span>
    );

    setTimeout(() => {
      setIsRunning(false);
      setOutputHtml(
        <div>
          <div className="text-emerald-400 font-bold">✔ SUCCESS (executed in 4.2ms)</div>
          <div className="text-slate-300 mt-1">
            Cluster <span className="text-cyan-400">prod-omega</span> provisioned across Frankfurt
            (FRA-01) &amp; Virginia (IAD-02).
          </div>
          <div className="text-slate-400">
            Mesh state: 100% HEALTHY • mTLS Key Handshake Verified • 0 dropped packets.
          </div>
        </div>
      );
      playSuccess();
      showToast("Command executed successfully in 4.2ms!");
    }, 700);
  };

  return (
    <section className="py-24 md:py-32 relative bg-obsidian-950" id="playground">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Developer-First Fabric
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Instant Orchestration. Zero Friction.
            </h2>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-md">
            Test the Zaltrex orchestration SDK live in your browser. Switch languages, simulate
            cluster execution, and inspect real-time responses.
          </p>
        </div>

        {/* Terminal Card */}
        <div className="rounded-2xl border border-white/10 bg-obsidian-900/90 shadow-2xl overflow-hidden font-mono text-xs">
          {/* Terminal Header with Tabs */}
          <div className="px-4 py-3 bg-obsidian-850 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
              <span className="ml-2 text-slate-400 text-xs">
                terminal — {activeLang}
              </span>
            </div>

            {/* Language Tabs */}
            <div className="flex items-center gap-1 bg-obsidian-950 p-1 rounded-lg border border-white/5">
              {(["bash", "ts", "python", "rust"] as LangKey[]).map((lang) => {
                const labelMap: Record<LangKey, string> = {
                  bash: "CLI",
                  ts: "TypeScript",
                  python: "Python",
                  rust: "Rust",
                };
                const isActive = activeLang === lang;
                return (
                  <button
                    key={lang}
                    onClick={() => {
                      playClick();
                      setActiveLang(lang);
                    }}
                    className={`px-3 py-1 rounded transition-all cursor-pointer ${
                      isActive
                        ? "bg-indigo-600/40 text-cyan-300 font-semibold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {labelMap[lang]}
                  </button>
                );
              })}
            </div>

            <button
              onClick={executeCommand}
              disabled={isRunning}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <span>▶ Run Command</span>
            </button>
          </div>

          {/* Code View Area */}
          <div className="p-6 bg-obsidian-950 text-slate-300 overflow-x-auto min-h-[220px]">
            <pre className="leading-relaxed font-mono whitespace-pre">
              <code>{codeSnippets[activeLang]}</code>
            </pre>
          </div>

          {/* Live Output Console */}
          <div
            id="terminal-output"
            className="p-4 bg-black border-t border-white/5 text-[11px] text-slate-400 font-mono"
          >
            {outputHtml}
          </div>
        </div>
      </div>
    </section>
  );
}
