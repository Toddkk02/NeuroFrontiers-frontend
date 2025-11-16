import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../../service/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explore.html',
  styleUrls: ['./explore.css'],
})
export class Explore implements OnInit {
  posts: Post[] = [];
  loading = true;
  error = '';

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getAllPost().subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error loading posts';
        this.loading = false;
        console.error(err);
      },
    });
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  deletePost(id: number) {
    if (confirm("Do you really want to delete this post?")) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.posts = this.posts.filter(p => p.id !== id);
          console.log('✅ Post deleted');
        },
        error: (err) => {
          console.error('❌ Delete error:', err);
          alert('Failed to delete post');
        }
      });
    }
  }

  // ✅ Helper per formattare la data (opzionale)
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
