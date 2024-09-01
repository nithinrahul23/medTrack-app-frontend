import { Component } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserDetailsService } from './user-details.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UserDetailsComponent {

  userDetails : any = [];
  selectedUser : any = [];
  errorMessage !: any;
  selectedRole !: string;
  visible !: boolean;
  roles = [
    { label: 'Admin,User', value: 'Admin,User' },
    { label: 'User', value: 'User' }
  ];

  constructor(private userDetailsService : UserDetailsService, private confirmationService : ConfirmationService, private messageService : MessageService) { }

  ngOnInit() {

    this.loadAllUsers();
  }

  loadAllUsers(){
    this.userDetailsService.getAllUsers().subscribe(
      (data)=>{
        this.userDetails = data;
      },
      (error)=>{
        this.errorMessage = error.error.message;
      }
    )
  }

  

  updateQuantity(userDetails: any) {
    this.selectedUser = { ...userDetails };
    this.selectedRole = this.selectedUser.role;
    this.visible = true;
  }

  saveUser() {
    this.errorMessage = null;
    this.userDetailsService.updateUser(this.selectedUser.userName, this.selectedUser).subscribe(
      (data) => {
        this.loadAllUsers();
        this.selectedUser = [];
        this.visible = false;
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    )
  }

  deleteDetails(event:Event, userName: string) {
    this.confirmationService.confirm({
      target:event.target!,
      message : 'Are you sure you want to delete this user details?',
      icon: 'pi pi-exclamation-triangle',
      accept: ()=>{
        this.userDetailsService.deleteUser(userName).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully' });
            this.loadAllUsers();
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
    }
    });    
  }

}
