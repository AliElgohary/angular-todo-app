import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/core/services/todo.service';
import { Todo } from 'src/models/task.model';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss'],
})
export class AllTasksComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService
  ) {}

  displayedColumns: string[] = ['id', 'task', 'completed', 'actions'];
  dataSource: Todo[] = [];
  
  taskForm: {
    task: string;
  } = {
    task: '',
  };
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const username = params['username'];
      const password = params['password'];

      this.todoService
        .getTodos(username, password)
        .subscribe((tasks: Todo[]) => {
          this.dataSource = tasks;
        });
    });
  }
  
  
  addTask(task: string): void {
    const username = this.activatedRoute.snapshot.queryParams['username'];
    const password = this.activatedRoute.snapshot.queryParams['password'];

    this.todoService.postTodo(task, username, password).subscribe(() => {
      this.reloadTaskList();
      this.taskForm.task = '';
    });
  }

  updateTask(task: Todo): void {
    const username = this.activatedRoute.snapshot.queryParams['username'];
    const password = this.activatedRoute.snapshot.queryParams['password'];
    if (task.completed) {
      this.todoService
        .updateTodoStatus(task.id, false, username, password)
        .subscribe(() => {
          this.reloadTaskList();
        });
    } else {
      this.todoService
        .updateTodoStatus(task.id, true, username, password)
        .subscribe(() => {
          this.reloadTaskList();
        });
    }
  }

  deleteTask(taskId: number): void {
    const username = this.activatedRoute.snapshot.queryParams['username'];
    const password = this.activatedRoute.snapshot.queryParams['password'];
    this.todoService.deleteTodo(taskId, username, password).subscribe(() => {
      this.reloadTaskList();
    });
  }

  private reloadTaskList(): void {
    const username = this.activatedRoute.snapshot.queryParams['username'];
    const userId = this.activatedRoute.snapshot.queryParams['password'];

    this.todoService.getTodos(username, userId).subscribe((tasks: Todo[]) => {
      this.dataSource = tasks;
    });
  }
}
