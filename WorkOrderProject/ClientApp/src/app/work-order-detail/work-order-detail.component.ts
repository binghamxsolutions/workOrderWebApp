import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkOrderService } from '../work-order.service';
import { WorkOrder } from '../work-order';
import { TechnicianService } from '../technician.service';
import { Technician } from '../technician';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-order-detail',
  templateUrl: './work-order-detail.component.html',
  styleUrls: ['./work-order-detail.component.css']
})
export class WorkOrderDetailComponent implements OnInit {
  id: number;
  techId: number | undefined;
  workOrder?: WorkOrder | undefined;
  technician?: Technician | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private workOrderService: WorkOrderService, private technicianService: TechnicianService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  /**
   * Calls the getWorkOrder function after the page loads
   * to ensure the call doesn't return empty due the the page load order
  */
  ngOnInit(): void {
    this.getWorkOrder();
    this.getTechnician();
  }

  /** 
   * Generates the workorder.noNum by capturing the `:id` from the URI slug
   */
  getWorkOrder(): void {
    this.workOrderService.getWorkOrder(this.id).subscribe(workOrder => {
      if (workOrder) {
        this.techId = workOrder.technicianId!;
        this.workOrder = workOrder;
      } else {
        this.error404();
      }
    });
  }
  getTechnician(): void {
    this.technicianService.getTechnician(this.id).subscribe(technician => {
      if (technician) {
        this.technician = technician;
      }
    });
  }

  /**
    *This method attempts to redirect to the 404 page if the workOrder does not exist
  */
  error404(): void {
      this.router.navigateByUrl('404');
  }
}
