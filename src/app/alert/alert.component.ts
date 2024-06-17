import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogModule } from '@angular/material/dialog';

import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [MatCardModule , MatDialogModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() title!: string
  @Input() content!: string

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
}
