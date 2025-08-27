import { Component, inject, OnInit } from '@angular/core';
import { ColumnConfig, TableAction, TableProps } from '../../core/@types/List';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styles: ``,
})
export class ListComponent<T> implements OnInit {
  public title!: string;
  public tableItems: T[] = [];
  public tableColumns: ColumnConfig<T>[] = [];
  public tableActions?: TableAction[] = [];

  private route = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const table = data['table'] as TableProps<T>;
      this.title = table.title;
      this.tableActions = table.actions;
      this.tableColumns = table.columns;
      this.tableItems = table.items;
    });
  }
}
