import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginModel } from '../models/login.model';
import { LoginService } from '../services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { json } from 'stream/consumers';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [LoginService]
})
export class LoginComponent {
  loginForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private globalService: GlobalService
  ){}

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: [null],
      password: [null]
    })
  }
  Submit(){
    
    const login: LoginModel = this.loginForm.value

    this.loginService.loginPost(login).subscribe(res => {
      //transform to string
      const restostring = JSON.stringify(res)
      //storage on localstorage
      localStorage.setItem("agentlogin",restostring)
      //reload page
      location.reload()
    })

  }

 
}
