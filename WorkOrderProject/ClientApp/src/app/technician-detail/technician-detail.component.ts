import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TechnicianService } from '../technician.service';
import { Technician } from '../technician';
import { WorkOrder } from '../work-order';
import { WorkOrderService } from '../work-order.service';

@Component({
  selector: 'app-technician-detail',
  templateUrl: './technician-detail.component.html',
  styleUrls: ['./technician-detail.component.css']
})

export class TechnicianDetailComponent implements OnInit {
  //@Input() technician?: Technician;
  technician?: Technician;
  workOrders?: WorkOrder[];

  constructor(private route: ActivatedRoute, private technicianService: TechnicianService, private workOrderService: WorkOrderService, private location: Location) { }

  /**
   * Calls the getTechnician function after the page loads
   * to ensure the call doesn't return empty due the the page load order
  */
  ngOnInit(): void {
    this.getTechnician();
  }

  /**
   * Generates the technician.id by capturing the `:id` from the URI slug.
   * If that technician does not exist, the web app will re-route to a 404 page.
  */
  getTechnician(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.technicianService.getTechnician(id).subscribe(technician => {
      if (technician) {
        this.technician = technician;
      } else {
        this.error404();
      }
    });
  }

  getWorkOrders(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.workOrderService.getFilteredWorkOrders(id).subscribe(workOrders => this.workOrders= workOrders);
  }

  /**
   * This method creates a simple route to the previous page
  */
  goBack(): void {
    this.location.back();
  }

  /**
    *This method attempts to redirect to the 404 page if the workOrder does not exist
  */
  error404(): void {
    this.location.go("/404"), 3000;    
  }
}
