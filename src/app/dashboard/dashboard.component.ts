import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class DashboardComponent implements OnInit {

  mediDetails: any = [];
  filteredMedicines: any = [];
  selectedMedicine: any = [];
  errorMessage !: any;
  visible !: boolean;

  constructor(private dashboardService: DashboardService, private confirmationService : ConfirmationService, private messageService : MessageService) { }

  ngOnInit() {
    this.loadMedicineDetails();
  }

  loadMedicineDetails() {
    this.dashboardService.getAllMediDetails().subscribe(
      (data) => {
        this.mediDetails = data;
        this.filteredMedicines = data;
      },
      (error) => {
        this.errorMessage = error.error.message;
        console.log(this.errorMessage)
      }
    );
  }
  getSeverity(status: string): string {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'OUTOFSTOCK':
        return 'danger';
      case 'LOWSTOCK':
        return 'warning';
      default:
        return '';
    }
  }

  filterMedicine(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredMedicines = this.mediDetails.filter((medicine: any) =>
      medicine.medicineName.toLowerCase().includes(query));
  }

  updateQuantity(medicineDetails: any) {
    this.selectedMedicine = { ...medicineDetails };
    this.visible = true;
  }

  saveMedicine() {
    this.errorMessage = null;
    this.dashboardService.UpdateStatus(this.selectedMedicine.medicineName, this.selectedMedicine).subscribe(
      (data) => {
        this.loadMedicineDetails();
        this.selectedMedicine = [];
        this.visible = false;
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    )
  }

  deleteDetails(event:Event, medicineName: string) {
    this.confirmationService.confirm({
      target:event.target!,
      message : 'Are you sure you want to delete this medicine details?',
      icon: 'pi pi-exclamation-triangle',
      accept: ()=>{
        this.dashboardService.DeleteMediDetails(medicineName).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Medicine deleted successfully' });
            this.loadMedicineDetails();
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
    }
    });    
  }

}
