import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { WorkOrder } from './work-order';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {
  private workOrdersUrl = 'api/workOrders';
  httpOptions = {
    header: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getWorkOrders(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.workOrdersUrl).pipe(
      catchError(this.handleError<WorkOrder[]>('getWorkOrders', []))
    );
  }


  getWorkOrder(id: number): Observable<WorkOrder> {
    const url = '${this.workOrdersUrl}/${id}';
    return this.http.get<WorkOrder>(url).pipe(
      catchError(this.handleError<WorkOrder>('getWorkOrder woId = ${id}'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => { return of(result as T) };
  } //code sourced from: https://angular.io/tutorial/tour-of-heroes/toh-pt6#heroes-and-http

}
