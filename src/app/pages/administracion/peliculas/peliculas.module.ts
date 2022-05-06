import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculasRoutingModule } from './peliculas-routing.module';
import { PeliculasComponent } from './peliculas.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    PeliculasComponent
  ],
  imports: [
    CommonModule,
    PeliculasRoutingModule,
    FormsModule,
    CommonModule,
    PeliculasRoutingModule,
    SharedModule
  ]
})
export class PeliculasModule { }
