import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';

import * as _ from "lodash";
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { JwtModule,JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './_guards/index';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { AtmService } from './_services/atm.service';
import { CurrentUserService } from './_services/current-user.service'
import { TechnicianTicketService } from './_services/technician-ticket.service'




import { AppConfigService } from './_services/app-config.service'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule} from './app-routing.module';
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
import { DispatchTicketComponent } from './cmp-dispatch-ticket/dispatch-ticket.component';
import { DispatchTicketDetailComponent } from './cmp-dispatch-ticket/dispatch-ticket-detail/dispatch-ticket-detail.component';
import { DispatchTicketEditComponent } from './cmp-dispatch-ticket/dispatch-ticket-edit/dispatch-ticket-edit.component';
import { DispatchTicketListComponent } from './cmp-dispatch-ticket/dispatch-ticket-list/dispatch-ticket-list.component';
import { TechnicianTicketComponent } from './cmp-technician-ticket/technician-ticket.component';
import { TechnicianTicketListComponent } from './cmp-technician-ticket/technician-ticket-list/technician-ticket-list.component';
import { TechnicianTicketEditComponent } from './cmp-technician-ticket/technician-ticket-edit/technician-ticket-edit.component';
import { TechnicianTicketDetailComponent } from './cmp-technician-ticket/technician-ticket-detail/technician-ticket-detail.component';
import { PartInventoryComponent } from './cmp-part-inventory/part-inventory.component';
import { PartInventoryDetailComponent } from './cmp-part-inventory/part-inventory-detail/part-inventory-detail.component';
import { PartInventoryEditComponent } from './cmp-part-inventory/part-inventory-edit/part-inventory-edit.component';
import { PartInventoryListComponent } from './cmp-part-inventory/part-inventory-list/part-inventory-list.component';
import { TresuryComponent } from './cmp-tresury/tresury.component';
import { TresuryListComponent } from './cmp-tresury/tresury-list/tresury-list.component';
import { TresuryEditComponent } from './cmp-tresury/tresury-edit/tresury-edit.component';
import { TresuryDetailComponent } from './cmp-tresury/tresury-detail/tresury-detail.component';
import { FooterComponent } from './footer/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MyDispatchTicketComponent } from './cmp-dispatch-ticket/my-dispatch-ticket/my-dispatch-ticket.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserItemComponent } from './cmp-user/user-item/user-item.component';
import { AtmItemComponent } from './cmp-atm/atm-item/atm-item.component';
import { MapWithMarkerComponent } from './cmp-atm/map-with-marker/map-with-marker.component';
import { TechnicianTicketItemComponent } from './cmp-technician-ticket/technician-ticket-item/technician-ticket-item.component';


export function jwtOptionsFactory() {
  return {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['127.0.0.1:3000','10.128.0.2:3000','130.211.135.58:3000'],
        authScheme:'Bearer ',
        throwNoTokenError: true,
        skipWhenExpired: true
      }
}
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
    FooterComponent,
    HomeComponent,
    MyDispatchTicketComponent,
    PageNotFoundComponent,
    UserItemComponent,
    AtmItemComponent,
    MapWithMarkerComponent,
    TechnicianTicketItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgxDatatableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBn9SD4FNh0lXNepclv6968CmXrow_hF1s'
    }),
    AppRoutingModule,NgbModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
     jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    })
  ],
  providers: [
      AuthGuard, AuthenticationService, AppConfigService,
      UserService, CurrentUserService, AtmService, TechnicianTicketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
