import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../work-order.service';
import { WorkOrder } from '../work-order';

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.css']
})
export class WorkOrdersComponent implements OnInit {
  workOrders?: WorkOrder[];

  constructor(private workOrderService: WorkOrderService) { }

  /**
   * Calls the getWorkOrders function after the page loads
   * to ensure the call doesn't return empty due the the page load order
  */
  ngOnInit(): void {
    this.getWorkOrders();
  }

  /** 
   * Generates a list of work orders from a table if records are available
   */
  getWorkOrders(): void {
    this.workOrderService.getWorkOrders().subscribe(workOrders => {
      if (workOrders.length > 0) {
        this.workOrders = workOrders;
      }
   });
  }

  /**
   *  This method updates the workorder table by adding a new record
   */
  addWorkOrder(): void { } //TODO

  /**
   * Filters the workorder query by status value
   */
  getFilteredWorkOrders() { } //TODO
}
