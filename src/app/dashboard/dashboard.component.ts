import { Component } from '@angular/core';
import { ResponseLogin } from '../models/login.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { GlobalService } from '../services/global.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  responseLogin!: ResponseLogin

  constructor(
    private dialog: MatDialog,
    private globalService: GlobalService
  ){}

  ngOnInit(){
    //get agent login stringify
    const objStore = this.globalService.getItem('agentlogin')
    //verify if objstore is exist
    if(objStore){
      //convert to object
      this.responseLogin = JSON.parse(objStore)
    }
  }

  onLogout(){
    const ref = this.dialog.open(AlertComponent)
    ref.componentInstance.content = "Voulez-vous vous deconnecter ?"
    ref.componentInstance.title = "Deconnexion"

    ref.afterClosed().subscribe(result => {
      if(result == true){
        localStorage.clear()
        location.reload()
      }
    })
  }

  // add hovered class to selected list item
  ngAfterViewInit() {
    this.addHoverEffect();
    this.setupMenuToggle();
  }

  addHoverEffect() {
    const list = document.querySelectorAll(".navigation li");

    function activeLink(this: HTMLElement) {
      list.forEach(item => {
        item.classList.remove("hovered");
      });
      this.classList.add("hovered");
    }

    list.forEach(item => item.addEventListener("mouseover", activeLink));
  }

  setupMenuToggle() {
    const toggle = document.querySelector(".toggle");
    const navigation = document.querySelector(".navigation");
    const main = document.querySelector(".main");

    if (toggle && navigation && main) {
      toggle.addEventListener('click', function() {
        navigation.classList.toggle("active");
        main.classList.toggle("active");
      });
    }

  }
}
