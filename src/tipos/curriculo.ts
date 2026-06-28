export interface DadosPessoais {
  nome: string;
  tituloProfissional: string;
  email: string;
  telefone: string;
  linkedin: string;
  github: string;
  localizacao: string;
}

export interface Experiencia {
  id: string;
  empresa: string;
  cargo: string;
  dataInicio: string;
  dataFim: string;
  atual: boolean;
  descricao: string;
}

export interface Formacao {
  id: string;
  instituicao: string;
  curso: string;
  grau: string;
  dataInicio: string;
  dataFim: string;
  atual: boolean;
  descricao: string;
}

export interface Curriculo {
  dadosPessoais: DadosPessoais;
  perfilProfissional: string;
  experiencias: Experiencia[];
  formacao: Formacao[];
  habilidades: string[];
}
