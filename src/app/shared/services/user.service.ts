import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUser } from '../interfaces/createUser';
import { EditUser } from '../interfaces/editUser';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USER_URL = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  createUser(createUser: CreateUser): Observable<void> {
   return this.http.post<void>(`${this.USER_URL}/create`, createUser);
  }

  findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.USER_URL}/findAll`);
  }

  editUser(user: EditUser, newSubscription?: boolean): Observable<void> {
    return this.http.put<void>(`${this.USER_URL}/edit${newSubscription ? '?isNewSubscription=' + newSubscription : ''}`, user);
  }

  removeUser(userIds: string[]): Observable<void> {
    return this.http.put<void>(`${this.USER_URL}/remove`, userIds);
  }
}
