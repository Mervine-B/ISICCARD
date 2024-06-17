import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgentModel } from '../models/agent.model';
import { FormulaireModel } from '../models/formulaire.model';
import { LoginModel } from '../models/login.model';
import { AgentService } from '../services/agent.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgentComponent } from '../agent/agent.component';
import { GlobalService } from '../services/global.service';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatMenuTrigger, MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { EMPTY, catchError, finalize, tap } from 'rxjs';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionService } from '../services/action.service';

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,MatDialogContent, MatDialogActions,
  ],
  providers:[AgentService],
  templateUrl: './formulaire.component.html', 
  styleUrl: './formulaire.component.scss'
})

export class FormulaireComponent {
  action: string = '';
  agents: AgentModel[] = [];
  formulaireForm!: FormGroup

  @Input() data!: AgentModel

constructor(
  public dialogRef: MatDialogRef<FormulaireComponent>,
  private snackBar: MatSnackBar,
  private agentService : AgentService,
  private formBuilder : FormBuilder,
  private globalService: GlobalService,
  public dialog: MatDialog,
  private actionService : ActionService
){

}

ngOnInit(){
  this.formulaireForm = this.formBuilder.group({
    id: [0],
    name: [null, Validators.required],
    firstName: [null, Validators.required],
    contact: [null]
  })

  //recuperer les donnees de l'agent sur le formulair afin de l'editer

  if(this.data){
    this.formulaireForm.patchValue(this.data)
  }

  this.action= this.actionService.getAction();
}

Submit(){

  const newAgent: AgentModel = this.formulaireForm.value;
 
  if(this.data) {
   
    // Si des données existent (mode édition), mettez à jour l'agent existant
    this.agentService.agentUpdate(newAgent).subscribe(
      () => {
        this.openSnackBar('Agent mis à jour avec succès', 'Fermer');
        this.globalService.reloadComponent('/agent');
        this.dialogRef.close();
      },
      
      (error) => {
        console.log(error);
        this.openSnackBar('Erreur lors de la mise à jour de l\'agent', 'OK');
        this.dialogRef.close(); // Fermez la boîte de dialogue même en cas d'erreur
      }
    );
  } else {
    console.log("Nouvel agent à ajouter :", newAgent);
    // Sinon, ajoutez un nouvel agent
    this.agentService.agentPost(newAgent).subscribe(
      () => {
        this.openSnackBar('Agent ajouté avec succès', 'Fermer');
        this.globalService.reloadComponent('/agent');
        this.dialogRef.close();
      },
      (error) => {
        console.error(error);
        this.openSnackBar('Erreur lors de l\'ajout de l\'agent', 'OK');
        
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



