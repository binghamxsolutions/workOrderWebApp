import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  constructor(private route: ActivatedRoute, private location: Location) { }

  /**
   * This method creates a simple route to the previous page
  */
  goBack(): void {
    this.location.back();
  }
}
