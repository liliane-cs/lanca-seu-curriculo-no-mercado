import React, { useState, useEffect } from "react";
import Cabecalho from "../../componentes/Cabecalho";
import EditorCurriculo from "../../componentes/EditorCurriculo";
import PreviaDocurriculo from "../../componentes/PreviaDocurriculo";
import PainelAdaptacao from "../../componentes/PainelAdaptacao";
import BotoesAcao from "../../componentes/BotoesAcao";
import SeletorMelhoria from "../../componentes/SeletorMelhoria";
import { Curriculo } from "../../tipos/curriculo";
import { melhorarSecao } from "../../servicos/ia";
import { exportarPDF } from "../../servicos/pdf";
import {
  Tema,
  obterTemaSalvo,
  salvarTema,
  aplicarTemaAoHTML,
} from "../../utilitarios/tema";
import {
  obterTamanhoFonteSalvo,
  salvarTamanhoFonte,
  aplicarTamanhoFonteAoHTML,
  TAMANHO_FONTE_MINIMO,
  TAMANHO_FONTE_MAXIMO,
  PASSO_FONTE,
} from "../../utilitarios/acessibilidade";
import "./estilos.css";

// Currículo de exemplo: só é aplicado quando o usuário clica em "Preencher Exemplo".
const CURRICULO_EXEMPLO: Curriculo = {
  dadosPessoais: {
    nome: "Guilherme Lança",
    tituloProfissional: "Desenvolvedor Front-end Sênior",
    email: "guilherme.lanca@exemplo.com",
    telefone: "(11) 98888-7777",
    linkedin: "linkedin.com/in/guilhermelanca",
    github: "github.com/guilhermelanca",
    localizacao: "Belo Horizonte, MG",
  },
  perfilProfissional:
    "Desenvolvedor Front-end experiente focado em criar interfaces acessíveis, limpas e de alta performance. Entusiasta de arquiteturas modernas de CSS e design inclusivo.",
  experiencias: [
    {
      id: "exp-1",
      empresa: "Tecnologia Avançada S.A.",
      cargo: "Desenvolvedor Front-end Sênior",
      dataInicio: "2023-01",
      dataFim: "",
      atual: true,
      descricao:
        "Liderança técnica no desenvolvimento do design system corporativo focado em acessibilidade WCAG. Redução de 30% no tempo de carregamento das principais rotas.",
    },
    {
      id: "exp-2",
      empresa: "Soluções Digitais Ltda.",
      cargo: "Desenvolvedor Front-end Pleno",
      dataInicio: "2021-03",
      dataFim: "2022-12",
      atual: false,
      descricao:
        "Implementação de novas funcionalidades para o e-commerce principal. Trabalho em conjunto com equipes de UX/UI para otimização de conversão e responsividade.",
    },
  ],
  formacao: [
    {
      id: "form-1",
      instituicao: "Universidade de Tecnologia de São Paulo",
      curso: "Análise e Desenvolvimento de Sistemas",
      grau: "Tecnólogo",
      dataInicio: "2018",
      dataFim: "2021",
      atual: false,
      descricao: "Foco em engenharia de software e desenvolvimento web.",
    },
  ],
  habilidades: [
    "React",
    "TypeScript",
    "Acessibilidade",
    "Semantic HTML",
    "Vite",
  ],
};

// Currículo vazio: é o estado inicial real do formulário e também o que o botão "Limpar Tudo" aplica.
const CURRICULO_VAZIO: Curriculo = {
  dadosPessoais: {
    nome: "",
    tituloProfissional: "",
    email: "",
    telefone: "",
    linkedin: "",
    github: "",
    localizacao: "",
  },
  perfilProfissional: "",
  experiencias: [],
  formacao: [],
  habilidades: [],
};

