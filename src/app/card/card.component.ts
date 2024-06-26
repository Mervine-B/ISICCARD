import { Component } from '@angular/core';
import { typeofcardModel } from '../models/typeofcard.model';
import { TypeofcardService } from '../services/typeofcard.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from '../services/global.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from 'express';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardFormComponent } from '../card-form/card-form.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [[ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,MatButtonModule,
    MatIconModule,
    ConfirmationDialogComponent,FormsModule
  ],],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  providers: [TypeofcardService]
})
export class CardComponent {
  cards: typeofcardModel[] =[];
  cardForm! : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private globalService: GlobalService,
    private typeofService : TypeofcardService,
    private snackBar: MatSnackBar,
  ){}

  ngOnInit() {
    this.cardForm = this.formBuilder.group({
      id: [null],
      name: [null],
      code: [null]
     
    });
    this.loadcards();
  }

  loadcards() {
    this.typeofService.typeofcardGet().subscribe((cards: typeofcardModel[]) => {
      this.cards = cards;
    });
  }

  openDialog( typeofcard? : typeofcardModel ) {
    const dialogref = this.dialog.open(CardFormComponent, {width : '500px', disableClose: true});
    if(typeofcard){
      dialogref.componentInstance.data  = typeofcard
    }
    
  }


 openSnackBar(message: string, action :string){  
  
  this.snackBar.open(message,action, {
    duration: 3000,
  });
  }

  toggleAllStudents(event: any): void {
    const isChecked = event.target.checked;
    this.cards.forEach(typeofcard => typeofcard.selected = isChecked);
  }

  get selectedCardsCount(): number {
    return this.cards.filter(typeofcard => typeofcard.selected).length;
  }

  get canEdit(): boolean {
    return this.selectedCardsCount === 1;
  }

  get canDelete(): boolean {
    return this.selectedCardsCount > 0;
  }


  deleteSelectedCards(): void {
    const selectedCards = this.cards.filter(typeofcard => typeofcard.selected);
    const agentNames = selectedCards.map(typeofcard => typeofcard.name).join(', ');

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        entityName : selectedCards.length > 1 ? 'ces cartes' : agentNames
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        selectedCards.forEach(typeofcard => {
          this.typeofService.typeofcardDelete(typeofcard.id).subscribe(
            () => {
              this.openSnackBar('Cartes supprimés avec succès', 'Fermer');
              this.globalService.reloadComponent('/card');
            },
            error => {
              this.openSnackBar('Erreur lors de la suppression des cartes', 'Fermer');
            }
          );
        });
      }
    });
  }
  
  getSelectedCard(): typeofcardModel | null {
    const selectedCards = this.cards.filter(typeofcard => typeofcard.selected);
    return selectedCards.length === 1 ? selectedCards[0] : null;
  }


}
