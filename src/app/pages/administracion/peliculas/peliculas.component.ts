import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { PeliculaModel } from '../../model/pelicula.model';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss']
})
export class PeliculasComponent implements OnInit {

  peliculaModel = new PeliculaModel()
  nombre:string = '';
  categorias:any [] = [];
  autors:any [] = [];
  update:boolean = false;

  peliculasArray:any[] = []

  debouncer:Subject<string> = new Subject();

  constructor(private modalService:NgbModal, private _service:ServiceService) { }

  ngOnInit(): void {
    this.getPeliculas();
    this.getCategorias();
    this.getAutors();
    this.debouncerInit();
  }

  debouncerInit(){
    this.debouncer.pipe(debounceTime(600)).subscribe(
      valor => {
        this.validarNombreBusquedad(valor);
      }
    );
  }

  getPeliculas(){
    this._service.getPeliculas().subscribe((resp) =>{
      this.peliculasArray = resp;
    });
  }

  getCategorias(){
    this._service.getCategoria().subscribe((resp) =>{
      this.categorias = resp;
    });
  }

  getAutors(){
    this._service.getAutor().subscribe((resp) =>{
      this.autors = resp;
    });
  }

  validarNombreBusquedad(valor:string){
    let expRegular = new RegExp(`${valor}.*`, "i");
    let pelTemp = this.peliculasArray;
    const validarNombre = pelTemp.filter(u => expRegular.test(u.nombre.toUpperCase()));
    if(validarNombre.length != 0){
      this.peliculasArray = validarNombre;
    }
    if(valor.length == 0){
      this.getPeliculas();
    }
  }

  tiempoBusquedadPelicula(valor:string){
      this.debouncer.next(valor);
  }

  deletePeliculaId(pelicula:PeliculaModel){
    this._service.deletePelicula(pelicula.id).subscribe(resp=>{
      if(resp){
        Swal.fire({
          title: "La Pelicula " + pelicula.nombre,
         text: "Se eliminó correctamente",
         icon: "success"
        });
        this.getPeliculas();
      }
    });
  }

  searchPelicula(pelicula:any,content:any){
    this.peliculaModel = pelicula;
      console.log(pelicula);

      this.open(content,'a');
  }

  updatePelicula(){

    Swal.fire({
      title:'Actualizando Informaciòn',
      text:'Espere un momento por favor',
      icon:'info',
      allowOutsideClick:false
    });

    Swal.showLoading();

    this._service.updatePelicula(this.peliculaModel).subscribe(_=>{
      Swal.fire({
        title: "La Pelicula " + this.nombre,
       text: "Se creo actualizó correctamente",
       icon: "success"
      });
      this.modalService.dismissAll();
      this.getPeliculas();
    });
  }

  open(content:any,tipo:string) {
    if(tipo != 'a'){
      this.update = false;
      this.peliculaModel = new PeliculaModel();
    }else{
      this.update = true;
    }
    this.modalService.open(content, { size: 'md' , windowClass : 'modal-prueba' , backdrop: 'static' });
  }

  guardarPelicula(f:NgForm){

    console.log(this.peliculaModel);

    this.update = false;
    this.modalService.dismissAll();

    if(f.invalid){
      Swal.fire({
        title:'ERROR',
        text:'Todos los campos deben estar llenos o validos',
        icon:'error'
      });
    return;
    }

    const validarNombre = this.peliculasArray.filter(u => u.nombre == this.nombre);

    if (validarNombre.length != 0){
      Swal.fire({
        title:'ERROR',
        text:`La Pelicula ${validarNombre[0]['nombre']} ya se encuentra creado`,
        icon:'error'
      });
    }else{

      Swal.fire({
        title:'Guardando información',
        text:'Espere un momento por favor',
        icon:'info',
        allowOutsideClick:false
      });

      Swal.showLoading();

      this._service.createPelicula(this.peliculaModel).subscribe(resp=>{
        Swal.fire({
          title: "La Pelicula " + resp['nombre'],
         text: "Se creo correctamente",
         icon: "success"
        });
        this.getPeliculas();
      });

    }

  }
}
