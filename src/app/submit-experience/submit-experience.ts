import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { PostService, Post } from '../service/post';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'submit-experience',
  styleUrls: ['submit-experience.css'],
  templateUrl: 'submit-experience.html',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class SubmitExperienceComponent {
  title = '';
  category = '';
  body = '';

  constructor(private postService: PostService) {}

  submitExperience() {
    const post: Post = {
      id: 0,
      title: this.title,
      category: this.category,
      body: this.body,
      author: 'User',
    };
    this.postService.createPost(post).subscribe({
      next: (res) => {
        console.log('Post inviato:', res);
        this.title = '';
        this.category = '';
        this.body = '';
      },
      error: (err: any) => console.error(err),
    });
  }
}
