import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import "./estilos.css";

interface SecaoHabilidadesProps {
  habilidades: string[];
  onChange: (habilidades: string[]) => void;
}

export default function SecaoHabilidades({ habilidades, onChange }: SecaoHabilidadesProps) {
  const [novaHabilidade, setNovaHabilidade] = useState("");

  const adicionarHabilidade = (e: React.FormEvent) => {
    e.preventDefault();
    const limpo = novaHabilidade.trim();
    if (limpo && !habilidades.includes(limpo)) {
      onChange([...habilidades, limpo]);
      setNovaHabilidade("");
    }
  };

  const removerHabilidade = (nome: string) => {
    onChange(habilidades.filter((hab) => hab !== nome));
  };

  return (
    <div className="secao-habilidades" id="secao-habilidades-id">
      <form onSubmit={adicionarHabilidade} className="form-add-habilidade" id="form-habilidade">
        <div className="campo-container flex-grow">
          <label htmlFor="input-habilidade">Habilidade / Tecnologia</label>
          <div className="input-com-botao">
            <input
              type="text"
              id="input-habilidade"
              value={novaHabilidade}
              onChange={(e) => setNovaHabilidade(e.target.value)}
              placeholder="Ex: React, TypeScript, Gestão de Projetos..."
            />
            <button type="submit" className="botao-add-tag" title="Adicionar Habilidade" aria-label="Adicionar Habilidade">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </form>

      <div className="tags-container" id="container-tags-id">
        {habilidades.map((hab) => (
          <span key={hab} className="tag-habilidade" id={`tag-${hab}`}>
            {hab}
            <button
              type="button"
              className="botao-remover-tag"
              onClick={() => removerHabilidade(hab)}
              title={`Remover ${hab}`}
              aria-label={`Remover ${hab}`}
            >
              <X size={12} />
            </button>
          </span>
        ))}

        {habilidades.length === 0 && (
          <div className="estado-vazio-tags">Adicione tecnologias ou competências profissionais relevantes.</div>
        )}
      </div>
    </div>
  );
}
