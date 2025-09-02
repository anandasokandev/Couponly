import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, TableActiveDirective, TableDirective } from '@coreui/angular';
import { EditContactModalComponent } from '../../pages/edit-contact-modal/edit-contact-modal.component';
import { AddContactModalComponent } from '../../pages/add-contact-modal/add-contact-modal.component';

import { FormsModule } from '@angular/forms';
import { ContactService } from '../../../../commons/services/Contacts/contact.service';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';
import { ExportContactModalComponent } from '../../pages/export-contact-modal/export-contact-modal.component';
import { PaginationComponent } from '../../pages/pagination/pagination.component';
import { ImportContactModalComponent } from '../../pages/import-contact-modal/import-contact-modal.component';



@Component({
  standalone:true,
  selector: 'app-contact',
  imports: [ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ModalToggleDirective,
    ModalComponent,
    CommonModule,
    EditContactModalComponent,
    AddContactModalComponent,
    ExportContactModalComponent,
    ImportContactModalComponent,
    FormsModule,
    PaginationComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contacts:any[]=[];
  name:string='';
  email:string='';
  phonenumber:string='';

  isFiltered: boolean = false;
  

 isLoading: boolean = false;

 selectedContact: any = null;

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  

  constructor(private api:ContactService,private toast:ToastService){}
  ngOnInit() {
    this.isLoading = true;
    this.api.FetchContacts(this.currentPage, this.itemsPerPage).subscribe({
      next: (response: any) => {
        this.contacts = response.data.items;
        this.totalItems = response.data.totalCount;
        this.isLoading = false;
        console.log(response)
      },
      error: (err) => {
        console.error('Error loading contacts:', err);
        this.isLoading = false;
      }
    });
  }


  
emailCsv() {
  this.api.ExportContactsToCsv(this.name, this.email, this.phonenumber).subscribe({
    next: (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'contacts.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      this.toast.show({ type: 'success', message: 'CSV downloaded successfully.' });
    },
    error: (error: any) => {
      this.toast.show({ type: 'error', message: 'Failed to download CSV.' });
      console.error(error);
    }
  });
}

  openEditModal(contact: any) {
  this.selectedContact = {
    id: contact.id,
    name: contact.name,
    phoneNumber: contact.contact,
    email: contact.mail
  };
}

Filtering() {
  this.currentPage = 1;
  this.FilterContact();
}

// isValidEmail(email: string): boolean {
//   const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
//   return emailPattern.test(email);
// }




FilterContact() {
   this.isFiltered = true;
  this.isLoading = true;

  this.api.searchContacts(this.currentPage, this.itemsPerPage, this.name, this.email, this.phonenumber).subscribe({
    next: (response: any) => {
      this.contacts = response.data.items; // assuming this is an array

      this.totalItems = response.data.totalCount;


      this.isLoading = false;


      // Show toast if no results found
      if (this.contacts.length === 0) {
        this.toast.show({ type: 'info', message: 'No contacts found matching your search.' });
      }
    },
    error: (err) => {
      console.error('Search error:', err);
      this.isLoading = false;
    }
  });
}





ResetFilters() {
  this.name = '';
  this.email = '';
  this.phonenumber = '';
  this.isLoading = true;
  this.isFiltered = false;

  this.api.FetchContacts(this.currentPage, this.itemsPerPage).subscribe({
    next: (response: any) => {
      this.contacts = response.data.items;
      this.totalItems = response.data.totalCount;
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error resetting contacts:', err);
      this.isLoading = false;
    }
  });
}




ContactList() {
  this.api.FetchContacts(this.currentPage, this.itemsPerPage).subscribe({
    next: (response: any) => {
      this.contacts = response.data.items;
        this.totalItems = response.data.totalCount;
      // this.toast.show({ type: 'info', message: 'Contact list updated.' });
    },
    error: (err) => {
      console.error('Error refreshing contacts:', err);
    }
  });
}

refreshContactList() {
  this.isFiltered = false;
 this.api.FetchContacts(this.currentPage, this.itemsPerPage).subscribe({
    next: (response: any) => {
      this.contacts = response.data.items;
        this.totalItems = response.data.totalCount;
      // this.toast.show({ type: 'info', message: 'Contact list updated.' });
    },
    error: (err) => {
      console.error('Error refreshing contacts:', err);
    }
  });
}


exportAsCSV() {
  this.emailCsv(); // or your actual CSV logic
}



exportAsVCard() {
  console.log('Exporting as vCard...');

  this.api.ExportContactsToVCard(this.name, this.email, this.phonenumber).subscribe({
    next: (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'contacts.vcf'; // vCard file extension
      a.click();
      window.URL.revokeObjectURL(url);

      this.toast.show({ type: 'success', message: 'vCard downloaded successfully.' });
    },
    error: (error: any) => {
      this.toast.show({ type: 'error', message: 'Failed to download vCard.' });
      console.error(error);
    }
  });
}



  //pagination
onPageChange(page: number) {

  
  this.currentPage = page;
  this.isFiltered ? this.FilterContact() : this.ResetFilters();

 
}


}