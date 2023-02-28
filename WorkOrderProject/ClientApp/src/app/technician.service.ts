import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Technician } from './technician';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {
  private techniciansUrl = 'technicians';

  httpOptions = {
    header: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getTechnicians(): Observable<Technician[]> {
    return this.http.get<Technician[]>(this.techniciansUrl).pipe(
      catchError(this.handleError<Technician[]>('getTechnicians', []))
    );
  }

  getTechnician(id: number): Observable<Technician> {
    const url = '${this.techniciansUrl}/${id}';
    return this.http.get<Technician>(url).pipe(
      catchError(this.handleError<Technician>('getTechnician techId = ${id}'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => { return of(result as T) };
  } //code sourced from: https://angular.io/tutorial/tour-of-heroes/toh-pt6#heroes-and-http
}
