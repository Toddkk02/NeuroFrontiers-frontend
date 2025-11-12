
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
        this.posts = data.slice(0, 10);
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Errore nel caricamento';
        this.loading = false;
        console.error(err);
      },
    });
  }

  deletePost(id: number){
    if(confirm("do you really want to delete this post?")) {
      this.postService.deletePost(id).subscribe({
        next: () => {
      this.posts = this.posts.filter(p => p.id !== id)
      },
    });
  }

}
}
