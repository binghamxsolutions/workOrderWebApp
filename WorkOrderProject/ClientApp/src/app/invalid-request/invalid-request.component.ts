import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-invalid-request',
  templateUrl: './invalid-request.component.html',
  styleUrls: ['./invalid-request.component.css']
})
export class InvalidRequestComponent {
  constructor(private route: ActivatedRoute, private location: Location) { }

  /**
   * This method creates a simple route to the previous page
  */
  goBack(): void {
    this.location.back();
  }
}
