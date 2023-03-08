import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../work-order.service';
import { WorkOrder } from '../work-order';
import { Router } from '@angular/router';
import { TechnicianService } from '../technician.service';
import { Technician } from '../technician';


@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.css']
})
export class WorkOrdersComponent implements OnInit {
  statuses?: string[];
  workOrders?: WorkOrder[];
  technicians?: Technician[];

  constructor(private workOrderService: WorkOrderService, private technicianService: TechnicianService, private router: Router) { }

  /**
   * Calls the getWorkOrders, getTechnicians, and getStatusList
   * functions after the page loads to ensure the call doesn't
   * return empty due the the page load order
  */
  ngOnInit(): void {
    this.getWorkOrders();
    this.getTechnicians();
    this.getStatusList();
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
   * Filters the workorder query by status value
   */
  getFilteredWorkOrders(status: string) {
    this.workOrderService.getFilteredWorkOrders(status).subscribe(workOrders => {
      if (workOrders.length > 0) {
        this.workOrders = workOrders;
      }
    });
  }

  /**
   * Re-routes the user to a detailed page for the
   * selected work order
   * @param id
   */
  orderDetail(id: number) {
    this.router.navigateByUrl('orders/order/' + id);
  }

  /**
   * Re-routes the user to a detailed page for the
   * selected technician
   * @param id
   */
  techDetail(id: number) {
    this.router.navigateByUrl('techs/tech/' + id);
  }

  /**
   * This method updates the workorder table by adding a new record
   */
  addWorkOrder(): void { } //TODO

  /**
   * Returns a list of available statuses present in the workOrders
   * table
   */
  getStatusList(): void {
    this.workOrderService.getStatuses().subscribe(statuses => {
      if (statuses.length > 0) {
        this.statuses = statuses;
      }
    });
  }

  /**
   * Returns a list of technicians available from the
   * technicians table
   */
  getTechnicians(): void {
    this.technicianService.getTechnicians().subscribe(technicians => {
      if (technicians.length > 0) {
        this.technicians = technicians;
      }
    });
  }
}
