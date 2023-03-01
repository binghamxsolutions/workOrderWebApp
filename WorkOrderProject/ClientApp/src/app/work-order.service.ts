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


  /**
   * Retrieves all items from the workorder table
   * @returns An `Obseverable` array of type `WorkOrder`
   */
  getWorkOrders(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.workOrdersUrl).pipe(
      catchError(this.handleError<WorkOrder[]>('getWorkOrders', []))
    );
  }

  /**
   * Retrieves the filtered work order list from the database by matching the
   * technicianId
   * @param techId This will be the filter for the returned list
   * @returns An `Obseverable` array of type `WorkOrder`
   */
  getFilteredWorkOrders(techId: number): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.workOrdersUrl).pipe(
      catchError(this.handleError<WorkOrder[]>('getFilteredWorkOrders', []))
    );
  }


  /**
   * 
   * @param id Serves as a filter to aid with web app routing
   * @returns 
   */
  getWorkOrder(id: number): Observable<WorkOrder> {
    const url = '${this.workOrdersUrl}/${id}';
    return this.http.get<WorkOrder>(url).pipe(
      catchError(this.handleError<WorkOrder>('getWorkOrder woId = ${id}'))
    );
  }

  /**
   * 
   * @param operation
   * @param result
   * @returns
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => { return of(result as T) };
  } //code sourced from: https://angular.io/tutorial/tour-of-heroes/toh-pt6#heroes-and-http

}
