import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: false,
})
export class LoginPage {
  matricula = '';
  senha = '';
  erro = '';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  get demo() {
    return this.auth.contaDemo;
  }

  entrarComDemo(): void {
    this.matricula = this.demo.matricula;
    this.senha = this.demo.senha;
    this.entrar();
  }

  entrar(): void {
    if (!this.matricula.trim() || !this.senha) {
      this.erro = 'Informe a matrícula e a senha.';
      return;
    }
    if (!this.auth.login(this.matricula, this.senha)) {
      this.erro = 'Matrícula ou senha inválida.';
      return;
    }
    this.erro = '';
    this.senha = '';
    this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
  }
}
