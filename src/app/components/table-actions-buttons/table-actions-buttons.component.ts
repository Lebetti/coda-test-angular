import { BaseColumnComponent, MiaTableConfig } from '@agencycoda/mia-table';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Client } from 'src/app/entities/client';

@Component({
  selector: 'app-table-actions-buttons',
  templateUrl: './table-actions-buttons.component.html',
  styleUrls: ['./table-actions-buttons.component.scss']
})
export class TableActionsButtonsComponent extends BaseColumnComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  editOrDeleteItem(item: Client, edit: boolean = true): void {
    edit ? this.config?.onClick.next({ key: 'edit-client', item }) : this.config?.onClick.next({ key: 'delete-client', item });
  }

}
