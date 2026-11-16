import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publicacao } from '../core/models';
import { NoticiasService } from '../core/noticias.service';

@Component({
  selector: 'app-noticia-detalhe',
  templateUrl: 'noticia-detalhe.page.html',
  standalone: false,
})
export class NoticiaDetalhePage {
  publicacao?: Publicacao;

  constructor(route: ActivatedRoute, noticias: NoticiasService) {
    this.publicacao = noticias.buscarPorId(Number(route.snapshot.paramMap.get('id')));
  }
}
