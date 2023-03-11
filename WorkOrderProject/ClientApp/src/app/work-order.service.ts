import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { WorkOrder } from './work-order';
import { Result } from './result';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  base?: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.base = baseUrl; }


  /**
   * Retrieves all items from the workorder table
   * @returns An `Obseverable` array of type `WorkOrder`
   */
  getWorkOrders(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.base + "workorder/getworkorders", this.httpOptions).pipe(
      catchError(this.handleError<WorkOrder[]>('getWorkOrders', []))
    );
  }

  /**
   * Retrieves the filtered work order list from the database by matching the
   * status
   * @param techId This will be the filter for the returned list
   * @returns An `Obseverable` array of type `WorkOrder`
   */
  getFilteredWorkOrders(status: string): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.base + "workorder/getworkordersbystatus?status=" + status).pipe(
      catchError(this.handleError<WorkOrder[]>('getFilteredWorkOrders', []))
    );
  }

  getTechOrders(id: number): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.base + "workorder/gettechorders?id=" + id).pipe(
      catchError(this.handleError<WorkOrder[]>('getTechOrders', []))
    );
  }

  /**
   * Retrieves a list of work order statuses
   * available in the database
   * @returns A string array of values if any are present
   */
  getStatuses(): Observable<string[]> {
    return this.http.get<string[]>(this.base + "workorder/getstatuses").pipe(
      catchError(this.handleError<string[]>('getStatuses', []))
    );
  }

  /**
   * 
   * @param id Serves as a filter to aid with web app routing
   * @returns 
   */
  getWorkOrder(id: number): Observable<WorkOrder> {
    return this.http.get<WorkOrder>(this.base + 'workorder/getworkorder?id=' + id).pipe(
      catchError(this.handleError<WorkOrder>('getWorkOrder woId = ${id}'))
    );
  }

  createWorkOrder(workOrder: WorkOrder): void {
    this.http.post<WorkOrder>(this.base + 'workorder/createneworder?newOrder=' + workOrder, this.httpOptions);
  }

  getNewWONum(): Observable<number> {
    return this.http.get<number>(this.base + 'workorder/setworkordernumber', this.httpOptions).pipe(
      catchError(this.handleError<number>('getNewWONum'))
    );
  }

  /**
   * Handles errors from back-end requests to allow the app to still
   * run without crashing
   * @param operation
   * @param result
   * @returns
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => { return of(result as T) };
  } //code sourced from: https://angular.io/tutorial/tour-of-heroes/toh-pt6#heroes-and-http
}
