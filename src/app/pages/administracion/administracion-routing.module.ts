import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'autors',
        loadChildren: () => import('./autor/autor-routing.module').then(m => m.AutorRoutingModule)
      },
      {
        path: 'categorias',
        loadChildren: () => import('./categorias/categorias-routing.module').then(m => m.CategoriasRoutingModule)
      },
      {
        path: 'peliculas',
        loadChildren: () => import('./peliculas/peliculas-routing.module').then(m => m.PeliculasRoutingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
