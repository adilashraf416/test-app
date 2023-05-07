import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../users/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  baseUrl: string = environment.apiUrl;
  users: IUser[] = [];

  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  setUsers() {
    this.fetchUsers().subscribe((response) => {
      this.users = response.map((el) => {
        return {
          avatarUrl: el.avatar_url,
          username: el.login,
          name: el.login,
          id: el.id,
        };
      });
    });
  }

  fetchUser(id: string): Observable<any> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.get<any>(url);
  }

  getUserById(id: number): IUser | any {
    return this.users.find((user: IUser) => user.id === id);
  }
}
