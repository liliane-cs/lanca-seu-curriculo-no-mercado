import React from "react";
import { Sparkles, FileText, FileDown } from "lucide-react";
import "./estilos.css";

interface BotoesAcaoProps {
  onAbrirMelhoria: () => void;
  onAtivarAdaptacao: () => void;
  onExportarPDF: () => void;
  adaptacaoAtiva: boolean;
}

export default function BotoesAcao({
  onAbrirMelhoria,
  onAtivarAdaptacao,
  onExportarPDF,
  adaptacaoAtiva,
}: BotoesAcaoProps) {
  return (
    <div className="botoes-acao-container" id="botoes-acao-secao">
      <button
        type="button"
        className="botao-acao botao-melhorar"
        onClick={onAbrirMelhoria}
        id="btn-melhorar-ia"
      >
        <Sparkles size={16} />
        <span>Melhorar Currículo</span>
      </button>

      <button
        type="button"
        className={`botao-acao botao-adaptar ${adaptacaoAtiva ? "ativo" : ""}`}
        onClick={onAtivarAdaptacao}
        id="btn-adaptar-vaga"
      >
        <FileText size={16} />
        <span>Adaptar para Vaga</span>
      </button>

      <button
        type="button"
        className="botao-acao botao-exportar"
        onClick={onExportarPDF}
        id="btn-exportar-pdf-curriculo"
      >
        <FileDown size={16} />
        <span>Exportar PDF</span>
      </button>
    </div>
  );
}
