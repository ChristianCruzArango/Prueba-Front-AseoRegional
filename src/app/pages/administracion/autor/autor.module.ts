import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorRoutingModule } from './autor-routing.module';
import { AutorComponent } from './autor.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AutorComponent
  ],
  imports: [
    CommonModule,
    AutorRoutingModule,
    FormsModule,
    NgbModule,
    CommonModule,
    AutorRoutingModule,
    SharedModule
  ]
})
export class AutorModule { }
