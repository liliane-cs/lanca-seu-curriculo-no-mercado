import React from "react";
import { Sun, Moon, Type, ArrowRight } from "lucide-react";
import "./estilos.css";

interface CabecalhoProps {
  tema: "claro" | "escuro";
  onAlternarTema: () => void;
  onAumentarFonte: () => void;
  onDiminuirFonte: () => void;
  tamanhoFonte: number;
}

export default function Cabecalho({
  tema,
  onAlternarTema,
  onAumentarFonte,
  onDiminuirFonte,
  tamanhoFonte,
}: CabecalhoProps) {
  return (
    <header className="cabecalho-container" id="cabecalho-principal">
      <div className="logo-area" id="logo-principal">
        <ArrowRight size={24} className="icone-seta-destaque" />
        <h1 className="logo-titulo" id="logo-titulo-id">
          Lança <span className="logo-subtitulo">— Seu Currículo no Mercado</span>
        </h1>
      </div>

      <div className="controles-acessibilidade" id="controles-acessibilidade-id">
        <button
          className="botao-controle"
          id="btn-diminuir-fonte"
          onClick={onDiminuirFonte}
          title="Diminuir tamanho da fonte"
          aria-label="Diminuir tamanho da fonte"
        >
          <Type size={14} />
          <span>A-</span>
        </button>

        <button
          className="botao-controle"
          id="btn-aumentar-fonte"
          onClick={onAumentarFonte}
          title="Aumentar tamanho da fonte"
          aria-label="Aumentar tamanho da fonte"
        >
          <Type size={18} />
          <span>A+</span>
        </button>

        <button
          className="botao-controle"
          id="btn-alternar-tema"
          onClick={onAlternarTema}
          title={tema === "claro" ? "Mudar para Tema Escuro" : "Mudar para Tema Claro"}
          aria-label={tema === "claro" ? "Mudar para Tema Escuro" : "Mudar para Tema Claro"}
        >
          {tema === "claro" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
}
