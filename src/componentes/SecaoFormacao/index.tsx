import React from "react";
import { Formacao } from "../../tipos/curriculo";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import "./estilos.css";

interface SecaoFormacaoProps {
  formacao: Formacao[];
  onChange: (formacao: Formacao[]) => void;
}

export default function SecaoFormacao({ formacao, onChange }: SecaoFormacaoProps) {
  const adicionarFormacao = () => {
    const nova: Formacao = {
      id: Math.random().toString(36).substr(2, 9),
      instituicao: "",
      curso: "",
      grau: "",
      dataInicio: "",
      dataFim: "",
      atual: false,
      descricao: "",
    };
    onChange([...formacao, nova]);
  };

  const removerFormacao = (id: string) => {
    onChange(formacao.filter((form) => form.id !== id));
  };

  const atualizarFormacao = (id: string, campo: keyof Formacao, valor: any) => {
    onChange(
      formacao.map((form) => {
        if (form.id === id) {
          return { ...form, [campo]: valor };
        }
        return form;
      })
    );
  };

  return (
    <div className="secao-formacao" id="secao-formacao-id">
      <div className="lista-itens" id="lista-formacoes">
        {formacao.map((form, index) => (
          <div key={form.id} className="item-formacao" id={`item-form-${form.id}`}>
            <div className="header-item">
              <span className="numero-item">
                <GraduationCap size={14} /> Formação #{index + 1}
              </span>
              <button
                type="button"
                className="botao-remover"
                onClick={() => removerFormacao(form.id)}
                title="Remover esta formação"
                aria-label="Remover esta formação"
              >
                <Trash2 size={14} />
                <span>Excluir</span>
              </button>
            </div>

            <div className="grupo-campos-form">
              <div className="campo-container">
                <label htmlFor={`form-curso-${form.id}`}>Curso</label>
                <input
                  type="text"
                  id={`form-curso-${form.id}`}
                  value={form.curso}
                  onChange={(e) => atualizarFormacao(form.id, "curso", e.target.value)}
                  placeholder="Ex: Engenharia de Software"
                />
              </div>

              <div className="campo-container">
                <label htmlFor={`form-instituicao-${form.id}`}>Instituição</label>
                <input
                  type="text"
                  id={`form-instituicao-${form.id}`}
                  value={form.instituicao}
                  onChange={(e) => atualizarFormacao(form.id, "instituicao", e.target.value)}
                  placeholder="Ex: USP, Unicamp, etc."
                />
              </div>

              <div className="campo-container">
                <label htmlFor={`form-grau-${form.id}`}>Grau / Nível</label>
                <input
                  type="text"
                  id={`form-grau-${form.id}`}
                  value={form.grau}
                  onChange={(e) => atualizarFormacao(form.id, "grau", e.target.value)}
                  placeholder="Ex: Graduação, Tecnólogo, Pós-graduação"
                />
              </div>

              <div className="campo-datas">
                <div className="campo-container">
                  <label htmlFor={`form-inicio-${form.id}`}>Início (Ano)</label>
                  <input
                    type="text"
                    id={`form-inicio-${form.id}`}
                    value={form.dataInicio}
                    onChange={(e) => atualizarFormacao(form.id, "dataInicio", e.target.value)}
                    placeholder="Ex: 2018"
                  />
                </div>

                <div className="campo-container">
                  <label htmlFor={`form-fim-${form.id}`}>Fim / Previsão</label>
                  <input
                    type="text"
                    id={`form-fim-${form.id}`}
                    value={form.dataFim}
                    disabled={form.atual}
                    onChange={(e) => atualizarFormacao(form.id, "dataFim", e.target.value)}
                    placeholder="Ex: 2022 ou cursando"
                  />
                </div>
              </div>

              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id={`form-atual-${form.id}`}
                  checked={form.atual}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    atualizarFormacao(form.id, "atual", checked);
                    if (checked) {
                      atualizarFormacao(form.id, "dataFim", "");
                    }
                  }}
                />
                <label htmlFor={`form-atual-${form.id}`}>Atualmente estou cursando</label>
              </div>

              <div className="campo-container campo-descricao-larga">
                <label htmlFor={`form-desc-${form.id}`}>Descrição adicional</label>
                <textarea
                  id={`form-desc-${form.id}`}
                  value={form.descricao}
                  onChange={(e) => atualizarFormacao(form.id, "descricao", e.target.value)}
                  placeholder="Atividades extracurriculares, projetos relevantes, etc..."
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}

        {formacao.length === 0 && (
          <div className="estado-vazio-itens">Nenhuma formação acadêmica adicionada.</div>
        )}

        <button type="button" className="botao-adicionar" onClick={adicionarFormacao}>
          <Plus size={16} />
          <span>Adicionar Formação</span>
        </button>
      </div>
    </div>
  );
}
