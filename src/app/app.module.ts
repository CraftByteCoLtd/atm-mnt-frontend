import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule} from './app-routing.module';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    CompanyProfileComponent,
    CompanyProfileEditComponent,
    CompanyProfileDetailComponent,
    CompanyProfileListComponent,
    UserComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    AtmComponent,
    AtmEditComponent,
    AtmListComponent,
    AtmDetailComponent,
    DispatchTicketComponent,
    DispatchTicketDetailComponent,
    DispatchTicketEditComponent,
    DispatchTicketListComponent,
    TechnicianTicketComponent,
    TechnicianTicketListComponent,
    TechnicianTicketEditComponent,
    TechnicianTicketDetailComponent,
    PartInventoryComponent,
    PartInventoryDetailComponent,
    PartInventoryEditComponent,
    PartInventoryListComponent,
    TresuryComponent,
    TresuryListComponent,
    TresuryEditComponent,
    TresuryDetailComponent,
  ],
  imports: [
     BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
