import { Injectable } from '@angular/core';
import { AlunoService } from './aluno.service';
import { Aluno } from './models';

interface Credencial {
  matricula: string;
  senha: string;
}

const SESSION_KEY = 'ucsal.sessao';

/** Autenticação mockada. O aluno logado fica em memória (e na sessionStorage para sobreviver ao F5). */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly credenciais: Credencial[] = [
    { matricula: '20261001', senha: '123456' },
    { matricula: '20261002', senha: 'abc123' },
  ];

  /** Conta de demonstração exibida na tela de login. */
  readonly contaDemo: Credencial = this.credenciais[0];

  private matriculaLogada: string | null = null;

  constructor(private readonly alunos: AlunoService) {
    try {
      this.matriculaLogada = sessionStorage.getItem(SESSION_KEY);
    } catch {
      this.matriculaLogada = null;
    }
  }

  login(matricula: string, senha: string): boolean {
    const ok = this.credenciais.some((c) => c.matricula === matricula.trim() && c.senha === senha);
    if (!ok) {
      return false;
    }
    this.matriculaLogada = matricula.trim();
    try {
      sessionStorage.setItem(SESSION_KEY, this.matriculaLogada);
    } catch {
      // Sem sessionStorage: mantém só em memória.
    }
    return true;
  }

  logout(): void {
    this.matriculaLogada = null;
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignorado.
    }
  }

  get autenticado(): boolean {
    return this.alunoLogado !== undefined;
  }

  /** Cópia atual do aluno logado (reflete atualizações cadastrais). */
  get alunoLogado(): Aluno | undefined {
    return this.matriculaLogada ? this.alunos.buscarPorMatricula(this.matriculaLogada) : undefined;
  }
}
