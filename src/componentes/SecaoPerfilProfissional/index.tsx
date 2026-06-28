import React from "react";
import "./estilos.css";

interface SecaoPerfilProfissionalProps {
  perfil: string;
  onChange: (perfil: string) => void;
}

export default function SecaoPerfilProfissional({ perfil, onChange }: SecaoPerfilProfissionalProps) {
  return (
    <div className="secao-perfil-profissional" id="secao-perfil-profissional-id">
      <div className="campo-container" id="container-perfil">
        <label htmlFor="input-perfil">Resumo Profissional</label>
        <textarea
          id="input-perfil"
          value={perfil || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escreva uma breve introdução sobre você, suas principais competências e objetivos de carreira..."
          rows={6}
        />
      </div>
    </div>
  );
}
