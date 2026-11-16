export interface Endereco {
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
}

export interface Aluno {
  matricula: string;
  nome: string;
  curso: string;
  email: string;
  telefone: string;
  endereco: Endereco;
}

export type CategoriaPublicacao = 'Notícia' | 'Evento';

export interface Publicacao {
  id: number;
  titulo: string;
  data: string;
  categoria: CategoriaPublicacao;
  imagem: string;
  resumo: string;
  conteudo: string;
}

export type StatusMensalidade = 'Paga' | 'A Pagar';

export interface Mensalidade {
  id: string;
  mes: string;
  vencimento: string;
  valor: number;
  status: StatusMensalidade;
  codigoBarras: string;
}
