import { Component, Input } from '@angular/core';
import { typeofcardModel } from '../models/typeofcard.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { FormulaireComponent } from '../formulaire/formulaire.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TypeofcardService } from '../services/typeofcard.service';
import { GlobalService } from '../services/global.service';
import { ActionService } from '../services/action.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,MatDialogContent, MatDialogActions,
  ],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss'
})
export class CardFormComponent {
  action: string = '';
  cards: typeofcardModel[] = [];
  cardForm!: FormGroup

  @Input() data!: typeofcardModel

  constructor(
    public dialogRef: MatDialogRef<FormulaireComponent>,
    private snackBar: MatSnackBar,
    private typeofcardService : TypeofcardService,
    private formBuilder : FormBuilder,
    private globalService: GlobalService,
    public dialog: MatDialog,
    private actionService : ActionService
    ){}

  ngOnInit(){
    this.cardForm = this.formBuilder.group({
      id: [0],
      name: [null, Validators.required],
      code: [null,],
      
    });

      //recuperer les donnees de l'agent sur le formulair afin de l'editer

  if(this.data){
    this.cardForm.patchValue(this.data)
  }

  this.action= this.actionService.getAction();
}


Submit(){

  const newcard: typeofcardModel = this.cardForm.value;
 
  if(this.data) {
   
    // Si des données existent (mode édition), mettez à jour l'agent existant
    this.typeofcardService.typeofcardUpdate(newcard).subscribe(
      () => {
        this.openSnackBar('type de carte mis à jour avec succès', 'Fermer');
        this.globalService.reloadComponent('/card');
        this.dialogRef.close();
      },
      
      (error) => {
        console.log(error);
        this.openSnackBar('Erreur lors de la mise à jour du type de carte', 'OK');
        this.dialogRef.close(); // Fermez la boîte de dialogue même en cas d'erreur
      }
    );
  } else {
    console.log("Nouvel agent à ajouter :", newcard);
    // Sinon, ajoutez un nouvel agent
    this.typeofcardService.typeofcardPost(newcard).subscribe(
      () => {
        this.openSnackBar('Type de carte ajouté avec succès', 'Fermer');
        this.globalService.reloadComponent('/card');
        this.dialogRef.close();
      },
      (error) => {
        console.error(error);
        this.openSnackBar('Erreur lors de l\'ajout d\'un type de carte', 'OK');
        
      }
    );
  }
}

Cancel(){
this.dialogRef.close();
}

openSnackBar(message: string, action :string){
  this.snackBar.open(message,action, {
    duration: 3000,
  });
  }
  
}
