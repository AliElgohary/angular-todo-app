import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  success = '';
  error = '';
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private _userService: UsersService,
    private _router: Router
  ) {}

  users: User[] = [];
  getUsers(): void {
    this._userService.getUser().subscribe((users) => {
      this.users = users;
    });
  }

  ngOnInit(): void {
    this.generateForm();
    this.getUsers();
  }

  generateForm(): void {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const username = this.form.value.name;
      const password = this.form.value.password;

      this.authService.getTodosWithBasicAuth(username, password).subscribe({
        next: (res) => {
          const token = res.token;

          localStorage.setItem('token', token);

          const user = this.users.find((u) => u.username === username);
          if (user) {
            console.log(res);
            this.success = 'Logged in successfully!';
            console.log({ username: user.username, user_id: user.id });
            this._router.navigate(['/tasks'], {
              queryParams: { username: user.username, password: password },
            });
          } else {
            this.error = 'Login failed: User not found.';
          }
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Login failed!';
        },
        complete: () => {
          this.loading = false;
          this.error = '';
        },
      });
    }
  }
}
