import { Component, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

const STORAGE_KEY = 'angular-todos';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Todo App');

  todos = signal<Todo[]>(this.loadTodos());
  newTodoText = signal('');
  filter = signal<Filter>('all');
  private nextId = this.getNextId();

  remainingCount = computed(() =>
    this.todos().filter(todo => !todo.completed).length
  );

  filteredTodos = computed(() => {
    const todos = this.todos();
    switch (this.filter()) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  });

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos()));
    });
  }

  private loadTodos(): Todo[] {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  private getNextId(): number {
    const todos = this.loadTodos();
    return todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  }

  addTodo() {
    const text = this.newTodoText().trim();
    if (text) {
      this.todos.update(currentTodos => [
        ...currentTodos,
        { id: this.nextId++, text, completed: false }
      ]);
      this.newTodoText.set('');
    }
  }

  deleteTodo(id: number) {
    this.todos.update(currentTodos =>
      currentTodos.filter(todo => todo.id !== id)
    );
  }

  toggleTodo(id: number) {
    this.todos.update(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  setFilter(f: Filter) {
    this.filter.set(f);
  }
}