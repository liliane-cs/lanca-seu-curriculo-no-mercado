import React, { useState } from "react";
import { X, Sparkles, Check, Loader2 } from "lucide-react";
import { Curriculo } from "../../tipos/curriculo";
import { analisarCompatibilidade, aplicarSugestoes } from "../../servicos/ia";
import "./estilos.css";

interface PainelAdaptacaoProps {
  curriculo: Curriculo;
  onFechar: () => void;
  onAplicarMelhorias: (curriculoAdaptado: Curriculo) => void;
}

export default function PainelAdaptacao({
  curriculo,
  onFechar,
  onAplicarMelhorias,
}: PainelAdaptacaoProps) {
  const [descricaoVaga, setDescricaoVaga] = useState("");
  const [analisando, setAnalisando] = useState(false);
  const [resultado, setResultado] = useState<{
    percentual: number;
    compativel: string[];
    incompativel: string[];
    pontosFortes: string[];
    pontosFracos: string[];
    sugestoes: string[];
  } | null>(null);

  // Armazena as sugestões selecionadas pelo usuário (Fase 2)
  const [sugestoesSelecionadas, setSugestoesSelecionadas] = useState<string[]>([]);

  const tratarAnalise = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricaoVaga.trim()) return;

    setAnalisando(true);
    setResultado(null);
    setSugestoesSelecionadas([]);

    try {
      // TODO: integrar n8n → Groq com currículo + descrição da vaga
      const analise = await analisarCompatibilidade(curriculo, descricaoVaga);
      setResultado(analise);
      // Por padrão, começa com todas as sugestões marcadas
      setSugestoesSelecionadas(analise.sugestoes);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalisando(false);
    }
  };

  const alternarSugestao = (sugestao: string) => {
    if (sugestoesSelecionadas.includes(sugestao)) {
      setSugestoesSelecionadas(sugestoesSelecionadas.filter((s) => s !== sugestao));
    } else {
      setSugestoesSelecionadas([...sugestoesSelecionadas, sugestao]);
    }
  };

  const tratarAplicarSelecionadas = async () => {
    if (!resultado) return;
    try {
      // TODO: aplicar as sugestões marcadas nos campos correspondentes do currículo
      const novoCurriculo = await aplicarSugestoes(curriculo, sugestoesSelecionadas);
      onAplicarMelhorias(novoCurriculo);
      alert("As sugestões selecionadas foram aplicadas com sucesso!");
    } catch (err) {
      console.error("Erro ao aplicar sugestões:", err);
    }
  };

  const preencherExemploVaga = () => {
    setDescricaoVaga(
      "Procuramos Desenvolvedor Front-end Sênior com sólida experiência em React, TypeScript e padrões de Acessibilidade WCAG. Valorizamos conhecimentos em empacotadores modernos como Vite e Esbuild, além de foco em Clean Code."
    );
  };

  return (
    <div className="painel-adaptacao-container" id="painel-adaptacao-id">
      <header className="painel-adaptacao-header">
        <div className="titulo-secao-ia">
          <Sparkles size={18} className="icone-ia" />
          <h3>Adaptar para uma Vaga</h3>
        </div>
        <button
          type="button"
          className="botao-fechar-painel"
          onClick={onFechar}
          title="Fechar"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>
      </header>

      <div className="painel-adaptacao-conteudo">
        {/* FASE 1: Entrada */}
        {!resultado && !analisando && (
          <form onSubmit={tratarAnalise} className="form-adaptacao" id="form-analisar-vaga">
            <div className="campo-container">
              <div className="label-com-exemplo">
                <label htmlFor="descricao-vaga">Cole aqui a descrição da vaga</label>
                <button
                  type="button"
                  className="botao-exemplo-vaga"
                  onClick={preencherExemploVaga}
                >
                  Usar Exemplo
                </button>
              </div>
              <textarea
                id="descricao-vaga"
                value={descricaoVaga}
                onChange={(e) => setDescricaoVaga(e.target.value)}
                placeholder="Ex: Requisitos: React, TypeScript, Acessibilidade WCAG, otimização de performance front-end..."
                rows={10}
                required
              />
            </div>

            <button
              type="submit"
              className="botao-analisar-submeter"
              disabled={!descricaoVaga.trim()}
            >
              Analisar
            </button>
          </form>
        )}

        {/* LOADING STATE */}
        {analisando && (
          <div className="estado-analisando">
            <Loader2 size={32} className="animacao-giro icone-loading-ia" />
            <p className="texto-carregando-ia">Analisando requisitos da vaga...</p>
            <p className="subtexto-carregando-ia">Mapeando compatibilidades e gerando recomendações inteligentes.</p>
          </div>
        )}

        {/* FASE 2: Resultado */}
        {resultado && !analisando && (
          <div className="resultado-analise-container" id="resultado-analise-id">
            <div className="card-compatibilidade">
              <div className="compatibilidade-circulo-container">
                <span className="percentual-grande">{resultado.percentual}%</span>
                <span className="percentual-legenda">Compatibilidade</span>
              </div>
              <div className="barra-progresso-total">
                <div
                  className="barra-progresso-ativa"
                  style={{ width: `${resultado.percentual}%` }}
                ></div>
              </div>
            </div>

            <div className="secao-resultado-lista">
              <h4 className="titulo-resultado-grupo">Pontos fortes</h4>
              <ul className="lista-pontos-fortes">
                {resultado.pontosFortes.map((ponto, i) => (
                  <li key={i} className="item-ponto-forte">
                    <span className="marcador-v-ponto">✓</span>
                    <span>{ponto}</span>
                  </li>
                ))}
              </ul>
            </div>

            {resultado.pontosFracos.length > 0 && (
              <div className="secao-resultado-lista">
                <h4 className="titulo-resultado-grupo">Pontos a melhorar</h4>
                <ul className="lista-pontos-fortes">
                  {resultado.pontosFracos.map((ponto, i) => (
                    <li key={i} className="item-ponto-forte">
                      <span className="marcador-v-ponto">!</span>
                      <span>{ponto}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="secao-resultado-lista">
              <h4 className="titulo-resultado-grupo">Sugestões de melhoria</h4>
              <div className="lista-sugestoes-checkboxes">
                {resultado.sugestoes.map((sugestao, i) => {
                  const marcada = sugestoesSelecionadas.includes(sugestao);
                  return (
                    <label key={i} className={`sugestao-checkbox-card ${marcada ? "marcada" : ""}`}>
                      <input
                        type="checkbox"
                        checked={marcada}
                        onChange={() => alternarSugestao(sugestao)}
                        className="checkbox-sugestao-input"
                      />
                      <div className="checkbox-sugestao-box">
                        {marcada && <Check size={12} strokeWidth={3} className="check-icon" />}
                      </div>
                      <span className="sugestao-texto">{sugestao}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="botoes-acoes-resultado">
              <button
                type="button"
                className="botao-acao-resultado botao-aplicar-selecionadas"
                onClick={tratarAplicarSelecionadas}
                disabled={sugestoesSelecionadas.length === 0}
              >
                Aplicar Selecionadas
              </button>
            </div>

            <button
              type="button"
              className="botao-nova-analise"
              onClick={() => {
                setResultado(null);
                setDescricaoVaga("");
              }}
            >
              Analisar Outra Vaga
            </button>
          </div>
        )}
      </div>
    </div>
  );
}