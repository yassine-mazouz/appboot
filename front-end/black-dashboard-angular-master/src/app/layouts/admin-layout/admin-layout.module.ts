import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {UserComponent} from "../../pages/user/user.component";
import {UseraddComponent} from "../../pages/user/useradd.component";
import {DataTablesModule} from "angular-datatables";
import {UserupdateComponent} from "../../pages/user/userupdate.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {LocationaddComponent} from "../../pages/map/locationadd/locationadd.component";
import {LocationupdateComponent} from "../../pages/map/locationupdate/locationupdate.component";
import {CategoriesComponent} from "../../pages/categories/categories.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        DataTablesModule,
        ReactiveFormsModule,
        MatFormFieldModule,
    ],
  declarations: [
    DashboardComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
    UserComponent,
    UseraddComponent,
    UserupdateComponent,
    LocationaddComponent,
    LocationupdateComponent,
    CategoriesComponent


    // RtlComponent
  ]
})
export class AdminLayoutModule {}
