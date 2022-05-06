import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  nombre:string = '';
  categorias:any [] = [];
  update:boolean = false;
  idCategoria:number = 0;

  debouncer:Subject<string> = new Subject();

  constructor(private modalService:NgbModal, private _service:ServiceService) { }

  ngOnInit(): void {
    this.getCategorias();
    this.debouncer.pipe(debounceTime(600)).subscribe(
      valor => {
        this.validarNombreBusquedad(valor);
      }
    );
  }

  getCategorias(){
    this._service.getCategoria().subscribe((resp) =>{
      this.categorias = resp;
    });
  }

  validarNombreBusquedad(valor:string){
    let expRegular = new RegExp(`${valor}.*`, "i");
    let catTemp = this.categorias;
    const validarNombre = catTemp.filter(u => expRegular.test(u.nombre.toUpperCase()));
    if(validarNombre.length != 0){
      this.categorias = validarNombre;
    }
    if(valor.length == 0){
      this.getCategorias();
    }
  }

  tiempoBusquedadCategoria(valor:string){
      this.debouncer.next(valor);
  }

  deleteCategoriaId(actor:any){
    this._service.deleteCategoria(actor.id).subscribe(resp=>{
      if(resp){
        Swal.fire({
          title: "La Categoría " + actor.nombre,
         text: "Se eliminó correctamente",
         icon: "success"
        });
        this.getCategorias();
      }
    });
  }

  searchCategoria(actor:any,content:any){
      this.nombre = actor.nombre;
      this.idCategoria = actor.id;
      this.open(content,'a');
  }

  updateAutor(){
    let actor = {
      "id":this.idCategoria,
      "nombre":this.nombre
    }

    Swal.fire({
      title:'Actualizando Informaciòn',
      text:'Espere un momento por favor',
      icon:'info',
      allowOutsideClick:false
    });

    Swal.showLoading();

    this._service.updateCategoria(actor).subscribe(_=>{
      Swal.fire({
        title: "La Categoría " + this.nombre,
       text: "Se creo actualizó correctamente",
       icon: "success"
      });
      this.modalService.dismissAll();
      this.getCategorias();
    });
  }

  open(content:any,tipo:string) {
    if(tipo != 'a'){
      this.update = false;
      this.nombre = '';
    }else{
      this.update = true;
    }
    this.modalService.open(content, { size: 'md' , windowClass : 'modal-prueba' , backdrop: 'static' });
  }

  guardarActor(f:NgForm){

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

    const validarNombre = this.categorias.filter(u => u.nombre == this.nombre);

    if (validarNombre.length != 0){
      Swal.fire({
        title:'ERROR',
        text:`La Categoría ${validarNombre[0]['nombre']} ya se encuentra creado`,
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

      this._service.createCategoria(this.nombre).subscribe(resp=>{
        Swal.fire({
          title: "La Categoría " + resp['nombre'],
         text: "Se creo correctamente",
         icon: "success"
        });
        this.getCategorias();
      });

    }

  }

}

