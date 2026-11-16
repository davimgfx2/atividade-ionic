import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular/lazy';
import { NoticiaDetalhePage } from './noticia-detalhe.page';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule.forChild([{ path: '', component: NoticiaDetalhePage }])],
  declarations: [NoticiaDetalhePage],
})
export class NoticiaDetalhePageModule {}
