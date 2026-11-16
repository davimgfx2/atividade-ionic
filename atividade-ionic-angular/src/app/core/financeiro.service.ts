import { Injectable } from '@angular/core';
import { Mensalidade, StatusMensalidade } from './models';

type Parcela = [mes: string, vencimento: string, status: StatusMensalidade];

/** Camada de dados mockada das mensalidades, organizada por semestre letivo. */
@Injectable({ providedIn: 'root' })
export class FinanceiroService {
  private readonly dados: Record<string, Mensalidade[]> = {
    '2025.2': this.montar('2025.2', 1250, [
      ['Julho', '2025-07-10', 'Paga'],
      ['Agosto', '2025-08-10', 'Paga'],
      ['Setembro', '2025-09-10', 'Paga'],
      ['Outubro', '2025-10-10', 'Paga'],
      ['Novembro', '2025-11-10', 'Paga'],
      ['Dezembro', '2025-12-10', 'Paga'],
    ]),
    '2026.1': this.montar('2026.1', 1320, [
      ['Janeiro', '2026-01-10', 'Paga'],
      ['Fevereiro', '2026-02-10', 'Paga'],
      ['Março', '2026-03-10', 'Paga'],
      ['Abril', '2026-04-10', 'Paga'],
      ['Maio', '2026-05-10', 'Paga'],
      ['Junho', '2026-06-10', 'Paga'],
    ]),
    '2026.2': this.montar('2026.2', 1320, [
      ['Julho', '2026-07-10', 'Paga'],
      ['Agosto', '2026-08-10', 'Paga'],
      ['Setembro', '2026-09-10', 'Paga'],
      ['Outubro', '2026-10-10', 'Paga'],
      ['Novembro', '2026-11-10', 'A Pagar'],
      ['Dezembro', '2026-12-10', 'A Pagar'],
    ]),
  };

  listarSemestres(): string[] {
    return Object.keys(this.dados).sort().reverse();
  }

  semestreAtual(): string {
    return '2026.2';
  }

  listarPorSemestre(semestre: string): Mensalidade[] {
    return [...(this.dados[semestre] ?? [])];
  }

  private montar(semestre: string, valor: number, parcelas: Parcela[]): Mensalidade[] {
    return parcelas.map(([mes, vencimento, status], i) => ({
      id: `${semestre}-${i + 1}`,
      mes,
      vencimento,
      valor,
      status,
      codigoBarras: this.linhaDigitavel(semestre, i + 1),
    }));
  }

  /** Linha digitável fictícia, só para o mock. */
  private linhaDigitavel(semestre: string, parcela: number): string {
    const s = semestre.replace('.', '');
    return `23793.38128 6${s}0.00000${parcela} 12345.678901 1 9${s}00132000`;
  }
}
