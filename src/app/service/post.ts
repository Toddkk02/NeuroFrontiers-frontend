import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../pages/login/login';
export interface Post {
  id: number;
  userId?: number;
  title: string;
  body: string;
  category?: string;
  author: string;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  // ✅ Helper per creare headers con JWT
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

  // ✅ QUESTO È IL FIX - aggiungi headers
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post, {
      headers: this.getAuthHeaders()  // ← IMPORTANTE
    });
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()  // ← Anche qui per DELETE
    });
  }

}

