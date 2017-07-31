import {NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { LoginComponent } from './login/login.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CompanyProfileEditComponent } from './company-profile/company-profile-edit/company-profile-edit.component';
import { CompanyProfileDetailComponent } from './company-profile/company-profile-detail/company-profile-detail.component';
import { CompanyProfileListComponent } from './company-profile/company-profile-list/company-profile-list.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { AtmComponent } from './atm/atm.component';
import { AtmEditComponent } from './atm/atm-edit/atm-edit.component';
import { AtmListComponent } from './atm/atm-list/atm-list.component';
import { AtmDetailComponent } from './atm/atm-detail/atm-detail.component';
import { DispatchTicketComponent } from './dispatch-ticket/dispatch-ticket.component';
import { DispatchTicketDetailComponent } from './dispatch-ticket/dispatch-ticket-detail/dispatch-ticket-detail.component';
import { DispatchTicketEditComponent } from './dispatch-ticket/dispatch-ticket-edit/dispatch-ticket-edit.component';
import { DispatchTicketListComponent } from './dispatch-ticket/dispatch-ticket-list/dispatch-ticket-list.component';
import { TechnicianTicketComponent } from './technician-ticket/technician-ticket.component';
import { TechnicianTicketListComponent } from './technician-ticket/technician-ticket-list/technician-ticket-list.component';
import { TechnicianTicketEditComponent } from './technician-ticket/technician-ticket-edit/technician-ticket-edit.component';
import { TechnicianTicketDetailComponent } from './technician-ticket/technician-ticket-detail/technician-ticket-detail.component';
import { PartInventoryComponent } from './part-inventory/part-inventory.component';
import { PartInventoryDetailComponent } from './part-inventory/part-inventory-detail/part-inventory-detail.component';
import { PartInventoryEditComponent } from './part-inventory/part-inventory-edit/part-inventory-edit.component';
import { PartInventoryListComponent } from './part-inventory/part-inventory-list/part-inventory-list.component';
import { TresuryComponent } from './tresury/tresury.component';
import { TresuryListComponent } from './tresury/tresury-list/tresury-list.component';
import { TresuryEditComponent } from './tresury/tresury-edit/tresury-edit.component';
import { TresuryDetailComponent } from './tresury/tresury-detail/tresury-detail.component';


const appRoutes : Routes = [
	{path: '',redirectTo:'/login', pathMatch:'full'},
	{path: 'login', component: LoginComponent},
	{path: 'company-profile', component: CompanyProfileComponent, children:[
		{path: 'new', component: CompanyProfileEditComponent},
		{path: ':id', component: CompanyProfileDetailComponent },
		{path: ':id/edit', component: CompanyProfileEditComponent}

	]},
	{path: 'user', component: UserComponent, children:[
		{path: '', component: UserComponent },		
		{path: 'new', component: UserEditComponent},
		{path: ':id', component: UserDetailComponent },
		{path: ':id/edit', component: UserEditComponent}

	]},
	{path: 'atm', component: AtmComponent, children:[
		{path: '', component: AtmComponent },	
		{path: 'new', component: AtmEditComponent},
		{path: ':id', component: AtmDetailComponent },
		{path: ':id/edit', component: AtmEditComponent}

	]}
];

@NgModule({
	imports : [RouterModule.forRoot(appRoutes)],
	exports : [RouterModule]
})
export class AppRoutingModule{

}