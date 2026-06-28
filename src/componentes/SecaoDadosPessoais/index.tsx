import React from "react";
import { DadosPessoais } from "../../tipos/curriculo";
import "./estilos.css";

interface SecaoDadosPessoaisProps {
  dados: DadosPessoais;
  onChange: (dados: DadosPessoais) => void;
}

export default function SecaoDadosPessoais({ dados, onChange }: SecaoDadosPessoaisProps) {
  const handleChange = (campo: keyof DadosPessoais, valor: string) => {
    onChange({
      ...dados,
      [campo]: valor,
    });
  };

  return (
    <div className="secao-dados-pessoais" id="secao-dados-pessoais-id">
      <div className="grupo-campos" id="campos-dados-pessoais">
        <div className="campo-container" id="container-nome">
          <label htmlFor="input-nome">Nome Completo</label>
          <input
            type="text"
            id="input-nome"
            value={dados.nome || ""}
            onChange={(e) => handleChange("nome", e.target.value)}
            placeholder="Ex: Guilherme Lança"
          />
        </div>

        <div className="campo-container" id="container-titulo-profissional">
          <label htmlFor="input-titulo-profissional">Cargo / Título profissional</label>
          <input
            type="text"
            id="input-titulo-profissional"
            value={dados.tituloProfissional || ""}
            onChange={(e) => handleChange("tituloProfissional", e.target.value)}
            placeholder="Ex: Desenvolvedor Front-end Sênior"
          />
        </div>

        <div className="campo-container" id="container-email">
          <label htmlFor="input-email">E-mail</label>
          <input
            type="email"
            id="input-email"
            value={dados.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Ex: seu.email@exemplo.com"
          />
        </div>

        <div className="campo-container" id="container-telefone">
          <label htmlFor="input-telefone">Telefone</label>
          <input
            type="text"
            id="input-telefone"
            value={dados.telefone || ""}
            onChange={(e) => handleChange("telefone", e.target.value)}
            placeholder="Ex: (11) 99999-9999"
          />
        </div>

        <div className="campo-container" id="container-localizacao">
          <label htmlFor="input-localizacao">Localidade (cidade, estado)</label>
          <input
            type="text"
            id="input-localizacao"
            value={dados.localizacao || ""}
            onChange={(e) => handleChange("localizacao", e.target.value)}
            placeholder="Ex: São Paulo, SP"
          />
        </div>

        <div className="campo-container" id="container-linkedin">
          <label htmlFor="input-linkedin">LinkedIn</label>
          <input
            type="text"
            id="input-linkedin"
            value={dados.linkedin || ""}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            placeholder="Ex: linkedin.com/in/usuario"
          />
        </div>

        <div className="campo-container" id="container-github">
          <label htmlFor="input-github">GitHub / Portfólio (opcional)</label>
          <input
            type="text"
            id="input-github"
            value={dados.github || ""}
            onChange={(e) => handleChange("github", e.target.value)}
            placeholder="Ex: github.com/usuario"
          />
        </div>
      </div>
    </div>
  );
}
