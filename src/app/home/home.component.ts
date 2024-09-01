import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { SignUpService } from '../sign-up/sign-up.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  constructor(private userAuthService: UserAuthService, private router: Router, public signUpService : SignUpService){}

  logout(){
    this.userAuthService.clear();
    this.router.navigate(['/login'])
  }

  isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

}
