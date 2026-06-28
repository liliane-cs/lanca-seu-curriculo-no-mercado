import React from "react";
import { Curriculo } from "../../tipos/curriculo";
import { Mail, Phone, MapPin, Linkedin, Github, Calendar, Briefcase } from "lucide-react";
import "./estilos.css";

interface PreviaDocurriculoProps {
  curriculo: Curriculo;
}

export default function PreviaDocurriculo({ curriculo }: PreviaDocurriculoProps) {
  const { dadosPessoais, perfilProfissional, experiencias, formacao, habilidades } = curriculo;

  const temDadosContato =
    dadosPessoais.email ||
    dadosPessoais.telefone ||
    dadosPessoais.localizacao ||
    dadosPessoais.linkedin ||
    dadosPessoais.github;

  return (
    <div className="previa-curriculo-folha" id="previa-curriculo-folha-id">
      {/* Cabeçalho do Currículo */}
      <header className="curriculo-topo" id="curriculo-topo-id">
        <h2 className="curriculo-nome" id="curriculo-nome-id">
          {dadosPessoais.nome || <span className="placeholder-text">Seu Nome Completo</span>}
        </h2>
        
        {dadosPessoais.tituloProfissional && (
          <h3 className="curriculo-titulo-cargo" id="curriculo-titulo-cargo-id">
            {dadosPessoais.tituloProfissional}
          </h3>
        )}

        {temDadosContato && (
          <div className="curriculo-contatos" id="curriculo-contatos-id">
            {dadosPessoais.email && (
              <span className="contato-item">
                <Mail size={12} />
                <span>{dadosPessoais.email}</span>
              </span>
            )}
            {dadosPessoais.telefone && (
              <span className="contato-item">
                <Phone size={12} />
                <span>{dadosPessoais.telefone}</span>
              </span>
            )}
            {dadosPessoais.localizacao && (
              <span className="contato-item">
                <MapPin size={12} />
                <span>{dadosPessoais.localizacao}</span>
              </span>
            )}
            {dadosPessoais.linkedin && (
              <span className="contato-item">
                <Linkedin size={12} />
                <span>{dadosPessoais.linkedin}</span>
              </span>
            )}
            {dadosPessoais.github && (
              <span className="contato-item">
                <Github size={12} />
                <span>{dadosPessoais.github}</span>
              </span>
            )}
          </div>
        )}
      </header>

      {/* Divisor */}
      <div className="curriculo-divisor-geral"></div>

      {/* Perfil Profissional */}
      {perfilProfissional && (
        <section className="curriculo-secao" id="curriculo-secao-perfil">
          <h3 className="titulo-secao-previa">Perfil Profissional</h3>
          <p className="conteudo-perfil">{perfilProfissional}</p>
        </section>
      )}

      {/* Experiências Profissionais */}
      {experiencias.length > 0 && (
        <section className="curriculo-secao" id="curriculo-secao-experiencias">
          <h3 className="titulo-secao-previa">Experiências</h3>
          <div className="previa-lista-itens">
            {experiencias.map((exp) => (
              <div key={exp.id} className="previa-item">
                <div className="previa-item-header">
                  <div>
                    <h4 className="previa-item-cargo">{exp.cargo || <span className="placeholder-text">Cargo</span>}</h4>
                    <span className="previa-item-empresa">{exp.empresa || <span className="placeholder-text">Empresa</span>}</span>
                  </div>
                  <div className="previa-item-periodo">
                    <Calendar size={12} />
                    <span>
                      {exp.dataInicio ? formatarMes(exp.dataInicio) : "Início"} —{" "}
                      {exp.atual ? "Atual" : exp.dataFim ? formatarMes(exp.dataFim) : "Fim"}
                    </span>
                  </div>
                </div>
                {exp.descricao && <p className="previa-item-descricao">{exp.descricao}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Formação Acadêmica */}
      {formacao.length > 0 && (
        <section className="curriculo-secao" id="curriculo-secao-formacao">
          <h3 className="titulo-secao-previa">Formação</h3>
          <div className="previa-lista-itens">
            {formacao.map((form) => (
              <div key={form.id} className="previa-item">
                <div className="previa-item-header">
                  <div>
                    <h4 className="previa-item-curso">
                      {form.curso || <span className="placeholder-text">Curso</span>} {form.grau && `— ${form.grau}`}
                    </h4>
                    <span className="previa-item-instituicao">{form.instituicao || <span className="placeholder-text">Instituição</span>}</span>
                  </div>
                  <div className="previa-item-periodo">
                    <Calendar size={12} />
                    <span>
                      {form.dataInicio || "Início"} — {form.atual ? "Cursando" : form.dataFim || "Fim"}
                    </span>
                  </div>
                </div>
                {form.descricao && <p className="previa-item-descricao">{form.descricao}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Habilidades */}
      {habilidades.length > 0 && (
        <section className="curriculo-secao" id="curriculo-secao-habilidades">
          <h3 className="titulo-secao-previa">Habilidades</h3>
          <div className="previa-habilidades-grid">
            {habilidades.map((hab) => (
              <span key={hab} className="previa-habilidade-tag">
                {hab}
              </span>
            ))}
          </div>
        </section>
      )}

      {!dadosPessoais.nome &&
        !perfilProfissional &&
        experiencias.length === 0 &&
        formacao.length === 0 &&
        habilidades.length === 0 && (
          <div className="previa-vazia">
            <Briefcase size={40} className="icone-previa-vazia" />
            <p>Os dados preenchidos no editor aparecerão aqui em tempo real.</p>
            <p className="dica-previa-vazia">Comece a digitar na coluna esquerda ou clique em "Importar PDF" para testar.</p>
          </div>
        )}
    </div>
  );
}

// Auxiliar para formatar campos do tipo mês (YYYY-MM) para português
function formatarMes(valorData: string): string {
  if (!valorData) return "";
  const partes = valorData.split("-");
  if (partes.length !== 2) return valorData;

  const meses = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];
  const mesIndex = parseInt(partes[1], 10) - 1;
  if (mesIndex >= 0 && mesIndex < 12) {
    return `${meses[mesIndex]} de ${partes[0]}`;
  }
  return valorData;
}
