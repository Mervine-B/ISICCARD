import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { StudentService } from '../services/student.service';
import { StudentModel } from '../models/student.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from '../services/global.service';
import { ActionService } from '../services/action.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { typeofcardModel } from '../models/typeofcard.model';
import { TypeofcardService } from '../services/typeofcard.service';


@Component({
  selector: 'app-studentform',
  standalone: true,
  imports: [ CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
     MatInputModule, MatDatepickerModule,FormsModule
  ],
  providers:[StudentService ,DatePipe],
  templateUrl: './studentform.component.html',
  styleUrl: './studentform.component.scss'
})
export class StudentformComponent {

  typeofcards: typeofcardModel[] =[];
  action: string = '';
  students: StudentModel[] = [];
  studentForm!: FormGroup

  @Input() data!: StudentModel

  constructor(
    public dialogRef: MatDialogRef<StudentformComponent>,
    private snackBar: MatSnackBar,
    private studentService : StudentService,
    private formBuilder : FormBuilder,
    private globalService: GlobalService,
    public dialog: MatDialog,
    private actionService : ActionService,
    private typeofcardService : TypeofcardService,
    private datePipe: DatePipe
  ){}

  ngOnInit(){
    this.studentForm = this.formBuilder.group({
      id: [0],
      nameOfSchool:  [null, Validators.required],
      name : [null, Validators.required],
      firstName: [null, Validators.required],
      email: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      typeOfCardId: [null, Validators.required]
    })

    if (this.data) {
      this.setFormData(this.data);
    }
    
    this.action= this.actionService.getAction();

    this.loadtypeofcards();
    
  }



  setFormData(student: StudentModel) {
    const formattedDate = this.datePipe.transform(student.dateOfBirth, 'yyyy-MM-dd');
    this.studentForm.patchValue({
      ...student,
      dateOfBirth: formattedDate
    });
  }


  loadtypeofcards() {
    // Supposons que vous ayez un service qui obtient les types de cartes
    this.typeofcardService.typeofcardGet().subscribe((typeofcard: typeofcardModel[]) => {
      this.typeofcards = typeofcard;
    });
  }


  Submit(){

    const newStudent: StudentModel = this.studentForm.value;
   
    if(this.data) {
     
      // Si des données existent (mode édition), mettez à jour l'agent existant
      this.studentService.studentUpdate(newStudent).subscribe(
        () => {
          this.openSnackBar('Etudiant mis à jour avec succès', 'Fermer');
          this.globalService.reloadComponent('/student');
          this.dialogRef.close();
        },
        
        (error) => {
          console.log(error);
          this.openSnackBar('Erreur lors de la mise à jour de l\'agent', 'OK');
          this.dialogRef.close(); // Fermez la boîte de dialogue même en cas d'erreur
        }
      );
    } else {
      console.log("Nouvel etudiant à ajouter :", newStudent);
      // Sinon, ajoutez un nouvel agent
      this.studentService.studentPost(newStudent).subscribe(
        () => {
          this.openSnackBar('Etudiant ajouté avec succès', 'Fermer');
          this.globalService.reloadComponent('/student');
          this.dialogRef.close();
        },
        (error) => {
          console.error(error);
          this.openSnackBar('Erreur lors de l\'ajout de l\'etudiant', 'OK');
          
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
  