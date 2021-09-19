import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';
import { Repo } from './repo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<User> {
    const url = `https://api.github.com/users/${username}`;
    const options = {
      headers: { Authorization: `token ${environment.gitApiKey}` },
    };
    return this.http
      .get<User>(url, options)
      .pipe(catchError((err) => this.handleError<User>(err)));
  }

  getRepos(username: string, pageNumber: number): Observable<Repo[]> {
    const url = `https://api.github.com/users/${username}/repos?per_page=10;page=${pageNumber}`;
    const options = {
      headers: {
        Authorization: `token ${environment.gitApiKey}`,
        Accept: 'application/vnd.github.mercy-preview+json',
      },
    };
    return this.http
      .get<Repo[]>(url, options)
      .pipe(catchError((err) => this.handleError<Repo[]>(err)));
  }

  private handleError<T>(err: any, response?: T): Observable<T> {
    console.error(err.error.message, err);
    return of(response as T);
  }
}
