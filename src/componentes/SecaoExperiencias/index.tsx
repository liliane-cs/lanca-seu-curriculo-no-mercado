import React from "react";
import { Experiencia } from "../../tipos/curriculo";
import { Plus, Trash2, Briefcase } from "lucide-react";
import "./estilos.css";

interface SecaoExperienciasProps {
  experiencias: Experiencia[];
  onChange: (experiencias: Experiencia[]) => void;
}

export default function SecaoExperiencias({ experiencias, onChange }: SecaoExperienciasProps) {
  const adicionarExperiencia = () => {
    const nova: Experiencia = {
      id: Math.random().toString(36).substr(2, 9),
      empresa: "",
      cargo: "",
      dataInicio: "",
      dataFim: "",
      atual: false,
      descricao: "",
    };
    onChange([...experiencias, nova]);
  };

  const removerExperiencia = (id: string) => {
    onChange(experiencias.filter((exp) => exp.id !== id));
  };

  const atualizarExperiencia = (id: string, campo: keyof Experiencia, valor: any) => {
    onChange(
      experiencias.map((exp) => {
        if (exp.id === id) {
          return { ...exp, [campo]: valor };
        }
        return exp;
      })
    );
  };

  return (
    <div className="secao-experiencias" id="secao-experiencias-id">
      <div className="lista-itens" id="lista-experiencias">
        {experiencias.map((exp, index) => (
          <div key={exp.id} className="item-experiencia" id={`item-exp-${exp.id}`}>
            <div className="header-item">
              <span className="numero-item">
                <Briefcase size={14} /> Experiência #{index + 1}
              </span>
              <button
                type="button"
                className="botao-remover"
                onClick={() => removerExperiencia(exp.id)}
                title="Remover esta experiência"
                aria-label="Remover esta experiência"
              >
                <Trash2 size={14} />
                <span>Excluir</span>
              </button>
            </div>

            <div className="grupo-campos-exp">
              <div className="campo-container">
                <label htmlFor={`exp-cargo-${exp.id}`}>Cargo</label>
                <input
                  type="text"
                  id={`exp-cargo-${exp.id}`}
                  value={exp.cargo}
                  onChange={(e) => atualizarExperiencia(exp.id, "cargo", e.target.value)}
                  placeholder="Ex: Desenvolvedor Front-end"
                />
              </div>

              <div className="campo-container">
                <label htmlFor={`exp-empresa-${exp.id}`}>Empresa</label>
                <input
                  type="text"
                  id={`exp-empresa-${exp.id}`}
                  value={exp.empresa}
                  onChange={(e) => atualizarExperiencia(exp.id, "empresa", e.target.value)}
                  placeholder="Ex: Lança S.A."
                />
              </div>

              <div className="campo-datas">
                <div className="campo-container">
                  <label htmlFor={`exp-inicio-${exp.id}`}>Início</label>
                  <input
                    type="month"
                    id={`exp-inicio-${exp.id}`}
                    value={exp.dataInicio}
                    onChange={(e) => atualizarExperiencia(exp.id, "dataInicio", e.target.value)}
                  />
                </div>

                <div className="campo-container">
                  <label htmlFor={`exp-fim-${exp.id}`}>Fim</label>
                  <input
                    type="month"
                    id={`exp-fim-${exp.id}`}
                    value={exp.dataFim}
                    disabled={exp.atual}
                    onChange={(e) => atualizarExperiencia(exp.id, "dataFim", e.target.value)}
                  />
                </div>
              </div>

              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id={`exp-atual-${exp.id}`}
                  checked={exp.atual}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    atualizarExperiencia(exp.id, "atual", checked);
                    if (checked) {
                      atualizarExperiencia(exp.id, "dataFim", "");
                    }
                  }}
                />
                <label htmlFor={`exp-atual-${exp.id}`}>Atualmente trabalho neste cargo</label>
              </div>

              <div className="campo-container campo-descricao-larga">
                <label htmlFor={`exp-desc-${exp.id}`}>Descrição das atividades</label>
                <textarea
                  id={`exp-desc-${exp.id}`}
                  value={exp.descricao}
                  onChange={(e) => atualizarExperiencia(exp.id, "descricao", e.target.value)}
                  placeholder="Descreva suas responsabilidades, conquistas e tecnologias utilizadas..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}

        {experiencias.length === 0 && (
          <div className="estado-vazio-itens">Nenhuma experiência profissional adicionada.</div>
        )}

        <button type="button" className="botao-adicionar" onClick={adicionarExperiencia}>
          <Plus size={16} />
          <span>Adicionar Experiência</span>
        </button>
      </div>
    </div>
  );
}
