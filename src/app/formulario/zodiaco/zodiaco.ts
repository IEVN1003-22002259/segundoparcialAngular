import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-zodiaco',
  styleUrl: './zodiaco.css',
  templateUrl: './zodiaco.html',
})
export class Zodiaco {

  nombre: string = '';
  amaterno: string = '';
  apaterno: string = '';
  dia: number = 0;
  mes: number = 0;
  anio: number = 0;
  sexo: string = '';
  edad: number = 0;
  signo: string = '';
  imagen: string = '';
  mostrar: boolean = false;

  animales: any[] = [
    {
      nombre: 'Rata',
      imagen: 'https://img.freepik.com/fotos-premium/signo-zodiaco-chino-rata-dibujo-rata_328946-11195.jpg?semt=ais_hybrid'
    },
    {
      nombre: 'Buey',
      imagen: 'https://img.freepik.com/fotos-premium/signo-zodiaco-chino-buey-dibujo-toro_328946-11091.jpg'
    },
    {
      nombre: 'Tigre',
      imagen: 'https://img.freepik.com/fotos-premium/signo-zodiaco-chino-tigre-dibujo-tigre_328946-17664.jpg'
    },
    {
      nombre: 'Conejo',
      imagen: 'https://tse3.mm.bing.net/th/id/OIP.U_RT-fOJfTld6ckKa0dDsAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      nombre: 'Dragon',
      imagen: 'https://img.freepik.com/vector-premium/ilustracion-vector-signo-zodiaco-dragon-chino-oro-tradicional_501569-940.jpg?w=2000'
    },
    {
      nombre: 'Serpiente',
      imagen: 'https://tse3.mm.bing.net/th/id/OIP.Vl0nsECshmLLw1ytXzmQiQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      nombre: 'Caballo',
      imagen: 'https://tse3.mm.bing.net/th/id/OIP.E1SBsSkx74Bsc0gagr2m0AHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      nombre: 'Cabra',
      imagen: 'https://tse3.mm.bing.net/th/id/OIP.bvyyxIc7qodiX69ANWt9WgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      nombre: 'Mono',
      imagen: 'https://www.lasestrellas.tv/_next/image?url=https:%2F%2Fst1.uvnimg.com%2F0f%2F92%2F6baf7426720d8aead931424b017c%2Fmono.jpg&w=1280&q=75'
    },
    {
      nombre: 'Gallo',
      imagen: 'https://tse1.mm.bing.net/th/id/OIP.r4USLDERhxM4XjcBuNBuOAHaG3?r=0&w=669&h=621&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      nombre: 'Perro',
      imagen: 'https://tse3.mm.bing.net/th/id/OIP.c-J51X1YOS65pA4Uzn0SGwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      nombre: 'Cerdo',
      imagen: 'https://static.vecteezy.com/system/resources/previews/024/098/031/non_2x/pig-chinese-zodiac-emblem-free-png.png'
    }
  ];

  mostrarImagen(): void {
    this.mostrar = true;
  }

  calcular(): void {

    this.edad = 2026 - this.anio;

    if (this.mes > 10) {
      this.edad = this.edad - 1;
    }

    if (this.mes == 10 && this.dia > 3) {
      this.edad = this.edad - 1;
    }

    let numero = (this.anio - 4) % 12;

    if (numero == 0) {
      this.signo = 'Rata';
      this.imagen = this.animales[0].imagen;
    }

    if (numero == 1) {
      this.signo = 'Buey';
      this.imagen = this.animales[1].imagen;
    }

    if (numero == 2) {
      this.signo = 'Tigre';
      this.imagen = this.animales[2].imagen;
    }

    if (numero == 3) {
      this.signo = 'Conejo';
      this.imagen = this.animales[3].imagen;
    }

    if (numero == 4) {
      this.signo = 'Dragon';
      this.imagen = this.animales[4].imagen;
    }

    if (numero == 5) {
      this.signo = 'Serpiente';
      this.imagen = this.animales[5].imagen;
    }

    if (numero == 6) {
      this.signo = 'Caballo';
      this.imagen = this.animales[6].imagen;
    }

    if (numero == 7) {
      this.signo = 'Cabra';
      this.imagen = this.animales[7].imagen;
    }

    if (numero == 8) {
      this.signo = 'Mono';
      this.imagen = this.animales[8].imagen;
    }

    if (numero == 9) {
      this.signo = 'Gallo';
      this.imagen = this.animales[9].imagen;
    }

    if (numero == 10) {
      this.signo = 'Perro';
      this.imagen = this.animales[10].imagen;
    }

    if (numero == 11) {
      this.signo = 'Cerdo';
      this.imagen = this.animales[11].imagen;
    }

    this.mostrarImagen();
  }
}