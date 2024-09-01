import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from './sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  signUpForm !: FormGroup;
  successMessage !: any;
  errorMessage !:any;
  passWordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  constructor(private formBuilder : FormBuilder, private signUpService : SignUpService, private router: Router){}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      userName:['', Validators.required],
      firstName:['', Validators.required],
      lastName:['',Validators.required],
      emailId:['',[Validators.required, validateEmail]],
      password:['',[Validators.required, Validators.pattern(this.passWordRegex)]]
    });
  }

  get f(){ return this.signUpForm.controls}

  register(){
    this.successMessage = null;
    this.errorMessage = null;
    this.signUpService.registerUser(this.signUpForm.value).subscribe(
      (data)=>{
        console.log("Signed up successfully")
        alert("Signed up successfully")
        this.router.navigate(['/login'])
      },
      (error)=>{
        this.errorMessage = "This user is already present";
        console.log(this.errorMessage)
      }
    );
  }

}

function validateEmail(c:FormControl){
  let EMAIL_REGEXP = 
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return EMAIL_REGEXP.test(c.value)? null :{
    emailError:{

      message:"Email is invalid"
    }
  }

}
