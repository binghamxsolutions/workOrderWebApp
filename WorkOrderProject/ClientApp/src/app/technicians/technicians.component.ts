import { Component } from '@angular/core';
import { TechnicianService } from '../technician.service';
import { Technician } from '../technician';


@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.css']
})
export class TechniciansComponent {
  technicians: Technician[] = [];

  constructor(private technicianService: TechnicianService) { }

  getTechnicians(): void {
    this.technicianService.getTechnicians().subscribe(technicians => this.technicians = technicians);
  }

  ngOnInit(): void {
    this.getTechnicians;
  }
}
