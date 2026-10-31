import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlumnosUtl, RespuestaAlumnos } from "./alumnosUTL";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ProyectoapiService {

    constructor(private http: HttpClient) { }

    public getAlumnos(): Observable<RespuestaAlumnos> {
        return this.http.get<RespuestaAlumnos>
            ('http://127.0.0.1:5000/api/alumnos/')
    }

    agregarNuevoAlumno(datos: AlumnosUtl) {
        return this.http.post
            ('http://127.0.0.1:5000/api/alumnos/', datos)
    }

}