import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthGuardService } from './core/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'tasks',
    loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule),
    canActivate: [AuthGuardService] 
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
