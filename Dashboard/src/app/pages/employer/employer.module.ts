import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import {EmployerComponent} from "./employer.component";
import {UserDialogComponent} from "./user-dialog/user-dialog.component";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {EmployerData} from "./employer.data";


export const routes = [
  { path: '', component: EmployerComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(EmployerData, { delay: 500 }),
    NgxPaginationModule,
    SharedModule,
    PipesModule
  ],
  declarations: [
    EmployerComponent,
    UserDialogComponent
  ],
  entryComponents:[
    UserDialogComponent
  ]
})
export class EmployerModule { }
