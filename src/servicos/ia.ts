import { Curriculo } from "../tipos/curriculo";

const WEBHOOK_BASE = import.meta.env.VITE_WEBHOOK_URL;

export async function aprimorarCurriculo(
  curriculo: Curriculo,
  secao: "completo" | "perfilProfissional" | "experiencias" | "formacao" | "habilidades",
  instrucao?: string
): Promise<Curriculo> {
  const response = await fetch(`${WEBHOOK_BASE}/webhook/aprimorar-curriculo`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
    body: JSON.stringify({
      curriculo: JSON.stringify(curriculo),
      secao,
      instrucao,
    }),
  });
  const data = await response.json();
  const textoLimpo = data.resultado.replace(/```json|```/g, "").trim();
  return JSON.parse(textoLimpo);
}

export interface ResultadoAnaliseVaga {
  percentual: number;
  compativel: string[];
  incompativel: string[];
  pontosFortes: string[];
  pontosFracos: string[];
  sugestoes: string[];
}

export async function analisarCompatibilidade(
  curriculo: Curriculo,
  descricaoVaga: string
): Promise<ResultadoAnaliseVaga> {
  const response = await fetch(`${WEBHOOK_BASE}/webhook/analisar-vaga`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
    body: JSON.stringify({ curriculo: JSON.stringify(curriculo), vaga: descricaoVaga }),
  });

  if (!response.ok) {
    throw new Error(`Falha ao analisar a vaga (status ${response.status})`);
  }

  const data = await response.json();

  if (!data?.resultado) {
    throw new Error("Resposta do webhook não trouxe o campo 'resultado'");
  }

  const textoLimpo = data.resultado.replace(/```json|```/g, "").trim();

  let parsed: Partial<ResultadoAnaliseVaga>;
  try {
    parsed = JSON.parse(textoLimpo);
  } catch {
    const match = textoLimpo.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        parsed = JSON.parse(match[0]);
      } catch {
        console.error("Conteúdo bruto recebido do webhook (falhou no parse):", data.resultado);
        throw new Error("Não foi possível interpretar o JSON retornado pela análise da vaga");
      }
    } else {
      console.error("Conteúdo bruto recebido do webhook (falhou no parse):", data.resultado);
      throw new Error("Não foi possível interpretar o JSON retornado pela análise da vaga");
    }
  }

  const percentual = extrairPercentual(parsed.percentual);

  return {
    percentual,
    compativel: Array.isArray(parsed.compativel) ? parsed.compativel : [],
    incompativel: Array.isArray(parsed.incompativel) ? parsed.incompativel : [],
    pontosFortes: Array.isArray(parsed.pontosFortes) ? parsed.pontosFortes : [],
    pontosFracos: Array.isArray(parsed.pontosFracos) ? parsed.pontosFracos : [],
    sugestoes: Array.isArray(parsed.sugestoes) ? parsed.sugestoes : [],
  };
}

/**
 * Converte o campo "percentual" vindo do modelo para um inteiro 0-100,
 * cobrindo formatos variados que a IA pode retornar:
 * - número normal: 45
 * - string com símbolo: "45%"
 * - string com vírgula: "45,5"
 * - fração: 0.45 (interpretada como 45%)
 */
function extrairPercentual(valor: unknown): number {
  if (valor === null || valor === undefined) return 0;

  let texto = String(valor).trim();
  texto = texto.replace(",", ".").replace("%", "").trim();

  const numero = Number(texto);
  if (!Number.isFinite(numero)) {
    console.error("Valor de percentual não reconhecido:", valor);
    return 0;
  }

  // Se vier como fração (ex: 0.45), converte para escala 0-100
  const escalado = numero > 0 && numero <= 1 ? numero * 100 : numero;

  return Math.min(100, Math.max(0, Math.round(escalado)));
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