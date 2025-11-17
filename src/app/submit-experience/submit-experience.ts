import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';  // ← AGGIUNGI
import { FormsModule } from '@angular/forms';
import { PostService, Post } from '../service/post';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'submit-experience',
  styleUrls: ['submit-experience.css'],
  templateUrl: 'submit-experience.html',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
})
export class SubmitExperienceComponent {
  title = '';
  category = '';
  body = '';
  error = '';
  success = '';

  // ✅ Opzionale: definisci le categorie in un array
categories = [
  { value: 'Psychedelics', label: '🍄 Psychedelics' },
  { value: 'Dissociatives', label: '🌀 Dissociatives' },
  { value: 'Combo', label: '🔀 Combo' },
  { value: 'Meditation', label: '🧘 Meditation' },
  { value: 'Oneiric', label: '💤 Oneiric (Dreams)' },
  { value: 'Stimulants', label: '⚡ Stimulants' },
  { value: 'Depressants', label: '😴 Depressants' },
  { value: 'Entactogens', label: '💗 Entactogens' },
  { value: 'Cannabinoids', label: '🌿 Cannabinoids' },
  { value: 'Deliriants', label: '🌫️ Deliriants' },
  { value: 'Other', label: '❓ Other' }
];
  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  submitExperience(form: any) {
    // Verifica login
    if (!localStorage.getItem('token')) {
      this.error = 'You must be logged in to submit a post';
      setTimeout(() => this.router.navigate(['/login']), 2000);
      return;
    }

    if (form.invalid) {
      Object.values(form.controls).forEach((control: any) => {
        control.markAsTouched();
      });
      return;
    }

    const post: Post = {
      id: 0,
      title: this.title,
      category: this.category,
      body: this.body,
      author: '',
    };

    this.postService.createPost(post).subscribe({
      next: (res) => {
        console.log('✅ Post created:', res);
        this.success = 'Post submitted successfully!';
        this.title = '';
        this.category = '';
        this.body = '';
        this.error = '';
        form.resetForm();

        setTimeout(() => {
          this.router.navigate(['/explore']);
        }, 1500);
      },
      error: (err: any) => {
        console.error('❌ Error:', err);
        if (err.status === 401) {
          this.error = 'Session expired. Please login again.';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        } else {
          this.error = err.error?.error || 'Failed to submit post';
        }
        this.success = '';
      },
    });
  }
}
