import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TechnicianService } from '../technician.service';
import { Technician } from '../technician';
import { WorkOrder } from '../work-order';
import { WorkOrderService } from '../work-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-technician-detail',
  templateUrl: './technician-detail.component.html',
  styleUrls: ['./technician-detail.component.css']
})

export class TechnicianDetailComponent implements OnInit {
  id: number;
  technician?: Technician;
  workOrders?: Record<number, string>[];

  constructor(private router: Router, private route: ActivatedRoute, private technicianService: TechnicianService, private workOrderService: WorkOrderService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  /**
   * Calls the getTechnician function after the page loads
   * to ensure the call doesn't return empty due the the page load order
  */
  ngOnInit(): void {
    this.getTechnician();
    this.getWorkOrders();
  }

  /**
   * Generates the technician.id by capturing the `:id` from the URI slug.
   * If that technician does not exist, the web app will re-route to a 404 page.
  */
  getTechnician(): void {
    this.technicianService.getTechnician(this.id).subscribe(technician => {
      if (technician) {
        this.technician = technician;
      } else {
        this.error404();
      }
    });
  }

  getWorkOrders(): void {
    this.workOrderService.getTechFilteredWorkOrders(this.id).subscribe(workOrders => { console.log("results: " + workOrders); });// this.workOrders = workOrders });
  }

  /**
    *This method attempts to redirect to the 404 page if the workOrder does not exist
  */
  error404(): void {
    this.router.navigateByUrl('404');
  }
}
