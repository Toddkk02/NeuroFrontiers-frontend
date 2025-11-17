import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService, Post } from '../../service/post';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './explore.html',
  styleUrls: ['./explore.css'],
})
export class Explore implements OnInit {
  posts: Post[] = [];
  loading = true;
  error = '';

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getAllPost().subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        this.loading = false;
        console.log('✅ Posts loaded:', data);
      },
      error: (err: any) => {
        this.error = 'Error loading posts';
        this.loading = false;
        console.error('❌ Error:', err);
      },
    });
  }

  openPost(id: number) {
    console.log('Opening post:', id);
    this.router.navigate(['/post', id]);
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  deletePost(id: number, event: Event) {
    event.stopPropagation();

    if (!confirm("Delete this post?")) return;

    this.postService.deletePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter(p => p.id !== id);
        console.log('✅ Post deleted');
      },
      error: (err: any) => {
        console.error('❌ Delete error:', err);
        alert('Failed to delete post');
      }
    });
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  formatDate(timestamp: string | undefined): string {
    if (!timestamp) return 'Unknown date';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}

