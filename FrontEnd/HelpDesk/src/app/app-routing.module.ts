import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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


const routes: Routes = [
  {path: 'equipment', component: EquipmentComponent, children: [
    {path: 'nuevo', component: EquipmentEdicionComponent},
    {path: 'edicion/:id', component: EquipmentEdicionComponent}
  ]},
  {path: 'problem', component: ProblemComponent, children: [
    {path: 'nuevo', component: ProblemEdicionComponent},
    {path: 'edicion/:id', component: ProblemEdicionComponent}
  ]},
  {path: 'solution', component: SolutionComponent, children: [
    {path: 'nuevo', component: SolutionEdicionComponent},
    {path: 'edicion/:id', component: SolutionEdicionComponent}
  ]},
  {path: 'staff', component: StaffComponent, children: [
    {path: 'nuevo', component: StaffEdicionComponent},
    {path: 'edicion/:id', component: StaffEdicionComponent}
  ]},
  {path: 'ticket', component: TicketComponent, children: [
    {path: 'nuevo', component: TicketEdicionComponent},
    {path: 'edicion/:id', component: TicketEdicionComponent}
  ]},
  {path: 'user', component: UserComponent, children: [
    {path: 'nuevo', component: UserEdicionComponent},
    {path: 'edicion/:id', component: UserEdicionComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
