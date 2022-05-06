import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.scss']
})
export class AutorComponent implements OnInit {

  nombre:string = '';
  autors:any [] = [];
  update:boolean = false;
  idAutor:number = 0;

  debouncer:Subject<string> = new Subject();

  constructor(private modalService:NgbModal, private _service:ServiceService) { }

  ngOnInit(): void {
    this.getAutors();
    this.debouncer.pipe(debounceTime(600)).subscribe(
      valor => {
        this.validarNombreBusquedad(valor);
      }
    );
  }

  getAutors(){
    this._service.getAutor().subscribe((resp) =>{
      this.autors = resp;
    });
  }

  validarNombreBusquedad(valor:string){
    let expRegular = new RegExp(`${valor}.*`, "i");
    let actorTemp = this.autors;
    const validarNombre = actorTemp.filter(u => expRegular.test(u.nombre.toUpperCase()));
    if(validarNombre.length != 0){
      this.autors = validarNombre;
    }
    if(valor.length == 0){
      this.getAutors();
    }
  }

  tiempoBusquedadActor(valor:string){
      this.debouncer.next(valor);
  }



  deleteActorToId(actor:any){
    this._service.deleteActor(actor.id).subscribe(resp=>{
      if(resp){
        Swal.fire({
          title: "El Actor " + actor.nombre,
         text: "Se eliminó correctamente",
         icon: "success"
        });
        this.getAutors();
      }
    });
  }

  searchActor(actor:any,content:any){
      this.nombre = actor.nombre;
      this.idAutor = actor.id;
      this.open(content,'a');
  }

  updateAutor(){
    let actor = {
      "id":this.idAutor,
      "nombre":this.nombre
    }

    Swal.fire({
      title:'Actualizando Informaciòn',
      text:'Espere un momento por favor',
      icon:'info',
      allowOutsideClick:false
    });

    Swal.showLoading();

    this._service.updateActor(actor).subscribe(resp=>{
      Swal.fire({
        title: "El Actor " + this.nombre,
       text: "Se creo actualizó correctamente",
       icon: "success"
      });
      this.modalService.dismissAll();
      this.getAutors();
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

    const validarNombre = this.autors.filter(u => u.nombre == this.nombre);

    if (validarNombre.length != 0){
      Swal.fire({
        title:'ERROR',
        text:`El autor ${validarNombre[0]['nombre']} ya se encuentra creado`,
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

      this._service.createAutor(this.nombre).subscribe(resp=>{
        Swal.fire({
          title: "El Actor " + resp['nombre'],
         text: "Se creo correctamente",
         icon: "success"
        });
        this.getAutors();
      });

    }

  }

}
