import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, LocationStrategy } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { registerLocaleData } from '@angular/common';
import localFr from '@angular/common/locales/fr'
import {MatDialogModule} from '@angular/material/dialog';
import { GlobalService } from './services/global.service';
import { IonicModule } from '@ionic/angular';
import { DasborboadcontentComponent } from './dasborboadcontent/dasborboadcontent.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgbAlertModule,
    LoginComponent,
    HttpClientModule,
    CommonModule,
    DashboardComponent,
    MatDialogModule,
    IonicModule,DasborboadcontentComponent,
    ReactiveFormsModule,
    FormsModule 
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'StudentCard';
  isLogin!: boolean;

  constructor(
    private globalService: GlobalService
  ){
    registerLocaleData(localFr, 'fr')
  }

  ngOnInit(){
    const responStore = this.globalService.getItem("agentlogin")
    if (responStore != null){
      this.isLogin = true;
    }
    else{
      this.isLogin = false
    }

    
  }
}
