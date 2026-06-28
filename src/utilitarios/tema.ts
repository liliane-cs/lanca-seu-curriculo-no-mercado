export type Tema = "claro" | "escuro";

export function obterTemaSalvo(): Tema {
  if (typeof window !== "undefined") {
    const salvo = localStorage.getItem("lanca-tema");
    if (salvo === "claro" || salvo === "escuro") {
      return salvo;
    }
  }
  return "claro";
}

export function salvarTema(tema: Tema): void {
  localStorage.setItem("lanca-tema", tema);
}

export function aplicarTemaAoHTML(tema: Tema): void {
  const html = document.documentElement;
  if (tema === "escuro") {
    html.classList.add("tema-escuro");
  } else {
    html.classList.remove("tema-escuro");
  }
}
