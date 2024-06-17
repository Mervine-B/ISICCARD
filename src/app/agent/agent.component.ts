import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { AgentModel } from '../models/agent.model';
import { AgentService } from '../services/agent.service';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormulaireComponent } from '../formulaire/formulaire.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from '../services/global.service';
import { Agent } from 'https';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ActionService } from '../services/action.service';
import { DialogRef } from '@angular/cdk/dialog';
import { error } from 'console';




@Component({
  selector: 'app-agent',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,MatButtonModule,
    MatIconModule,
    ConfirmationDialogComponent,FormsModule
  ],

  templateUrl: './agent.component.html',
  styleUrl: './agent.component.scss',
  providers: [AgentService]
})


export class AgentComponent {
  agents: AgentModel[] = [];
  agentForm!: FormGroup;
  
  constructor(
    private agentService: AgentService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private globalService: GlobalService,
    private actionService : ActionService
  ) { }

  ngOnInit() {
    this.agentForm = this.formBuilder.group({
      id: [null],
      name: [null],
      firstName: [null],
      contact: [null]
    });
    this.loadagents();
  }

  loadagents() {
    this.agentService.agentGet().subscribe((agents: AgentModel[]) => {
      this.agents = agents;
    });
  }

  openDialog( agent? : AgentModel ) {
    const dialogref = this.dialog.open(FormulaireComponent, {width : '500px', disableClose: true});
    if(agent){
      dialogref.componentInstance.data  = agent
    }
    
  }


 openSnackBar(message: string, action :string){  
  
  this.snackBar.open(message,action, {
    duration: 3000,
  });
  }

 onRefresh(){
    this.agentService.agentGet().subscribe(
      (data) =>{
        this.agents = data;
      }
    )

    }

    
    toggleAllStudents(event: any): void {
      const isChecked = event.target.checked;
      this.agents.forEach(agent => agent.selected = isChecked);
    }
 
    
   
    get selectedAgentsCount(): number {
      return this.agents.filter(agent => agent.selected).length;
    }
  
  
    get canDelete(): boolean {
      return this.selectedAgentsCount > 0;
    }
 

    deleteSelectedAgents(): void {
      const selectedAgents = this.agents.filter(agent => agent.selected);
      const agentNames = selectedAgents.map(agent => agent.name).join(', ');
  
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '300px',
        data: {
          entityName : selectedAgents.length > 1 ? 'ces agents' : agentNames
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          selectedAgents.forEach(agent => {
            this.agentService.agentDelete(agent.id).subscribe(
              () => {
                this.openSnackBar('Agents supprimés avec succès', 'Fermer');
                this.globalService.reloadComponent('/agent');
              },
              error => {
                this.openSnackBar('Erreur lors de la suppression des agents', 'Fermer');
              }
            );
          });
        }
      });
    }
    
    getSelectedStudent(): AgentModel | null {
      const selectedAgents = this.agents.filter(agent => agent.selected);
      return selectedAgents.length === 1 ? selectedAgents[0] : null;
    }


}

