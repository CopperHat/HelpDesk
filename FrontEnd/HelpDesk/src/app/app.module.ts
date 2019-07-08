import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EquipmentComponent } from './pages/equipment/equipment.component';
import { EquipmentEdicionComponent } from './pages/equipment/equipment-edicion/equipment-edicion.component';
import { ProblemComponent } from './pages/problem/problem.component';
import { ProblemEdicionComponent } from './pages/problem/problem-edicion/problem-edicion.component';
import { SolutionComponent } from './pages/solution/solution.component';
import { SolutionEdicionComponent } from './pages/solution/solution-edicion/solution-edicion.component';
import { StaffComponent } from './pages/staff/staff.component';
import { StaffEdicionComponent } from './pages/staff/staff-edicion/staff-edicion.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { TicketEdicionComponent } from './pages/ticket/ticket-edicion/ticket-edicion.component';
import { UserComponent } from './pages/user/user.component';
import { UserEdicionComponent } from './pages/user/user-edicion/user-edicion.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    EquipmentComponent,
    EquipmentEdicionComponent,
    ProblemComponent,
    ProblemEdicionComponent,
    SolutionComponent,
    SolutionEdicionComponent,
    StaffComponent,
    StaffEdicionComponent,
    TicketComponent,
    TicketEdicionComponent,
    UserComponent,
    UserEdicionComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
