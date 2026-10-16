import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Comprador } from '../comprador';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css',
})
export class Ventas implements OnInit {

  formulario!: FormGroup;
  ventas: Comprador[] = [];
  totalGeneral: number = 0;
  indiceEdicion: number = -1;
  mensajeError: string = '';

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

    this.cargarVentas();
  }

  cargarVentas(): void {
    let datos = localStorage.getItem('ventas');
    if (datos) {
      this.ventas = JSON.parse(datos);
    } else {
      this.ventas = [];
    }
    this.sumarTotal();
  }

  sumarTotal(): void {
    this.totalGeneral = 0;
    for (let i = 0; i < this.ventas.length; i++) {
      this.totalGeneral += this.ventas[i].totalPagar;
    }
  }

  editarVenta(index: number): void {
    this.nuevoComprador = {
      ...this.ventas[index]
    };

    const venta = this.ventas[index];

    this.formulario.patchValue({
      nombre: venta.nombreCliente,
      compradores: venta.compradores,
      tarjetaCineco: venta.tarjetaCineco === 'Sí' ? 'si' : 'no',
      boletas: venta.boletasCompradas
    });

    this.mensajeError = '';
    this.indiceEdicion = index;
  }

  guardarEdicion(): void {
    let nombre = this.formulario.value.nombre;
    let compradores = Number(this.formulario.value.compradores);
    let boletas = Number(this.formulario.value.boletas);
    let tarjeta = this.formulario.value.tarjetaCineco;

    if (nombre === '' || compradores <= 0 || boletas <= 0) {
      this.mensajeError = 'Todos los campos son obligatorios.';
      return;
    }

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

    if (this.indiceEdicion !== -1) {
      this.ventas[this.indiceEdicion] = {
        ...this.nuevoComprador
      };
    }

    localStorage.setItem('ventas', JSON.stringify(this.ventas));
    this.sumarTotal();
    this.limpiarCampos();
  }

  eliminarVenta(index: number): void {
    this.ventas.splice(index, 1);
    localStorage.setItem('ventas', JSON.stringify(this.ventas));
    this.sumarTotal();
    this.limpiarCampos();
  }

  limpiarCampos(): void {
    this.nuevoComprador = {
      nombreCliente: '',
      compradores: 0,
      boletasCompradas: 0,
      tarjetaCineco: '',
      descuento: 0,
      totalPagar: 0
    };

    this.formulario.patchValue({
      nombre: '',
      compradores: '',
      tarjetaCineco: 'no',
      boletas: ''
    });

    this.mensajeError = '';
    this.indiceEdicion = -1;
  }

  volver(): void {
    this.router.navigate(['/escuela/cinepolis']);
  }

}