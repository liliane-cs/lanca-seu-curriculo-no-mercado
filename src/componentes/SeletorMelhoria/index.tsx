import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";
import "./estilos.css";

interface SeletorMelhoriaProps {
  onMelhorar: (opcao: string, textoLivre?: string) => void;
  onFechar: () => void;
  melhorando: boolean;
}

export default function SeletorMelhoria({
  onMelhorar,
  onFechar,
  melhorando,
}: SeletorMelhoriaProps) {
  const [opcao, setOpcao] = useState("inteiro");
  const [textoLivre, setTextoLivre] = useState("");

  const opcoes = [
    { id: "inteiro", label: "Currículo Inteiro", descricao: "Otimizar tom, gramática e coerência geral." },
    { id: "perfil", label: "Perfil Profissional", descricao: "Tornar o resumo mais impactante e focado." },
    { id: "experiencias", label: "Experiências", descricao: "Destacar conquistas profissionais de forma ativa." },
    { id: "habilidades", label: "Habilidades", descricao: "Reorganizar habilidades por relevância de mercado." },
    { id: "outro", label: "Outro Campo / Personalizado", descricao: "Instrução livre para a IA." },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onMelhorar(opcao, opcao === "outro" ? textoLivre : undefined);
  };

  return (
    <div className="modal-melhoria-overlay" id="modal-melhoria-overlay-id" onClick={onFechar}>
      <div
        className="modal-melhoria-content"
        id="modal-melhoria-content-id"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-melhoria-header">
          <div className="modal-melhoria-titulo">
            <Sparkles size={18} className="icone-ia" />
            <h3>Melhorar com IA</h3>
          </div>
          <button
            type="button"
            className="botao-fechar-modal"
            onClick={onFechar}
            title="Fechar"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="form-melhoria">
          <div className="opcoes-lista">
            {opcoes.map((op) => (
              <label
                key={op.id}
                className={`opcao-item-card ${opcao === op.id ? "selecionado" : ""}`}
              >
                <input
                  type="radio"
                  name="opcao-melhoria"
                  value={op.id}
                  checked={opcao === op.id}
                  onChange={() => setOpcao(op.id)}
                  className="radio-invisivel"
                />
                <div className="radio-marcador"></div>
                <div className="opcao-texto">
                  <span className="opcao-label">{op.label}</span>
                  <span className="opcao-desc">{op.descricao}</span>
                </div>
              </label>
            ))}
          </div>

          {opcao === "outro" && (
            <div className="campo-container input-texto-livre-container">
              <label htmlFor="input-texto-livre">O que você gostaria de melhorar?</label>
              <textarea
                id="input-texto-livre"
                value={textoLivre}
                onChange={(e) => setTextoLivre(e.target.value)}
                placeholder="Ex: Reescreva a seção de experiências com foco em liderança de produtos sênior..."
                rows={3}
                required
              />
            </div>
          )}

          <div className="modal-melhoria-footer">
            <button
              type="button"
              className="botao-cancelar"
              onClick={onFechar}
              disabled={melhorando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="botao-melhorar-confirmar"
              disabled={melhorando || (opcao === "outro" && !textoLivre.trim())}
            >
              {melhorando ? "Melhorando..." : "Melhorar Seção"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