export default function Inicio() {
  const [curriculo, setCurriculo] = useState<Curriculo>(CURRICULO_VAZIO);
  const [secaoAberta, setSecaoAberta] = useState<string>("dados");
  const [painelAdaptacaoAtivo, setPainelAdaptacaoAtivo] =
    useState<boolean>(false);
  const [melhorando, setMelhorando] = useState<boolean>(false);
  const [seletorMelhoriaAberto, setSeletorMelhoriaAberto] =
    useState<boolean>(false);

  const [tema, setTema] = useState<Tema>("claro");
  const [tamanhoFonte, setTamanhoFonte] = useState<number>(16);

  useEffect(() => {
    const temaSalvo = obterTemaSalvo();
    const fonteSalva = obterTamanhoFonteSalvo();
    setTema(temaSalvo);
    setTamanhoFonte(fonteSalva);
    aplicarTemaAoHTML(temaSalvo);
    aplicarTamanhoFonteAoHTML(fonteSalva);
  }, []);

  const alternarTema = () => {
    const novoTema: Tema = tema === "claro" ? "escuro" : "claro";
    setTema(novoTema);
    salvarTema(novoTema);
    aplicarTemaAoHTML(novoTema);
  };

  const aumentarFonte = () => {
    if (tamanhoFonte < TAMANHO_FONTE_MAXIMO) {
      const nova = tamanhoFonte + PASSO_FONTE;
      setTamanhoFonte(nova);
      salvarTamanhoFonte(nova);
      aplicarTamanhoFonteAoHTML(nova);
    }
  };

  const diminuirFonte = () => {
    if (tamanhoFonte > TAMANHO_FONTE_MINIMO) {
      const nova = tamanhoFonte - PASSO_FONTE;
      setTamanhoFonte(nova);
      salvarTamanhoFonte(nova);
      aplicarTamanhoFonteAoHTML(nova);
    }
  };

  const alternarSecaoAcordeao = (secao: string) => {
    setSecaoAberta(secaoAberta === secao ? "" : secao);
  };

  const tratarMelhoriaIA = async (opcao: string, textoLivre?: string) => {
    setMelhorando(true);
    try {
      if (opcao === "perfil" || opcao === "inteiro") {
        // TODO: integrar n8n → Groq com a seção selecionada e retornar texto melhorado
        const novoPerfil = await melhorarSecao(
          "perfil",
          curriculo.perfilProfissional,
        );
        setCurriculo((prev) => ({
          ...prev,
          perfilProfissional: novoPerfil,
        }));
      }

      if (opcao === "habilidades" || opcao === "inteiro") {
        // TODO: integrar n8n → Groq com a seção selecionada e retornar texto melhorado
        const novasHabs = [...curriculo.habilidades];
        if (!novasHabs.includes("Clean Code")) novasHabs.push("Clean Code");
        setCurriculo((prev) => ({
          ...prev,
          habilidades: novasHabs,
        }));
      }

      if (opcao === "experiencias" || opcao === "inteiro") {
        // TODO: integrar n8n → Groq com a seção selecionada e retornar texto melhorado
        const expOtimizadas = await Promise.all(
          curriculo.experiencias.map(async (exp) => ({
            ...exp,
            descricao: await melhorarSecao("experiencia", exp.descricao),
          })),
        );
        setCurriculo((prev) => ({
          ...prev,
          experiencias: expOtimizadas,
        }));
      }

      if (opcao === "outro" && textoLivre) {
        // TODO: integrar n8n → Groq com a seção selecionada e retornar texto melhorado
        const novoPerfil = await melhorarSecao(
          "personalizado",
          curriculo.perfilProfissional +
            `\n\n(Melhorado com foco em: ${textoLivre})`,
        );
        setCurriculo((prev) => ({
          ...prev,
          perfilProfissional: novoPerfil,
        }));
      }

      setSeletorMelhoriaAberto(false);
    } catch (err) {
      console.error(err);
    } finally {
      setMelhorando(false);
    }
  };

  const tratarExportarPDF = async () => {
    // TODO: integrar geração e download de PDF via n8n
    await exportarPDF(curriculo);
  };

  const aplicarMelhoriasAdaptadas = (curriculoAdaptado: Curriculo) => {
    setCurriculo(curriculoAdaptado);
    setPainelAdaptacaoAtivo(false);
  };

  const preencherComExemplo = () => {
    setCurriculo(CURRICULO_EXEMPLO);
  };

  const limparFormulario = () => {
    setCurriculo(CURRICULO_VAZIO);
  };

  return (
    <div className="layout" id="lanca-main-layout">
      {/* Cabeçalho */}
      <Cabecalho
        tema={tema}
        onAlternarTema={alternarTema}
        onAumentarFonte={aumentarFonte}
        onDiminuirFonte={diminuirFonte}
        tamanhoFonte={tamanhoFonte}
      />

      {/* Grid Principal */}
      <main className="area-principal" id="lanca-workspace-grid">
        {/* Coluna Esquerda - Editor de Currículo (rola independente) */}
        <section className="coluna-editor" id="coluna-editor-secao">
          <EditorCurriculo
            curriculo={curriculo}
            onChange={setCurriculo}
            secaoAberta={secaoAberta}
            onAlternarSecao={alternarSecaoAcordeao}
            onLimpar={limparFormulario}
            onPreencherExemplo={preencherComExemplo}
          />
        </section>

        {/* Coluna Direita - Prévia ou Painel de Adaptação (rola independente) */}
        <section className="coluna-previa" id="coluna-previa-secao">
          {/* Botões de Ação fixos acima da área de rolagem (nunca sobrepõem) */}
          <BotoesAcao
            onAbrirMelhoria={() => setSeletorMelhoriaAberto(true)}
            onAtivarAdaptacao={() =>
              setPainelAdaptacaoAtivo(!painelAdaptacaoAtivo)
            }
            onExportarPDF={tratarExportarPDF}
            adaptacaoAtiva={painelAdaptacaoAtivo}
          />

          {/* Conteúdo dinâmico */}
          <div className="painel-dinamico-direita">
            {painelAdaptacaoAtivo && (
              <PainelAdaptacao
                curriculo={curriculo}
                onFechar={() => setPainelAdaptacaoAtivo(false)}
                onAplicarMelhorias={aplicarMelhoriasAdaptadas}
              />
            )}
            <div style={{ display: painelAdaptacaoAtivo ? "none" : "block" }}>
              <PreviaDocurriculo curriculo={curriculo} />
            </div>
          </div>
        </section>
      </main>

      {/* Modal Seletor de Melhoria */}
      {seletorMelhoriaAberto && (
        <SeletorMelhoria
          onMelhorar={tratarMelhoriaIA}
          onFechar={() => setSeletorMelhoriaAberto(false)}
          melhorando={melhorando}
        />
      )}
    </div>
  );
}
