
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  username = '';
  password = '';
  birthdate = '';
  error = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const data = { username: this.username, password: this.password, birthdate: this.birthdate };
    this.http.post('http://localhost:3000/api/register', data).subscribe({
      next: (res: any) => {
        this.message = 'Registration successful!';
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: (err) => {
        this.error = err.error?.error || 'Registration failed';
      }
    });
  }
}

