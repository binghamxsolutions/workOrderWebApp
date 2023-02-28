import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TechnicianService } from '../technician.service';
import { Technician } from '../technician';

@Component({
  selector: 'app-technician-detail',
  templateUrl: './technician-detail.component.html',
  styleUrls: ['./technician-detail.component.css']
})

export class TechnicianDetailComponent implements OnInit {
  //@Input() technician?: Technician;
  technician: Technician | undefined;

  constructor(private route: ActivatedRoute, private workOrderService: TechnicianService, private location: Location) { }

  ngOnInit(): void {
    this.getWorkOrder;
  }

  getWorkOrder(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.workOrderService.getTechnician(id).subscribe(technician => this.technician = technician);
  }

  goBack(): void {
    this.location.back();
  }

}
