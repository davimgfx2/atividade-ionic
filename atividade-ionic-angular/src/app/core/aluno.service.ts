import { Injectable } from '@angular/core';
import { Aluno } from './models';

const STORAGE_KEY = 'ucsal.alunos';

/** Camada de dados mockada dos alunos, com persistência opcional em localStorage. */
@Injectable({ providedIn: 'root' })
export class AlunoService {
  private readonly alunos: Aluno[] = [
    {
      matricula: '20261001',
      nome: 'Maria Eduarda Santos Oliveira',
      curso: 'Engenharia de Software',
      email: 'maria.oliveira@email.com',
      telefone: '(71) 99999-1001',
      endereco: { cep: '41720-200', rua: 'Av. Prof. Pinto de Aguiar, 2589', bairro: 'Pituaçu', cidade: 'Salvador' },
    },
    {
      matricula: '20261002',
      nome: 'João Pedro Almeida Costa',
      curso: 'Engenharia de Software',
      email: 'joao.costa@email.com',
      telefone: '(71) 98888-2002',
      endereco: { cep: '40170-110', rua: 'Rua da Graça, 150', bairro: 'Graça', cidade: 'Salvador' },
    },
  ];

  constructor() {
    this.carregarPersistencia();
  }

  buscarPorMatricula(matricula: string): Aluno | undefined {
    const aluno = this.alunos.find((a) => a.matricula === matricula);
    return aluno ? this.clonar(aluno) : undefined;
  }

  /** Atualiza apenas os campos editáveis; matrícula, nome e curso são institucionais. */
  atualizarContato(matricula: string, dados: Pick<Aluno, 'email' | 'telefone' | 'endereco'>): Aluno | undefined {
    const aluno = this.alunos.find((a) => a.matricula === matricula);
    if (!aluno) {
      return undefined;
    }
    aluno.email = dados.email.trim();
    aluno.telefone = dados.telefone.trim();
    aluno.endereco = { ...dados.endereco };
    this.persistir();
    return this.clonar(aluno);
  }

  private clonar(aluno: Aluno): Aluno {
    return { ...aluno, endereco: { ...aluno.endereco } };
  }

  private persistir(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.alunos));
    } catch {
      // Armazenamento indisponível: mantém apenas em memória.
    }
  }

  private carregarPersistencia(): void {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY);
      if (!salvo) {
        return;
      }
      const lista = JSON.parse(salvo) as Aluno[];
      for (const item of lista) {
        const atual = this.alunos.find((a) => a.matricula === item.matricula);
        if (atual) {
          atual.email = item.email;
          atual.telefone = item.telefone;
          atual.endereco = item.endereco;
        }
      }
    } catch {
      // Dados corrompidos: ignora e usa o mock original.
    }
  }
}
