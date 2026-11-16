import { Injectable } from '@angular/core';
import { CategoriaPublicacao, Publicacao } from './models';

/** Camada de dados mockada do mural de notícias e eventos. */
@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private readonly publicacoes: Publicacao[] = [
    {
      id: 1,
      titulo: 'Rematrícula 2027.1 abre em 01/12',
      data: '2026-11-10',
      categoria: 'Notícia',
      imagem: 'https://picsum.photos/id/0/800/400',
      resumo: 'Confira o calendário e os documentos necessários para renovar sua matrícula.',
      conteudo:
        'O período de rematrícula para o semestre 2027.1 começa em 1º de dezembro e vai até 20 de dezembro. Para concluir o processo, o aluno deve estar em dia com as mensalidades, atualizar o cadastro no portal e confirmar as disciplinas pretendidas. Em caso de dúvidas, procure a Secretaria Acadêmica.',
    },
    {
      id: 2,
      titulo: 'Edital de Iniciação Científica 2026/2027',
      data: '2026-11-05',
      categoria: 'Notícia',
      imagem: 'https://picsum.photos/id/20/800/400',
      resumo: 'Inscrições abertas para bolsas e vagas voluntárias de pesquisa.',
      conteudo:
        'Estão abertas as inscrições para o programa de Iniciação Científica. Podem participar alunos regularmente matriculados a partir do 3º semestre. As propostas devem ser submetidas com um orientador vinculado à UCSal. O resultado será divulgado no portal institucional.',
    },
    {
      id: 3,
      titulo: 'UCSal na Semoc 2026',
      data: '2026-11-18',
      categoria: 'Evento',
      imagem: 'https://picsum.photos/id/48/800/400',
      resumo: 'Participe da Semana de Mobilização Científica com palestras e minicursos.',
      conteudo:
        'A UCSal participa da Semana de Mobilização Científica (Semoc) com apresentação de trabalhos, minicursos e palestras abertas à comunidade. Alunos que apresentarem pesquisa recebem certificado de horas complementares.',
    },
    {
      id: 4,
      titulo: 'Maratona de Programação UCSal',
      data: '2026-11-25',
      categoria: 'Evento',
      imagem: 'https://picsum.photos/id/180/800/400',
      resumo: 'Monte seu time de 3 pessoas e dispute a classificação regional.',
      conteudo:
        'A maratona de programação acontece no laboratório de informática do campus Pituaçu. As equipes terão cinco horas para resolver problemas de algoritmos. Os melhores colocados representam a universidade na etapa regional.',
    },
    {
      id: 5,
      titulo: 'Projeto de Extensão: Tecnologia na Comunidade',
      data: '2026-12-02',
      categoria: 'Evento',
      imagem: 'https://picsum.photos/id/1/800/400',
      resumo: 'Alunos de Engenharia de Software levam oficinas digitais a escolas públicas.',
      conteudo:
        'O projeto de extensão reúne estudantes e professores para ministrar oficinas de lógica de programação e segurança digital em escolas públicas de Salvador. As horas contam como atividade extensionista.',
    },
  ];

  listar(categoria?: CategoriaPublicacao | null): Publicacao[] {
    const lista = categoria ? this.publicacoes.filter((p) => p.categoria === categoria) : this.publicacoes;
    return [...lista].sort((a, b) => b.data.localeCompare(a.data));
  }

  buscarPorId(id: number): Publicacao | undefined {
    return this.publicacoes.find((p) => p.id === id);
  }
}
