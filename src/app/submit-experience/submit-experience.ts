import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { PostService, Post } from '../service/post';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'submit-experience',
  styleUrls: ['submit-experience.css'],
  templateUrl: 'submit-experience.html',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
})
export class SubmitExperienceComponent {
  title = '';
  category = '';
  body = '';

  constructor(private postService: PostService) {}

  submitExperience(form: any) {
  if (form.invalid) {
    Object.values(form.controls).forEach((control: any) => {
      control.markAsTouched(); // Mostra errori se i campi non sono compilati
    });
    return;
  }

  const post: Post = {
    id: 0,
    title: this.title,
    category: this.category,
    body: this.body,
    author: 'User',
  };

  this.postService.createPost(post).subscribe({
    next: (res) => {
      console.log('✅ Post inviato:', res);
      this.title = '';
      this.category = '';
      this.body = '';
      form.resetForm(); // Pulisce anche lo stato del form
    },
    error: (err: any) => console.error('❌ Errore:', err),
  });

  }
}
