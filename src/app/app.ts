import { Component, signal } from '@angular/core';
import { AddItem } from './add-item/add-item';
import { TodoList } from './todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [AddItem,TodoList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-app');

  todos: string[]= [];

  addTodo(newTodo: string)
  {
    if(newTodo)
    {
      this.todos.push(newTodo);
    }
  }

  handleDeletedTodo(index: number)
  {
    this.todos.splice(index, 1);
  }


}
