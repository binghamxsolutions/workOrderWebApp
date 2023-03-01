import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Technician } from './technician';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {
  base?: string;
  httpOptions = {
    header: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.base = baseUrl; }

  getTechnicians(): Observable<Technician[]> {
    return this.http.get<Technician[]>(this.base + "gettechnicians").pipe(
      catchError(this.handleError<Technician[]>('getTechnicians', []))
    );
  }

  getTechnician(id: number): Observable<Technician> {
    const url = '${this.techniciansUrl}/${id}';
    return this.http.get<Technician>(this.base + 'gettechnician?id=$id').pipe(
      catchError(this.handleError<Technician>('getTechnician techId = ${id}'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => { return of(result as T) };
  } //code sourced from: https://angular.io/tutorial/tour-of-heroes/toh-pt6#heroes-and-http
}
