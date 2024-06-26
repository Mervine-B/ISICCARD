import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Ordermodel } from '../models/order.model';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormulaireComponent } from '../formulaire/formulaire.component';
import { DialogorderComponent } from '../dialogorder/dialogorder.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
   
    MatDialogModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  providers:[OrderService]
})
export class OrderComponent {
  orders: Ordermodel[] = []
   orderForm!: FormGroup


  constructor(
    private orderService : OrderService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,

  ){}

  ngOnInit(){
    this.orderForm = this.formBuilder.group({
      id: [null],
      name: [null],
      studentId: [null],
      typeOfCardId : [null],
      validationDate : [null],
      submissionDate : [null],
      statusId:[null]

    });

     this.loadorders();
  }

  loadorders(){
    this.orderService.orderGet().subscribe((orders :Ordermodel[]) => {
      console.log(orders)
      this.orders = orders
    })
  }
  openOrderDialog(order: Ordermodel): void {
    console.log("boite de dialog",order)
    const dialogRef = this.dialog.open(DialogorderComponent, {
      width: '500px', 
      data: order ,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('La boîte de dialogue est fermée');
      
    });
  }

  onRefresh(){
    this.orderService.orderGet().subscribe(
      (data) =>{
        this.orders = data;
      }
    )

    }
}
  
  
 


