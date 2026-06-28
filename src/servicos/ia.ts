import { Curriculo } from "../tipos/curriculo";

const WEBHOOK_BASE = import.meta.env.VITE_WEBHOOK_URL;

export async function melhorarSecao(secao: string, conteudo: string): Promise<string> {
  const response = await fetch(`${WEBHOOK_BASE}/webhook/melhorar-secao`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
    body: JSON.stringify({ secao, conteudo }),
  });
  const data = await response.json();
  return data.resultado;
}

export async function analisarCompatibilidade(
  curriculo: Curriculo,
  descricaoVaga: string
): Promise<{ percentual: number; pontosFortres: string[]; sugestoes: string[] }> {
  const response = await fetch(`${WEBHOOK_BASE}/webhook/analisar-vaga`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
    body: JSON.stringify({ curriculo: JSON.stringify(curriculo), vaga: descricaoVaga }),
  });
  const data = await response.json();
  const textoLimpo = data.resultado.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(textoLimpo);
  console.log("[analisarCompatibilidade] parsed:", parsed);
  return {
    percentual: parsed.percentual ?? 0,
    pontosFortres: Array.isArray(parsed.pontosFortes) ? parsed.pontosFortes : [],
    sugestoes: Array.isArray(parsed.sugestoes) ? parsed.sugestoes : [],
  };
}

export async function aplicarSugestoes(
  curriculo: Curriculo,
  sugestoesMarcadas: string[]
): Promise<Curriculo> {
  const response = await fetch(`${WEBHOOK_BASE}/webhook/aplicar-sugestoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
    body: JSON.stringify({
      curriculo: JSON.stringify(curriculo),
      sugestoes: JSON.stringify(sugestoesMarcadas),
    }),
  });
  const data = await response.json();
  const textoLimpo = data.resultado.replace(/```json|```/g, "").trim();
  return JSON.parse(textoLimpo);
}