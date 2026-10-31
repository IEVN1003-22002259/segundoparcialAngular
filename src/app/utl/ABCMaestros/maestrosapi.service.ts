import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MaestrosUtl, RespuestaMaestros } from "./maestrosUTL";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ProyectoapiService {

    constructor(private http: HttpClient) { }

    public getMaestros(): Observable<RespuestaMaestros> {
        return this.http.get<RespuestaMaestros>
        ('http://127.0.0.1:5000/api/maestros/')
    }

    agregarNuevoMaestro(datos: MaestrosUtl) {
        return this.http.post
        ('http://127.0.0.1:5000/api/maestros/', datos)
    }

}