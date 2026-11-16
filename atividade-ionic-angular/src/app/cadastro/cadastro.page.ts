import { Component } from '@angular/core';
import { ToastController, ViewWillEnter } from '@ionic/angular/lazy';
import { AlunoService } from '../core/aluno.service';
import { AuthService } from '../core/auth.service';
import { Aluno } from '../core/models';

@Component({
  selector: 'app-cadastro',
  templateUrl: 'cadastro.page.html',
  standalone: false,
})
export class CadastroPage implements ViewWillEnter {
  aluno?: Aluno;

  constructor(
    private readonly auth: AuthService,
    private readonly alunos: AlunoService,
    private readonly toast: ToastController,
  ) {
    this.aluno = this.auth.alunoLogado;
  }

  ionViewWillEnter(): void {
    this.aluno = this.auth.alunoLogado;
  }

  async salvar(): Promise<void> {
    if (!this.aluno) {
      return;
    }
    const { matricula, email, telefone, endereco } = this.aluno;
    const atualizado = this.alunos.atualizarContato(matricula, { email, telefone, endereco });
    const t = await this.toast.create({
      message: atualizado ? 'Cadastro atualizado com sucesso!' : 'Não foi possível salvar o cadastro.',
      duration: 2500,
      color: atualizado ? 'success' : 'danger',
      position: 'top',
    });
    await t.present();
  }
}
