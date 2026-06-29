import React, { useState, useRef, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { TemplateCurriculo, TEMPLATES } from "../../utilitarios/templateCurriculo";
import "./estilos.css";

interface SeletorTemplateProps {
  templateAtual: TemplateCurriculo;
  onAlterarTemplate: (t: TemplateCurriculo) => void;
}

export default function SeletorTemplate({
  templateAtual,
  onAlterarTemplate,
}: SeletorTemplateProps) {
  const [aberto, setAberto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickFora(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const nomeAtual = TEMPLATES.find((t) => t.id === templateAtual)?.nome ?? "Clássico";

  return (
    <div className="seletor-template-wrapper" ref={ref}>
      <button
        type="button"
        id="btn-alterar-template"
        className={`botao-acao botao-template ${aberto ? "ativo" : ""}`}
        onClick={() => setAberto((prev) => !prev)}
        aria-expanded={aberto}
        aria-haspopup="listbox"
      >
        <Palette size={16} />
        <span>Design: {nomeAtual}</span>
      </button>

      {aberto && (
        <div
          className="template-popover"
          role="listbox"
          aria-label="Escolher design do currículo"
          id="template-popover"
        >
          <p className="template-popover-titulo">Escolher design</p>
          <div className="template-cards-grid">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                role="option"
                id={`template-card-${t.id}`}
                aria-selected={templateAtual === t.id}
                className={`template-card ${templateAtual === t.id ? "template-card-ativo" : ""}`}
                onClick={() => {
                  onAlterarTemplate(t.id);
                  setAberto(false);
                }}
              >
                {/* Miniatura visual */}
                <div className={`template-miniatura miniatura-${t.id}`}>
                  <div className="mini-linha-nome" style={{ background: t.acento }} />
                  <div className="mini-linha" />
                  <div className="mini-linha curta" />
                  {t.id === "moderno" && (
                    <div
                      className="mini-sidebar"
                      style={{ background: t.acento }}
                    />
                  )}
                  {t.id === "elegante" && (
                    <div
                      className="mini-borda-elegante"
                      style={{ borderColor: t.acento }}
                    />
                  )}
                </div>

                <div className="template-card-info">
                  <span className="template-card-nome">
                    {t.nome}
                    {templateAtual === t.id && (
                      <Check size={12} className="icone-check-template" />
                    )}
                  </span>
                  <span className="template-card-desc">{t.descricao}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
