import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PeliculaModel } from '../model/pelicula.model';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  options: any;

  constructor(private http:HttpClient) {
    this.header();
  }

  header(){
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'X-Requested-With':'XMLHttpRequest'
      })
    };
  }

  /* GET */

  getAutor():Observable<any>
  {
    return this.http.get<any>(`${URL}/autors`,this.options)
  }

  getCategoria():Observable<any>
  {
    return this.http.get<any>(`${URL}/categorias`,this.options)
  }

  getPeliculas():Observable<any>
  {
    return this.http.get<any>(`${URL}/peliculas`,this.options)
  }


  /* CREATE */
  createAutor(nombre:string):Observable<any>{
    let data = {
      "nombre":nombre
    }
    return this.http.post<any>(`${URL}/create/autor`,data,this.options)
  }

  createCategoria(nombre:string):Observable<any>{
    let data = {
      "nombre":nombre
    }
    return this.http.post<any>(`${URL}/create/categoria`,data,this.options)
  }

  createPelicula(pelicula:PeliculaModel):Observable<any>{
    return this.http.post<any>(`${URL}/create/pelicula`,pelicula,this.options)
  }


  /* Delete */
  deleteActor(id:number):Observable<any>{
    return this.http.get<boolean>(`${URL}/delete/autor?id=${id}`,this.options)
  }

  deleteCategoria(id:number):Observable<any>{
    return this.http.get<boolean>(`${URL}/delete/categoria?id=${id}`,this.options)
  }

  deletePelicula(id:number):Observable<any>{
    return this.http.get<boolean>(`${URL}/delete/pelicula?id=${id}`,this.options)
  }

  /* Update */
  updateActor(actor:any):Observable<any>{
    return this.http.post<any>(`${URL}/update/autor`,actor,this.options)
  }

  updateCategoria(categoria:any):Observable<any>{
    return this.http.post<any>(`${URL}/update/categoria`,categoria,this.options)
  }

  updatePelicula(pelicula:PeliculaModel):Observable<any>{
    return this.http.post<any>(`${URL}/update/pelicula`,pelicula,this.options)
  }

}
