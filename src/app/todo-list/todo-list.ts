import { Component,EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  @Input() todoList: string[] = [];

  @Output() todoDeleted = new EventEmitter<number>();

  delete(index: number)
  {
    this.todoDeleted.emit(index);
  }
}
