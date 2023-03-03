import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { WorkOrderService } from '../work-order.service';
import { WorkOrder } from '../work-order';
import { TechnicianService } from '../technician.service';
import { Technician } from '../technician';

@Component({
  selector: 'app-work-order-detail',
  templateUrl: './work-order-detail.component.html',
  styleUrls: ['./work-order-detail.component.css']
})
export class WorkOrderDetailComponent implements OnInit {
  workOrder?: WorkOrder | undefined;
  technician?: Technician | undefined;

  constructor(private route: ActivatedRoute, private workOrderService: WorkOrderService, private location: Location) { }

  /**
   * Calls the getWorkOrder function after the page loads
   * to ensure the call doesn't return empty due the the page load order
  */
  ngOnInit(): void {
    this.getWorkOrder();
  }

  /** 
   * Generates the workorder.noNum by capturing the `:id` from the URI slug
   */
  getWorkOrder(): void {
    const woId = Number(this.route.snapshot.paramMap.get('id'));
    this.workOrderService.getWorkOrder(woId).subscribe(workOrder => {
      if (workOrder) {
        this.workOrder = workOrder
        console.log(workOrder);
      } else {
        this.error404();
      }
    });
  }

  /**
   *  This method creates a simple route to the previous page
  */
  goBack(): void {
    this.location.back();
  }

  /**
    *This method attempts to redirect to the 404 page if the workOrder does not exist
  */
  error404(): void {
    this.location.go("/404");
  }
}
