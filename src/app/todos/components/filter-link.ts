import { Component, Input } from 'angular2/core';
import { TodosActions } from '../actions/todos.actions';

@Component({
  selector: 'filter-link',
  template: `
    <a href="#"
      [ngClass]="active() ? 'active' : 'inactive'"
      (click)="applyFilter()">
      <ng-content></ng-content>
    </a>
    `
})
export class FilterLink {

  @Input() filter: string;

  constructor(
    private todosActions: TodosActions
  ) {}

  private active(): boolean {
    return this.filter === this.todosActions.getVisibilityFilter();
  }

  private applyFilter() {
    this.todosActions.setVisibilityFilter(this.filter);
    return false;
  }
}
