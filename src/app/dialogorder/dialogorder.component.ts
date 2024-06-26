import { Component, Inject, Optional } from '@angular/core';
import { Ordermodel } from '../models/order.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionService } from '../services/action.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from '../services/global.service';
import { typeofcardModel } from '../models/typeofcard.model';
import { StudentModel } from '../models/student.model';
import { TypeofcardService } from '../services/typeofcard.service';
import { StudentService } from '../services/student.service';
import { Console, log } from 'console';

@Component({
  selector: 'app-dialogorder',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogContent,
    MatDialogActions
  ],
  providers:[DatePipe],
  templateUrl: './dialogorder.component.html',
  styleUrl: './dialogorder.component.scss'
})
export class DialogorderComponent {
  action: string = '';
  orders: Ordermodel[] = []
  orderId! :number;
  orderForm!: FormGroup
  isReadOnly: boolean = true; 
  typeofcards:typeofcardModel[] =[];
  students : StudentModel[] =[];


 

  constructor(
    public formBuilder : FormBuilder,
    public actionService :ActionService,
    public orderService : OrderService,
    public globalService :GlobalService,
    public studenService : StudentService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    public typeofcardService : TypeofcardService,
    @Optional()public dialogRef: MatDialogRef<DialogorderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() @Inject(MAT_DIALOG_DATA) public item: any
  ) { }


  ngOnInit(){
    this.orderForm = this.formBuilder.group({
      id: [0],
      name: [null , Validators.required],
      studentId:[null , Validators.required],
      typeOfCardId : [null , Validators.required],
      validationDate : [null , Validators.required],
      submissionDate : [null , Validators.required],
      statusId:[null , Validators.required],
      
    });
   
    if (this.data) {
      const dateFormat = this.getCurrentDateForInput(this.data.submissionDate);
      const date = this.getCurrentdate(this.data.validationDate);
      this.orderForm.patchValue(this.data);
      console.log(this.data)
      /*this.orderForm.get('studentId')?.disable();
      this.orderForm.get('typeOfCardId')?.disable();
      this.orderForm.get('submissionDate')?.disable();
      this.orderForm.get('validationDate')?.disable();*/
      this.orderForm.get('submissionDate')?.setValue(dateFormat);
      this.orderForm.get('validationDate')?.setValue(date);
      console.log(this.orderForm.value)
    };

  
    this.action= this.actionService.getAction();
    this.loadStudents();

    this.loadtypeofcards();
  }
  
  loadtypeofcards() {
    // Supposons que vous ayez un service qui obtient les types de cartes
    this.typeofcardService.typeofcardGet().subscribe((typeofcard: typeofcardModel[]) => {
      this.typeofcards = typeofcard;
    });
  }

  loadStudents(){
    this.studenService.studentGet().subscribe(( student : StudentModel[]) =>{this.students=student});
  }

  Validate(){

  const order : Ordermodel =this.orderForm.value;
  
  if (this.data)

    this.orderService.orderUpdate(order).subscribe(
      () => {
       
        this.openSnackBar('Commande valide avec  succès', 'Fermer');
        this.globalService.reloadComponent('/order');
        this.dialogRef.close();
      },
      
      (error) => {
        console.log(error);
        this.openSnackBar('Erreur lors de la validation de la commande ', 'OK');
        this.dialogRef.close();
      }
    );
   
  }
  
  rejectOrder(orderId: number): void {
    
  }

  openSnackBar(message: string, action :string){
    this.snackBar.open(message,action, {
      duration: 3000,
    });
    }

  Cancel(){
    this.dialogRef.close();
    }

  getCurrentDateForInput(data: string){
      const submissionDate: string = new Date(data).toISOString().split('T')[0];
      return submissionDate
}

getCurrentdate(data: string){
  const validationDate: string = new Date(data).toISOString().split('T')[0];
  return validationDate
}

  
convertToValideDates(date: string, separateur="-") {
  const dateFormatted = this.getCurrentDateForInput(date)
  const year = dateFormatted.split('-')[0];
  const month = dateFormatted.split('-')[1];
  const day = dateFormatted.split('-')[2];
  const formattedDate =`${month}${separateur}${day}${separateur}${year}`;
  return formattedDate;
}    
    
}
