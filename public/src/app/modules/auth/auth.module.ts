import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users.service';

// angular materials

import { AngularMatModule } from 'src/app/shared/ui/angular-mat/angular-mat.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMatModule
  ],
  providers: [UsersService]
  
})
export class AuthModule {}
