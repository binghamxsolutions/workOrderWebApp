import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WorkOrdersComponent } from './work-orders/work-orders.component';
import { WorkOrderDetailComponent } from './work-order-detail/work-order-detail.component';
import { TechniciansComponent } from './technicians/technicians.component';
import { TechnicianDetailComponent } from './technician-detail/technician-detail.component';
import { InvalidRequestComponent } from './invalid-request/invalid-request.component';
//list of components needed for site routing purposes


@NgModule({
  declarations: [
    AppComponent,
    WorkOrdersComponent,
    TechniciansComponent,
    TechnicianDetailComponent,
    WorkOrderDetailComponent,
    InvalidRequestComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: WorkOrdersComponent, pathMatch: 'full' },
      { path: 'orders', component: WorkOrdersComponent },
      { path: 'techs', component: TechniciansComponent },
      { path: 'tech/:id', component: TechnicianDetailComponent },
      { path: 'order/:id', component: WorkOrderDetailComponent },
      { path: '404', component: InvalidRequestComponent },
      { path: '**', redirectTo: '404'}
    ]) //routing paths for their respective components. read as: path: <url-slug>, component: [ComponentName]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//compiles and exports all the necessary components for the app to aid with routing and functionality 
