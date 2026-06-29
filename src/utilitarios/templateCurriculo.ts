export type TemplateCurriculo = "classico" | "moderno" | "elegante";

const CHAVE_TEMPLATE = "template-curriculo";

export const TEMPLATES: {
  id: TemplateCurriculo;
  nome: string;
  descricao: string;
  acento: string;
}[] = [
  {
    id: "classico",
    nome: "Clássico",
    descricao: "Limpo e direto, ideal para qualquer área",
    acento: "#2563EB",
  },
  {
    id: "moderno",
    nome: "Moderno",
    descricao: "Sidebar colorida com destaque visual",
    acento: "#7C3AED",
  },
  {
    id: "elegante",
    nome: "Elegante",
    descricao: "Refinado com tipografia sofisticada",
    acento: "#0F766E",
  },
];

export function obterTemplateSalvo(): TemplateCurriculo {
  const salvo = localStorage.getItem(CHAVE_TEMPLATE);
  if (salvo === "classico" || salvo === "moderno" || salvo === "elegante") {
    return salvo;
  }
  return "classico";
}

export function salvarTemplate(template: TemplateCurriculo): void {
  localStorage.setItem(CHAVE_TEMPLATE, template);
}
