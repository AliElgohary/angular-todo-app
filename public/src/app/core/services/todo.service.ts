import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoApi = 'http://localhost:4000/todos';

  constructor(private http: HttpClient) {}

  getTodos(username: string, password: Number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    console.log(this.todoApi);
    return this.http.get(this.todoApi, { headers });
  }
  postTodo(task: string, username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    const body = {
      task: task,
    };

    return this.http.post(this.todoApi, body, { headers });
  }

  updateTodoStatus(
    todoId: number,
    completed: boolean,
    username: string,
    password: string
  ): Observable<any> {
    const url = `${this.todoApi}/${todoId}`;
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    const body = {
      completed: completed,
    };

    return this.http.put(url, body, { headers });
  }
  deleteTodo(
    todoId: number,
    username: string,
    password: string
  ): Observable<any> {
    const url = `${this.todoApi}/${todoId}`;
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    return this.http.delete(url, { headers });
  }
}
