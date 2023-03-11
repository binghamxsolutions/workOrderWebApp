import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../work-order.service';
import { WorkOrder } from '../work-order';
import { Router } from '@angular/router';
import { TechnicianService } from '../technician.service';
import { Technician } from '../technician';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.css']
})
export class WorkOrdersComponent implements OnInit {
  statuses?: string[];
  workOrders?: WorkOrder[];
  technicians?: Technician[];
  newOrderForm = this.formBuilder.group({
    woNum: <number|null>(null),
    contactName: <string | null>(null),
    email: <string | null>(null),
    contactNumber: <string | null>(null),
    dateReceived: <Date | null>(null),
    technicianId: <number | null>(null),
    dateAssigned: <Date | null>(null),
    problem: <string | null>(null),
    status: <string | null>(null),
    dateComplete: <Date | null>(null),
    techComments: <string | null>(null)
  });

  constructor(private workOrderService: WorkOrderService, private technicianService: TechnicianService, private router: Router, private formBuilder: FormBuilder, private rfm: ReactiveFormsModule) { }

  /**
   * Calls the getWorkOrders, getTechnicians, and getStatusList
   * functions after the page loads to ensure the call doesn't
   * return empty due the the page load order
  */
  ngOnInit(): void {
    this.getOpenWorkOrders();
    this.getTechnicians();
    this.getStatusList();
  }

  /**
   * Generates a list of all work orders from a table if records are available
   */
  getAllWorkOrders(): void {
    this.workOrderService.getWorkOrders().subscribe(workOrders => {
      if (workOrders.length > 0) {
        this.workOrders = workOrders;
      }
    });
  }

  /** 
   * Generates a list of open work orders from a table if records are available
   */
  getOpenWorkOrders(): void {
    this.workOrderService.getFilteredWorkOrders("Assigned").subscribe(workOrders => {
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
  addWorkOrder() {
    // TODO  get new workorder number thru wo-service
    var current_time = new Date(); // captures current time

    this.newOrderForm.controls.dateReceived.setValue(current_time);
    this.newOrderForm.controls.status.setValue("Assigned");
    //sets expected values for the work order's status and date received values 

    if ((this.newOrderForm.controls.technicianId.value !== null)) {
      this.newOrderForm.controls.dateAssigned.setValue(current_time);
    }  //sets the assigned date if and only a technicina has been set

    this.getNewWONum();
    // helps set the new wo number since scoping issues will not allow property assignment
  }

  /**
   * Produces a new work order number to assign to a newly created
   * work order and then submits it
   */
  getNewWONum() {
    this.workOrderService.getNewWONum().subscribe( woNum =>
    {
      this.newOrderForm.controls.woNum.setValue(woNum);
      this.workOrderService.createWorkOrder(this.newOrderForm.value as WorkOrder);
   });
  } 

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
