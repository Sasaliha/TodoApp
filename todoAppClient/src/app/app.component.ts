import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: TodoModel[] = [];
  todo: TodoModel[] = [];
  done: TodoModel[] = [];
  addingTask: boolean = false;
  selectedTask: TodoModel | null = null;
  newTask: string = "";
  updateModel: TodoModel = new TodoModel();


  constructor(private http: HttpClient,
    private toastr: ToastrService) {
    this.getAll();
  }



  getAll() {
    this.http.get<TodoModel[]>("https://localhost:7247/api/Todos/GetAll")
      .subscribe(res => {
        this.todos = res;
        this.splitTodosToTodoAndDone();
      });
  }

  splitTodosToTodoAndDone() {
    this.todo = this.todos.filter(t => !t.isCompleted);
    this.done = this.todos.filter(t => t.isCompleted);
  }

  changeCompleted(id: number) {
    this.http.get<TodoModel[]>(`https://localhost:7247/api/Todos/ChangeCompleted/${id}`)
      .subscribe(res => {
        this.todos = res;
        this.getAll();
      });
  }

  // Ekleme işlevi



  addTask() {
    const newTaskContent = this.newTask.trim();// Yeni görevin içeriğini aldık

    if (newTaskContent === '') {
      this.toastr.error("Task cannot be added empty!")
    } else {

      const newTodo: TodoModel = {
        id: 0, // Bu alanın değeri önemsiz, sunucu tarafında atanacak
        work: newTaskContent,
        isCompleted: false
      };

      this.http.post<TodoModel>(`https://localhost:7247/api/Todos/AddTask`, newTodo)
        .subscribe(res => {
          this.getAll();
          this.newTask = ''; // Ekleme işleminden sonra girdiyi temizledik
        });
    }
  }

  
  removeTask(id: number) {
    this.http.get<TodoModel[]>(`https://localhost:7247/api/Todos/RemoveTask/${id}`)
      .subscribe(res => {
        this.todos = res;
        this.getAll();
      })
  }

  // Güncelleme işlevi
  updateTask() {

    if (!this.selectedTask) {
      return; // Düzenleme yapılacak görev seçilmemişse işlemi iptal et
    }
  
    const updatedTask: TodoModel = {
      id: this.selectedTask.id,
      work: this.selectedTask.work,
      isCompleted: this.selectedTask.isCompleted
    };
       this.http.post<TodoModel[]>(`https://localhost:7247/api/Todos/Update`, updatedTask)
      .subscribe(res => {
        this.getAll();
        this.selectedTask = null;
      });
  }
  
  editTask(task: TodoModel) {
    this.selectedTask = task;
  }

  cancelEdit() {
    this.selectedTask = null;
    this.getAll();
  }



  drop1(event: CdkDragDrop<TodoModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const id = this.done[event.previousIndex].id;
      this.changeCompleted(id);
    }
  }

  drop2(event: CdkDragDrop<TodoModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const id = this.todo[event.previousIndex].id;
      this.changeCompleted(id);
    }
  }

  markAsTodo(id: number) {
    this.changeCompleted(id);
  }

  markAsDone(id: number) {
    this.changeCompleted(id);
  }

}

export class TodoModel {
  id: number = 0;
  work: string = "";
  isCompleted: boolean = false;
}
