import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedDetailsService } from './med-details.service';

@Component({
  selector: 'app-med-details',
  templateUrl: './med-details.component.html',
  styleUrls: ['./med-details.component.css']
})
export class MedDetailsComponent implements OnInit{

  mediForm !: FormGroup;
  mediTypes !: any;
  conTypes !: any;
  errorMessage !: any;

  constructor(private formBuilder: FormBuilder, private medService : MedDetailsService){
    this.mediForm = this.formBuilder.group({
      medicineName:['', Validators.required],
      medicineType:['', Validators.required],
      expiryDate:['', Validators.required],
      totalQuantity:['', Validators.required],
      price:['', Validators.required]
    });
  }

  ngOnInit() {
    this.medService.getMedType().subscribe(
      (data)=>{ 
        this.mediTypes = data;
        console.log(this.mediTypes);
      }
      
    );
  }

  get f(){ return this.mediForm.controls}

  addMedicineDetails(){    
    this.errorMessage = null;
    this.medService.addMedicineDetails(this.mediForm.value).subscribe(
      (data) => {
        
        alert("Medicine Details Added Successfully!!")
        this.mediForm.reset()
      },
      (error) =>{
        this.errorMessage = "This medicine is already added"
        console.log(this.errorMessage)
      }
    );
  }

}
