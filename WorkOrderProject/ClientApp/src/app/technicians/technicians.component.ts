import { Component, OnInit } from '@angular/core';
import { TechnicianService } from '../technician.service';
import { Technician } from '../technician';
import { Router } from '@angular/router';

@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.css']
})
export class TechniciansComponent implements OnInit {
  public technicians?: Technician[];


  constructor(private router: Router, private technicianService: TechnicianService) { }

  /**
   * Calls the getTechnicians function after the page loads
   * to ensure the call doesn't return empty due the the page load order
  */
  ngOnInit(): void {
    this.getTechnicians();
  }

  /**
   * Generates a list from the technicians table if there are records
   * present.
   */
  getTechnicians(): void {
   this.technicianService.getTechnicians().subscribe(technicians => {
      if (technicians.length > 0) {
        this.technicians = technicians;
      }
    });
  }


  /**
   * Re-routes the user to a technician detail page
   * @param id The technician's id number
   */
  techDetail(id: number) {
    this.router.navigateByUrl('techs/tech/' + id);
  }
}
