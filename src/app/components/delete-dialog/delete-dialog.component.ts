import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteDialogConfig } from './delete-dialog.config';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  config:DeleteDialogConfig;
  objectKeys = Object.keys;
  constructor(@Inject (MAT_DIALOG_DATA) data:DeleteDialogConfig, private dialogRef:MatDialogRef<DeleteDialogComponent>) {
    this.config=data;
  }

  propValue(propName:string)
  {
    return propName=='firstname' || propName=='lastname' || propName=='email'? this.config.item[propName]:undefined;
  }

  ngOnInit(): void {
  }

  cancel()
  {
    this.dialogRef.close();
  }
  
  delete()
  {
    this.dialogRef.close(true);
  }

}
