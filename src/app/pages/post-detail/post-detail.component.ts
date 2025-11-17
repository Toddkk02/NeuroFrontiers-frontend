import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PostService, Post, Comment } from '../../service/post';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  comments: Comment[] = [];
  newComment = '';
  loading = true;
  error = '';
  liked = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPost(parseInt(id));
      this.loadComments(parseInt(id));
      this.checkIfLiked(parseInt(id));
    }
  }

  loadPost(id: number) {
    this.postService.getPostById(id).subscribe({
      next: (data: Post) => {
        this.post = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'Post not found';
        this.loading = false;
      }
    });
  }

  loadComments(id: number) {
    this.postService.getComments(id).subscribe({
      next: (data: Comment[]) => {
        this.comments = data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  checkIfLiked(id: number) {
    if (!this.isLoggedIn()) return;
    
    this.postService.checkIfLiked(id).subscribe({
      next: (data: { liked: boolean }) => {
        this.liked = data.liked;
      },
      error: () => {}
    });
  }

  toggleLike() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    if (!this.post) return;

    this.postService.toggleLike(this.post.id).subscribe({
      next: (data: { liked: boolean; likes: number }) => {
        this.liked = data.liked;
        if (this.post) this.post.likes = data.likes;
      },
      error: (err: any) => console.error(err)
    });
  }

  addComment() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    if (!this.post || !this.newComment.trim()) return;

    this.postService.addComment(this.post.id, this.newComment).subscribe({
      next: (comment: Comment) => {
        this.comments.unshift(comment);
        this.newComment = '';
        if (this.post) this.post.comment_count = (this.post.comment_count || 0) + 1;
      },
      error: () => alert('Failed to add comment')
    });
  }

  deleteComment(commentId: number) {
    if (!confirm('Delete this comment?')) return;

    this.postService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(c => c.id !== commentId);
        if (this.post) this.post.comment_count = (this.post.comment_count || 1) - 1;
      },
      error: () => alert('Failed to delete comment')
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  canDeleteComment(comment: Comment): boolean {
    return this.isAdmin() || comment.author === this.getUsername();
  }

  goBack() {
    this.router.navigate(['/explore']);
  }

  formatDate(timestamp: string | undefined): string {
    if (!timestamp) return 'Unknown date';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
