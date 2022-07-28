import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';


const routes: Routes = [
  {path:'' , component : HomeComponent}
];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  exports: [RouterModule],
  declarations: [HomeComponent]
})
export class HomeModule { }
