import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorModule } from './autor/autor.module';
import { PeliculasModule } from './peliculas/peliculas.module';
import { CategoriasModule } from './categorias/categorias.module';

import { AdministracionComponent } from './administracion.component';

import { AdministracionRoutingModule } from './administracion-routing.module';

@NgModule({
  declarations: [
    AdministracionComponent
  ],
  imports: [
    CommonModule,
    AutorModule,
    CategoriasModule,
    PeliculasModule,
    AdministracionRoutingModule
  ]
})
export class AdministracionModule { }
