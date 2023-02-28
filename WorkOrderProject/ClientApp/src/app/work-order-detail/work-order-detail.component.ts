import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { WorkOrderService } from '../work-order.service';
import { WorkOrder } from '../work-order';

@Component({
  selector: 'app-work-order-detail',
  templateUrl: './work-order-detail.component.html',
  styleUrls: ['./work-order-detail.component.css']
})
export class WorkOrderDetailComponent implements OnInit {
  workOrder: WorkOrder | undefined;
  constructor(private route: ActivatedRoute, private workOrderService: WorkOrderService, private location: Location) { }

  ngOnInit(): void {
    this.getWorkOrder;
  }

  getWorkOrder(): void {
    const woId = Number(this.route.snapshot.paramMap.get('id'));
    this.workOrderService.getWorkOrder(woId).subscribe(workOrder => this.workOrder = workOrder);
  }

  goBack(): void {
    this.location.back();
  }

}
