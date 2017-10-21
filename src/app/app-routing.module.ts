import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './cmp-login/login.component';
import { CompanyProfileComponent } from './cmp-company-profile/company-profile.component';
import { CompanyProfileEditComponent } from './cmp-company-profile/company-profile-edit/company-profile-edit.component';
import { CompanyProfileDetailComponent } from './cmp-company-profile/company-profile-detail/company-profile-detail.component';
import { CompanyProfileListComponent } from './cmp-company-profile/company-profile-list/company-profile-list.component';
import { UserComponent } from './cmp-user/user.component';
import { UserListComponent } from './cmp-user/user-list/user-list.component';
import { UserDetailComponent } from './cmp-user/user-detail/user-detail.component';
import { UserEditComponent } from './cmp-user/user-edit/user-edit.component';
import { AtmComponent } from './cmp-atm/atm.component';
import { AtmEditComponent } from './cmp-atm/atm-edit/atm-edit.component';
import { AtmListComponent } from './cmp-atm/atm-list/atm-list.component';
import { AtmDetailComponent } from './cmp-atm/atm-detail/atm-detail.component';
import { AtmStartPageComponent } from './cmp-atm/atm-start-page/atm-start-page.component';
import { DispatchTicketComponent } from './cmp-dispatch-ticket/dispatch-ticket.component';
import { DispatchTicketDetailComponent } from './cmp-dispatch-ticket/dispatch-ticket-detail/dispatch-ticket-detail.component';
import { DispatchTicketEditComponent } from './cmp-dispatch-ticket/dispatch-ticket-edit/dispatch-ticket-edit.component';
import { DispatchTicketListComponent } from './cmp-dispatch-ticket/dispatch-ticket-list/dispatch-ticket-list.component';
import { MyDispatchTicketComponent } from './cmp-dispatch-ticket/my-dispatch-ticket/my-dispatch-ticket.component';
import { TechnicianTicketComponent } from './cmp-technician-ticket/technician-ticket.component';
import { TechnicianTicketListComponent } from './cmp-technician-ticket/technician-ticket-list/technician-ticket-list.component';
import { TechnicianTicketEditComponent } from './cmp-technician-ticket/technician-ticket-edit/technician-ticket-edit.component';
import { TechnicianTicketDetailComponent } from './cmp-technician-ticket/technician-ticket-detail/technician-ticket-detail.component';
import { PartInventoryComponent } from './cmp-part-inventory/part-inventory.component';
import { PartInventoryDetailComponent } from './cmp-part-inventory/part-inventory-detail/part-inventory-detail.component';
import { PartInventoryEditComponent } from './cmp-part-inventory/part-inventory-edit/part-inventory-edit.component';
import { PartInventoryListComponent } from './cmp-part-inventory/part-inventory-list/part-inventory-list.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VaulterComponent } from './cmp-vaulter/vaulter.component';
import { TreasuryComponent } from './cmp-treasury/treasury.component';
import { TreasuryListComponent } from './cmp-treasury/treasury-list/treasury-list.component';
import { TreasuryItemComponent } from './cmp-treasury/treasury-item/treasury-item.component';
import { TreasuryWithdrawComponent } from './cmp-treasury/treasury-withdraw/treasury-withdraw.component';
import { UploadCsvComponent } from './cmp-upload-csv/upload-csv.component';


import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
	{ path: '',redirectTo:'/login', pathMatch:'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
	{ path: 'company-profile', component: CompanyProfileComponent, children:[
		{ path: 'new', component: CompanyProfileEditComponent, canActivate:[AuthGuard]  },
		{ path: ':id', component: CompanyProfileDetailComponent, canActivate:[AuthGuard]  },
		{ path: ':id/edit', component: CompanyProfileEditComponent, canActivate:[AuthGuard]  }
	],canActivate: [AuthGuard] },
	{ path: 'user', component: UserComponent, children:[
		{ path: 'new', component: UserEditComponent },
		{ path: ':id', component: UserDetailComponent },
		{ path: ':id/edit', component: UserEditComponent }
	],canActivate: [AuthGuard]  },
	{ path: 'atm', component: AtmComponent, children:[
		{ path: 'start',component: AtmStartPageComponent},
		{ path: 'new', component: AtmEditComponent },
		{ path: ':id', component: AtmDetailComponent },
		{ path: ':id/edit', component: AtmEditComponent }
	],canActivate: [AuthGuard]  },
	{ path: 'my-dispatch-ticket', component: MyDispatchTicketComponent },
	{ path: 'dispatch-ticket', component: DispatchTicketComponent, children:[
		{ path: 'new', component: DispatchTicketEditComponent },
		{ path: ':id', component: DispatchTicketDetailComponent },
		{ path: ':id/edit', component: DispatchTicketEditComponent }
	],canActivate: [AuthGuard]  },
	{ path: 'technician-ticket', component: TechnicianTicketComponent, children:[
		{ path: 'new', component: TechnicianTicketEditComponent },
		{ path: ':id', component: TechnicianTicketDetailComponent },
		{ path: ':id/edit', component: TechnicianTicketEditComponent }
	],canActivate: [AuthGuard] },
	{ path: 'part-inventory', component: PartInventoryComponent, children:[
		{ path: 'new', component: PartInventoryEditComponent },
		{ path: ':id', component: PartInventoryDetailComponent },
		{ path: ':id/edit', component: PartInventoryEditComponent }
	],canActivate: [AuthGuard] },
	{ path: 'treasury', component: TreasuryComponent, children:[
		{ path: ':id/withdraw', component: TreasuryWithdrawComponent }
	],canActivate: [AuthGuard] },
	{ path: 'treasury-upload-csv', component: UploadCsvComponent,canActivate: [AuthGuard] },
	{ path: 'vaulter', component: VaulterComponent,canActivate: [AuthGuard] },
	{ path: 'page-not-found', component: PageNotFoundComponent },
	{ path: '**', redirectTo: '/page-not-found' }
];

@NgModule({
	imports : [ RouterModule.forRoot(appRoutes) ],
	exports : [ RouterModule ]
})
export class AppRoutingModule{

}
