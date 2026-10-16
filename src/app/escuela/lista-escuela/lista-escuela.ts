import { Component, OnInit } from '@angular/core';
 
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Alumno } from '../alumno';
import { materialize } from 'rxjs';
 
@Component({
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  selector: 'app-lista-escuela',
  styleUrl: './lista-escuela.css',
  templateUrl: './lista-escuela.html',
})
export class ListaEscuela implements OnInit {
  formulario: FormGroup
  alumnos: Alumno[] = []
  indiceEdicion:number = -1;
 
  nuevoAlumno: Alumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: '',
  }
 
  ngOnInit(): void {
 
    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl(''),
    })
  }
 
 
 
  agregarAlumnos(): void {
    if (
      this.nuevoAlumno.matricula === '' ||
      this.nuevoAlumno.nombre === '' ||
      this.nuevoAlumno.correo === '' ||
      this.nuevoAlumno.materia === ''
    ) {
      alert('Todos los campos son obligatorios')
      return;
    }


    if(this.indiceEdicion !== -1){
      this.alumnos[this.indiceEdicion]={
        ...this.nuevoAlumno
      }
    }else{
      this.alumnos.push({...this.nuevoAlumno})
    }

 
    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    )

    this.limpiarCampos();
  }
 
  muestraAlumno(): void {
    this.nuevoAlumno.matricula = this.formulario.value.matricula
    this.nuevoAlumno.nombre = this.formulario.value.nombre
    this.nuevoAlumno.correo = this.formulario.value.correo
    this.nuevoAlumno.materia = this.formulario.value.materia
    this.agregarAlumnos()
 
  }
 
  cargarAlumnos(): void {
    const datos = localStorage.getItem('alumnos');
 
    if (datos) {
      this.alumnos = JSON.parse(datos);
    }
  }

  editarAlumnos(index:number):void {

    this.nuevoAlumno={
      ...this.alumnos[index]
    }
    const alumno = this.alumnos[index]
    this.formulario.patchValue({
      matricula: alumno.matricula,
      nombre: alumno.nombre,
      correo: alumno.correo,
      materia: alumno.materia
    })


    this.indiceEdicion=index
  }

  eliminarAlumno(index: number): void {
    this.alumnos.splice(index,1)
    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    )
  }


  limpiarCampos():void{
    this.nuevoAlumno = {
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    }
    this.formulario.patchValue({
      matricula: this.nuevoAlumno.matricula,
      nombre: this.nuevoAlumno.nombre,
      correo: this.nuevoAlumno.correo,
      materia: this.nuevoAlumno.materia
    })
    this.indiceEdicion=-1
  }
 
}