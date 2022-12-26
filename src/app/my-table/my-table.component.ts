import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';
import { observable, sample } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

export interface MyTableItem {
  name: string;
  id: number;
}

const EXAMPLE_DATA: MyTableItem[] = [
  {id: 1, name: 'Hydrogen'},
  {id: 2, name: 'Helium'},
  {id: 3, name: 'Lithium'},
  {id: 4, name: 'Beryllium'},
  {id: 5, name: 'Boron'},
  {id: 6, name: 'Carbon'},
  {id: 7, name: 'Nitrogen'},
  {id: 8, name: 'Oxygen'},
  {id: 9, name: 'Fluorine'},
  {id: 10, name: 'Neon'},
  {id: 11, name: 'Sodium'},
  {id: 12, name: 'Magnesium'},
  {id: 13, name: 'Aluminum'},
  {id: 14, name: 'Silicon'},
  {id: 15, name: 'Phosphorus'},
  {id: 16, name: 'Sulfur'},
  {id: 17, name: 'Chlorine'},
  {id: 18, name: 'Argon'},
  {id: 19, name: 'Potassium'},
  {id: 20, name: 'Calcium'},
];

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent{
 
  dataSource: MyTableItem[] = EXAMPLE_DATA;
  displayedColumns = ['id', 'name', 'action'];

  constructor(private SnackBar: MatSnackBar, private dialog : MatDialog) {
  }

  sample: MyTableItem[] = this.dataSource;
  
  openDialog(rowid: number){
    let dialogref = this.dialog.open(DialogComponent);
    
    dialogref.afterClosed().subscribe( (result) =>{
      if(result == "true"){
        this.deleteMethod(rowid);
      }  
    
    })

  }
  deleteMethod(rowid: number) {
    this.dataSource = this.dataSource.filter((item, index) => index !== rowid);
    this.openSnackBar('Record Deleted', 'Undo');

    
  }

  openSnackBar(message:string, action: string){
    let snackbarref = this.SnackBar.open(message, action, {duration: 2000});

    snackbarref.afterDismissed().subscribe(()=>{
      this.sample = this.dataSource;
    })

    snackbarref.onAction().subscribe(()=>{
        this.dataSource = this.sample;
    })
  }
  
}
