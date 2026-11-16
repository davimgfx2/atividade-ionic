import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular/lazy';
import { FinanceiroService } from '../core/financeiro.service';
import { Mensalidade } from '../core/models';

@Component({
  selector: 'app-financeiro',
  templateUrl: 'financeiro.page.html',
  styleUrls: ['financeiro.page.scss'],
  standalone: false,
})
export class FinanceiroPage {
  readonly semestres: string[];
  semestre: string;

  constructor(
    private readonly financeiro: FinanceiroService,
    private readonly toast: ToastController,
  ) {
    this.semestres = financeiro.listarSemestres();
    this.semestre = financeiro.semestreAtual();
  }

  get mensalidades(): Mensalidade[] {
    return this.financeiro.listarPorSemestre(this.semestre);
  }

  async copiarCodigo(m: Mensalidade): Promise<void> {
    const copiado = await this.copiar(m.codigoBarras);
    const t = await this.toast.create({
      message: copiado ? 'Código de barras copiado!' : 'Não foi possível copiar o código.',
      duration: 2000,
      color: copiado ? 'success' : 'danger',
      position: 'top',
    });
    await t.present();
  }

  private async copiar(texto: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(texto);
      return true;
    } catch {
      return false;
    }
  }
}
