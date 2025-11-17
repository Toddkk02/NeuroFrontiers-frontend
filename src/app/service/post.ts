import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  id: number;
  user_id?: number;
  title: string;
  body: string;
  category?: string;
  author: string;
  created_at?: string;
  likes?: number;
  views?: number;
  comment_count?: number;
}

export interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  author: string;
  body: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllPost(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post, {
      headers: this.getAuthHeaders()
    });
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  toggleLike(postId: number): Observable<{ liked: boolean; likes: number }> {
    return this.http.post<{ liked: boolean; likes: number }>(
      `${this.apiUrl}/${postId}/like`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  checkIfLiked(postId: number): Observable<{ liked: boolean }> {
    return this.http.get<{ liked: boolean }>(
      `${this.apiUrl}/${postId}/liked`,
      { headers: this.getAuthHeaders() }
    );
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${postId}/comments`);
  }

  addComment(postId: number, body: string): Observable<Comment> {
    return this.http.post<Comment>(
      `${this.apiUrl}/${postId}/comments`,
      { body },
      { headers: this.getAuthHeaders() }
    );
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(
      `http://localhost:3000/api/comments/${commentId}`,
      { headers: this.getAuthHeaders() }
    );
  }
}

