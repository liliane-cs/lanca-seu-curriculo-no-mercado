import React, { useRef, useState } from "react";
import { Curriculo } from "../../tipos/curriculo";
import SecaoDadosPessoais from "../SecaoDadosPessoais";
import SecaoPerfilProfissional from "../SecaoPerfilProfissional";
import SecaoExperiencias from "../SecaoExperiencias";
import SecaoFormacao from "../SecaoFormacao";
import SecaoHabilidades from "../SecaoHabilidades";
import { Upload, ChevronDown, User, FileText, Briefcase, GraduationCap, Award, Loader2 } from "lucide-react";
import { importarPDF } from "../../servicos/pdf";
import "./estilos.css";

interface EditorCurriculoProps {
  curriculo: Curriculo;
  onChange: (curriculo: Curriculo) => void;
  secaoAberta: string;
  onAlternarSecao: (secao: string) => void;
}

export default function EditorCurriculo({
  curriculo,
  onChange,
  secaoAberta,
  onAlternarSecao,
}: EditorCurriculoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importando, setImportando] = useState(false);

  const tratarUploadPDF = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;

    setImportando(true);
    try {
      // TODO: integrar parsing de PDF via n8n — recebe arquivo, retorna objeto curriculo preenchido
      const curriculoImportado = await importarPDF(arquivo);
      onChange(curriculoImportado);
    } catch (err) {
      console.error("Erro na importação simulada:", err);
    } finally {
      setImportando(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const dispararUpload = () => {
    fileInputRef.current?.click();
  };

  const secoes = [
    {
      chave: "dados",
      titulo: "Dados Pessoais",
      icone: <User size={18} className="icone-cor-secao" />,
      componente: (
        <SecaoDadosPessoais
          dados={curriculo.dadosPessoais}
          onChange={(novosDados) => onChange({ ...curriculo, dadosPessoais: novosDados })}
        />
      ),
    },
    {
      chave: "perfil",
      titulo: "Perfil Profissional",
      icone: <FileText size={18} className="icone-cor-secao" />,
      componente: (
        <SecaoPerfilProfissional
          perfil={curriculo.perfilProfissional}
          onChange={(novoPerfil) => onChange({ ...curriculo, perfilProfissional: novoPerfil })}
        />
      ),
    },
    {
      chave: "experiencias",
      titulo: "Experiências",
      icone: <Briefcase size={18} className="icone-cor-secao" />,
      componente: (
        <SecaoExperiencias
          experiencias={curriculo.experiencias}
          onChange={(novasExp) => onChange({ ...curriculo, experiencias: novasExp })}
        />
      ),
    },
    {
      chave: "formacao",
      titulo: "Formação",
      icone: <GraduationCap size={18} className="icone-cor-secao" />,
      componente: (
        <SecaoFormacao
          formacao={curriculo.formacao}
          onChange={(novaFormacao) => onChange({ ...curriculo, formacao: novaFormacao })}
        />
      ),
    },
    {
      chave: "habilidades",
      titulo: "Habilidades",
      icone: <Award size={18} className="icone-cor-secao" />,
      componente: (
        <SecaoHabilidades
          habilidades={curriculo.habilidades}
          onChange={(novasHabilidades) => onChange({ ...curriculo, habilidades: novasHabilidades })}
        />
      ),
    },
  ];

  return (
    <div className="editor-curriculo-container" id="editor-curriculo-painel">
      <div className="area-importacao" id="area-importacao-pdf">
        <input
          type="file"
          ref={fileInputRef}
          onChange={tratarUploadPDF}
          accept=".pdf"
          style={{ display: "none" }}
          id="input-arquivo-pdf"
        />
        <button
          type="button"
          onClick={dispararUpload}
          disabled={importando}
          className="botao-importar"
          id="btn-importar-pdf"
        >
          {importando ? (
            <>
              <Loader2 size={16} className="animacao-giro" />
              <span>Importando dados do PDF...</span>
            </>
          ) : (
            <>
              <Upload size={16} />
              <span>Importar PDF</span>
            </>
          )}
        </button>
      </div>

      <div className="acordeao-container" id="acordeao-editor">
        {secoes.map((secao) => {
          const aberta = secaoAberta === secao.chave;
          return (
            <div
              key={secao.chave}
              className={`acordeao-item ${aberta ? "ativo" : ""}`}
              id={`acordeao-item-${secao.chave}`}
            >
              <button
                type="button"
                className="acordeao-header"
                onClick={() => onAlternarSecao(secao.chave)}
                aria-expanded={aberta}
                aria-controls={`acordeao-conteudo-${secao.chave}`}
                id={`acordeao-btn-${secao.chave}`}
              >
                <div className="titulo-secao-combo">
                  {secao.icone}
                  <span className="titulo-secao-texto">{secao.titulo}</span>
                </div>
                <ChevronDown size={18} className={`chevron-seta-icon ${aberta ? "rotacionado" : ""}`} />
              </button>

              <div
                id={`acordeao-conteudo-${secao.chave}`}
                className={`acordeao-conteudo ${aberta ? "visivel" : "oculto"}`}
                role="region"
                aria-labelledby={`acordeao-btn-${secao.chave}`}
              >
                <div className="conteudo-interno">{secao.componente}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
