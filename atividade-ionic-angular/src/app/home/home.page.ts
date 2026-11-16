import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { CategoriaPublicacao, Publicacao } from '../core/models';
import { NoticiasService } from '../core/noticias.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  categoria: CategoriaPublicacao | '' = '';

  constructor(
    private readonly noticias: NoticiasService,
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  get publicacoes(): Publicacao[] {
    return this.noticias.listar(this.categoria || null);
  }

  get nomeAluno(): string {
    return this.auth.alunoLogado?.nome.split(' ')[0] ?? '';
  }

  sair(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
