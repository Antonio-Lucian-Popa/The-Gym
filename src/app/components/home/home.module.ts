import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InfoModalComponent } from './info-modal/info-modal.component';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddUserComponent,
    InfoModalComponent,
    EditUserModalComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [ MatDatepickerModule]
})
export class HomeModule { }
