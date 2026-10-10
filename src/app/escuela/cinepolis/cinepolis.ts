import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Comprador } from '../comprador';

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-cinepolis',
  styleUrl: './cinepolis.css',
  templateUrl: './cinepolis.html',
})
export class Cinepolis {

  formulario!: FormGroup;

  nuevoComprador: Comprador = {
    nombreCliente: '',
    totalPagar: 0,
    boletasCompradas: 0,
    mensajeError: '',
    tarjetaCineco: '',
    descuento: 0
  };

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      compradores: new FormControl(''),
      tarjetaCineco: new FormControl(''),
      boletas: new FormControl('')
    });
  }

  procesar(): void {
    const nombre = this.formulario.value.nombre;
    const compradores = parseFloat(this.formulario.value.compradores);
    const boletas = parseFloat(this.formulario.value.boletas);
    const tieneTarjeta = this.formulario.value.tarjetaCineco;

    const maxPermitido = compradores * 7;

    if (boletas > maxPermitido) {
      this.nuevoComprador.mensajeError = `No es posible comprar ${boletas} boletas. El límite para ${compradores} persona(s) es de ${maxPermitido} boletas.`;
      this.nuevoComprador.nombreCliente = '';
      this.nuevoComprador.boletasCompradas = 0;
      this.nuevoComprador.totalPagar = 0;
      this.nuevoComprador.tarjetaCineco = '';
      this.nuevoComprador.descuento = 0;
      return;
    }

    this.nuevoComprador.mensajeError = '';

    let subtotal = boletas * 12;

    let descuento = 0;
    if (boletas > 5) {
      descuento = 0.15;
    } else if (boletas >= 3) {
      descuento = 0.10;
    }

    let total = subtotal - (subtotal * descuento);

    if (tieneTarjeta === 'si') {
      total = total - (total * 0.10);
      this.nuevoComprador.tarjetaCineco = 'Sí';
    } else {
      this.nuevoComprador.tarjetaCineco = 'No';
    }

    let dineroDescontado = subtotal - total;

    this.nuevoComprador.nombreCliente = nombre;
    this.nuevoComprador.boletasCompradas = boletas;
    this.nuevoComprador.descuento = dineroDescontado;
    this.nuevoComprador.totalPagar = total;
  }

  salir(): void {
    this.ngOnInit();

    this.nuevoComprador.nombreCliente = '';
    this.nuevoComprador.boletasCompradas = 0;
    this.nuevoComprador.totalPagar = 0;
    this.nuevoComprador.tarjetaCineco = '';
    this.nuevoComprador.descuento = 0;
    this.nuevoComprador.mensajeError = '';
  }

}