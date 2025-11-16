import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
  this.http.post('http://localhost:3000/api/login', {
    username: this.username,
    password: this.password
  }).subscribe({
    next: (res: any) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.user.username);  // ✅ res.user.username
      localStorage.setItem('role', res.user.role);          // ✅ res.user.role

      console.log('✅ Logged in as:', res.user);
      this.router.navigate(['/home']);
    },
    error: (err) => {
      this.error = err.error.error || 'Login failed';
    }
  });
}
}
