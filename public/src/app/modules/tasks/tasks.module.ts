import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { AngularMatModule } from 'src/app/shared/ui/angular-mat/angular-mat.module';



@NgModule({
  declarations: [
    AllTasksComponent,
    
  ],
  imports: [
    CommonModule,
    TasksRoutingModule, 
    AngularMatModule,
  ]
})
export class TasksModule { }
