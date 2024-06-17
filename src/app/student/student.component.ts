
import { ChangeDetectorRef, Component, Inject, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { StudentModel } from '../models/student.model';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentformComponent } from '../studentform/studentform.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { TypeofcardService } from '../services/typeofcard.service';
import { typeofcardModel } from '../models/typeofcard.model';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-student',
  standalone: true,
  imports: [ CommonModule,
    RouterModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,FormsModule
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  typeofcards:typeofcardModel[] =[];
  students : StudentModel[] =[];
  studentForm! : FormGroup;


  constructor(
   
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private studentService :StudentService,
    private globalService : GlobalService,
    private dialog: MatDialog,
    private typeofcardService : TypeofcardService

  ){}


  ngOnInit(){
this.studentForm = this.formBuilder.group({
  id: [null],
    nameOfSchool: [null],
    name:[null],
    firstName:[null],
    email:[null],
    dateOfBirth:[Date],
    typeofcardName:[null]
});
this.loadstudents();
this.loadtypeofcards();

  }

  loadstudents(){
    this.studentService.studentGet().subscribe((students: StudentModel[]) => {
      this.students = students.map(student => ({
        ...student,
        selected: false
      }));
    });
  }

  loadtypeofcards() {
   
    this.typeofcardService.typeofcardGet().subscribe((typeofcard: typeofcardModel[]) => {
      this.typeofcards = typeofcard;
    });
  }

  openDialog( student? : StudentModel | null ) {
    const dialogref = this.dialog.open(StudentformComponent, {width : '500px', disableClose: true});
    if(student){
      dialogref.componentInstance.data  = student
    }
    
  }


openSnackBar(message: string, action :string){  
  
  this.snackBar.open(message,action, {
    duration: 3000,
  });
 }

onRefresh(){
    this.studentService.studentGet().subscribe(
      (stdata) =>{
        this.students = stdata;
      }
    )

    }
  

toggleAllStudents(event: any): void {
      const isChecked = event.target.checked;
      this.students.forEach(student => student.selected = isChecked);
    }

    get selectedStudentsCount(): number {
      return this.students.filter(student => student.selected).length;
    }
  
    get canEdit(): boolean {
      return this.selectedStudentsCount === 1;
    }
  
    get canDelete(): boolean {
      return this.selectedStudentsCount > 0;
    }
 
 deleteSelectedStudents(): void {
      const selectedStudents = this.students.filter(student => student.selected);
      const studentNames = selectedStudents.map(student => student.name).join(', ');
  
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '300px',
        data: {
          entityName : selectedStudents.length > 1 ? 'ces étudiants' : studentNames
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          selectedStudents.forEach(student => {
            this.studentService.studentDelete(student.id).subscribe(
              () => {
                this.openSnackBar('Étudiants supprimés avec succès', 'Fermer');
                this.globalService.reloadComponent('/student');
              },
              error => {
                this.openSnackBar('Erreur lors de la suppression des étudiants', 'Fermer');
              }
            );
          });
        }
      });
    }
    
    getSelectedStudent(): StudentModel | null {
      const selectedStudents = this.students.filter(student => student.selected);
      return selectedStudents.length === 1 ? selectedStudents[0] : null;
    }
}
