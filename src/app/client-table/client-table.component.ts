import { MiaFormConfig, MiaFormModalComponent, MiaFormModalConfig } from '@agencycoda/mia-form';
import { MiaTableComponent, MiaTableConfig } from '@agencycoda/mia-table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { DeleteDialogConfig } from '../components/delete-dialog/delete-dialog.config';
import { Client } from '../entities/client';
import { ClientService } from '../services/client.service';
import { CLIENT_FORM_FIELDS, CLIENT_FORM_FIELDS_ERROR_MESSAGES, CLIENT_TABLE_COLUMNS } from './client-table.config';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit {

  @ViewChild('miaTable', { static: true }) miaTable!: MiaTableComponent;
  tableConfig: MiaTableConfig = new MiaTableConfig();
  editFormConfig:MiaFormModalConfig = new MiaFormModalConfig();
  deleteFormConfig:DeleteDialogConfig = new DeleteDialogConfig();

  constructor(private _clientService: ClientService, private dialog: MatDialog) {
    this.initFormConfigs();
  }

  ngOnInit(): void {
    this.loadTableConfig();
  }

  displayDeleteFormAndRemoveItem(item:Client){
    this.deleteFormConfig.item=item;
		this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data:this.deleteFormConfig
    }).afterClosed().subscribe(
      (decision:boolean)=>{
        if(decision)
        {
          this.removeItem(item);
        }
      }
    )
    
  }

  determineAction({ key, item }: { key: string, item: Client }): void {
    if (key == 'edit-client') {
      this.displayFormAndSaveItem(item);
    }
    else if (key == 'delete-client') {
      this.displayDeleteFormAndRemoveItem(item);
    }
  }

  displayFormAndSaveItem(item?: Client) {
    this.displayEditForm(item).subscribe(
      (itemToSave:Client|undefined) => {
        if (itemToSave) {
          this.miaTable.loadItems();
        }
      })
  }

  displayEditForm(item?: Client) {
    this.editFormConfig.item = item?{...item} : new Client();
    return this.dialog.open(MiaFormModalComponent, {
      width: '520px',
      panelClass: 'modal-full-width-mobile',
      data: this.editFormConfig
    }).afterClosed();
  }

  initDeleteForm(){
    this.deleteFormConfig = new DeleteDialogConfig();
    this.deleteFormConfig.entityName="cliente";
  }

  initEditForm(){
    this.editFormConfig.service = this._clientService;
    this.editFormConfig.titleNew = 'Nuevo cliente';
    this.editFormConfig.titleEdit = 'Editar cliente';
    let config = new MiaFormConfig();
    config.hasSubmit = false;
    config.fields = CLIENT_FORM_FIELDS;
    config.errorMessages = CLIENT_FORM_FIELDS_ERROR_MESSAGES;
    this.editFormConfig.config = config;
  }

  initFormConfigs(){
    this.initEditForm();
    this.initDeleteForm();
  }

  loadTableConfig(): void {
    this.tableConfig.columns = CLIENT_TABLE_COLUMNS;
    this.tableConfig.service = this._clientService;
    this.tableConfig.loadingColor = "var(--primary-color)"
    this.tableConfig.onClick.subscribe(value => this.determineAction(value));
  }

  removeItem(item:Client) {
    this.miaTable.config.service.removeOb(item.id).subscribe(_ => {
      this.miaTable.loadItems();
    },
      err => console.log(err)
    )
  }

}
