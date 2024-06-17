import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Ordermodel } from '../models/order.model';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ ReactiveFormsModule,
    CommonModule,
    HttpClientModule

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
    private formBuilder: FormBuilder

  ){}

  ngOnInit(){
    this.orderForm = this.formBuilder.group({
      id: [null],
      name: [null],
      studentId: [null],
    typeOfCardId : [null],
    validationDate : [null],
    submissionDate : [null]

    });

     this.loadorders();
  }

  loadorders(){
    this.orderService.orderGet().subscribe((orders :Ordermodel[]) => {
      console.log(orders)
      this.orders = orders
    })
  }
}

