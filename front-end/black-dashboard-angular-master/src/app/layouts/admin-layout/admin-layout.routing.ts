import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import {UserComponent} from "../../pages/user/user.component";
import {UseraddComponent} from "../../pages/user/useradd.component";
import {UserupdateComponent} from "../../pages/user/userupdate.component";
import {LocationaddComponent} from "../../pages/map/locationadd/locationadd.component";
import {LocationupdateComponent} from "../../pages/map/locationupdate/locationupdate.component";
import {CategoriesComponent} from "../../pages/categories/categories.component";
import {CategoriesaddComponent} from "../../pages/categories/categoriesadd/categoriesadd.component";
import {CategoriesupdateComponent} from "../../pages/categories/categoriesupdate/categoriesupdate.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user", component: UserComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "useradd", component: UseraddComponent },
  { path: "userupdate", component: UserupdateComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  { path: "locationadd", component: LocationaddComponent },
  { path: "locationupdate", component: LocationupdateComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "categoriesadd", component: CategoriesaddComponent },
  { path: "categoriesupdate", component: CategoriesupdateComponent },
  // { path: "rtl", component: RtlComponent }

];
