import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dasborboadcontent',
  standalone: true,
  imports: [ CommonModule,
    RouterModule,
    IonicModule],
  templateUrl: './dasborboadcontent.component.html',
  styleUrl: './dasborboadcontent.component.scss'
})
export class DasborboadcontentComponent {

}
