import { Component, Input } from 'angular2/core';
import { VisibilityFilterActions } from '../actions/visibility-filter.actions';

@Component({
  selector: 'filter-link',
  template: `
    <a href="#"
      [ngClass]="filter===currentFilter ? 'active' : 'inactive'"
      (click)="applyFilter()">
      <ng-content></ng-content>({{count || 0}})
    </a>
    `
})
export class FilterLink {

  @Input() filter: string;
  @Input() currentFilter: string;
  @Input() count: number;

  constructor(
    private visibilityFilterActions: VisibilityFilterActions
  ) {}

  private applyFilter() {
    this.visibilityFilterActions.setVisibilityFilter(this.filter);
    return false;
  }
}
