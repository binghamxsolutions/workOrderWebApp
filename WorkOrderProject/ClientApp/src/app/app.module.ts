import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WorkOrdersComponent } from './work-orders/work-orders.component';
import { WorkOrderDetailComponent } from './work-order-detail/work-order-detail.component';
import { TechniciansComponent } from './technicians/technicians.component';
import { TechnicianDetailComponent } from './technician-detail/technician-detail.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
//list of components needed for site routing purposes


@NgModule({
  declarations: [
    AppComponent,
    WorkOrdersComponent,
    TechniciansComponent,
    TechnicianDetailComponent,
    WorkOrderDetailComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: WelcomeComponent, pathMatch: 'full' },
      { path: 'orders', component: WorkOrdersComponent },
      { path: 'techs', component: TechniciansComponent },
      { path: 'techs/tech/:id', component: TechnicianDetailComponent },
      { path: 'orders/order/:id', component: WorkOrderDetailComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: '404', component: PageNotFoundComponent },
      { path: '**', redirectTo: '404'}
    ]) //routing paths for their respective components. read as: path: <url-slug>, component: [ComponentName]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//compiles and exports all the necessary components for the app to aid with routing and functionality 
