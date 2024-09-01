import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../sign-up/sign-up.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  errorMessage !: any;
  userName !: string;
  password !: string;

  constructor(private signUpService:SignUpService, private router : Router, private userAuthService : UserAuthService){}
  
  ngOnInit(){ }

  login(loginForm : NgForm){
    this.errorMessage = null;
    this.signUpService.loginUser(loginForm.value).subscribe(
      (data)=>{
        this.userAuthService.setToken(data.jwtToken);
        this.userAuthService.setRoles(data.user.role);
        this.router.navigate(['/home'])
      },
      (error)=>{
        this.errorMessage = "Invalid Credentials";
      }
    );
  }


}
