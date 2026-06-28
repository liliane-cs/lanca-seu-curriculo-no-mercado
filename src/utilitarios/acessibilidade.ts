export const TAMANHO_FONTE_MINIMO = 12;
export const TAMANHO_FONTE_PADRAO = 16;
export const TAMANHO_FONTE_MAXIMO = 24;
export const PASSO_FONTE = 2;

export function obterTamanhoFonteSalvo(): number {
  if (typeof window !== "undefined") {
    const salvo = localStorage.getItem("lanca-tamanho-fonte");
    if (salvo) {
      const tamanho = parseInt(salvo, 10);
      if (!isNaN(tamanho) && tamanho >= TAMANHO_FONTE_MINIMO && tamanho <= TAMANHO_FONTE_MAXIMO) {
        return tamanho;
      }
    }
  }
  return TAMANHO_FONTE_PADRAO;
}

export function salvarTamanhoFonte(tamanho: number): void {
  localStorage.setItem("lanca-tamanho-fonte", tamanho.toString());
}

export function aplicarTamanhoFonteAoHTML(tamanho: number): void {
  document.documentElement.style.fontSize = `${tamanho}px`;
}
