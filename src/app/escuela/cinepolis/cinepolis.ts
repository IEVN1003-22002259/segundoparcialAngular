import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Comprador } from '../comprador';


@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-cinepolis',
  styleUrl: './cinepolis.css',
  templateUrl: './cinepolis.html',
})
export class Cinepolis {

  formulario!: FormGroup;
  mensajeError: string = '';
  ventas: Comprador[] = [];

  nuevoComprador: Comprador = {
    nombreCliente: '',
    compradores: 0,
    boletasCompradas: 0,
    tarjetaCineco: '',
    descuento: 0,
    totalPagar: 0
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      compradores: new FormControl(''),
      tarjetaCineco: new FormControl('no'),
      boletas: new FormControl('')
    });

    let datos = localStorage.getItem('ventas');
    if (datos) {
      this.ventas = JSON.parse(datos);
    }
  }

  procesar(): void {
    let nombre = this.formulario.value.nombre;
    let compradores = Number(this.formulario.value.compradores);
    let boletas = Number(this.formulario.value.boletas);
    let tarjeta = this.formulario.value.tarjetaCineco;

    let maxBoletos = compradores * 7;

    if (boletas > maxBoletos) {
      this.mensajeError = 'No puedes comprar más de ' + maxBoletos + ' boletos para ' + compradores + ' persona(s).';
      return;
    }

    this.mensajeError = '';

    let subtotal = boletas * 12;

    let descuentoPorcentaje = 0;
    if (boletas > 5) {
      descuentoPorcentaje = 0.15;
    } else if (boletas >= 3) {
      descuentoPorcentaje = 0.10;
    }

    let total = subtotal - (subtotal * descuentoPorcentaje);

    if (tarjeta === 'si') {
      total = total - (total * 0.10);
    }

    let descuentoTotal = subtotal - total;

    this.nuevoComprador.nombreCliente = nombre;
    this.nuevoComprador.compradores = compradores;
    this.nuevoComprador.boletasCompradas = boletas;
    this.nuevoComprador.tarjetaCineco = tarjeta === 'si' ? 'Sí' : 'No';
    this.nuevoComprador.descuento = descuentoTotal;
    this.nuevoComprador.totalPagar = total;


    this.ventas.push({ ...this.nuevoComprador });
    localStorage.setItem('ventas', JSON.stringify(this.ventas));
  }

  verVentas(): void {
    this.router.navigate(['/escuela/ventas']);
  }

  salir(): void {
    this.formulario.reset({
      nombre: '',
      compradores: '',
      tarjetaCineco: 'no',
      boletas: ''
    });

    this.mensajeError = '';
    this.nuevoComprador = {
      nombreCliente: '',
      compradores: 0,
      boletasCompradas: 0,
      tarjetaCineco: '',
      descuento: 0,
      totalPagar: 0
    };
  }

}