import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, TableActiveDirective, TableDirective } from '@coreui/angular';
import { EditContactModalComponent } from '../../pages/edit-contact-modal/edit-contact-modal.component';
import { AddContactModalComponent } from '../../pages/add-contact-modal/add-contact-modal.component';

import { FormsModule } from '@angular/forms';
import { ContactService } from '../../../../commons/services/Contacts/contact.service';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';



@Component({
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
    FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contacts:any[]=[];
  name:string='';
  email:string='';
  phonenumber:string='';

 isLoading: boolean = false;

 selectedContact: any = null;




  constructor(private api:ContactService,private toast:ToastService){}
  ngOnInit() {
    this.isLoading = true;
    this.api.FetchContacts().subscribe({
      next: (response: any) => {
        this.contacts = response.data;
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



FilterContact() {
  this.isLoading = true;
  this.api.searchContacts(this.name, this.email, this.phonenumber).subscribe({
    next: (response: any) => {
      this.contacts = response.data;
      this.isLoading = false;
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

  this.api.FetchContacts().subscribe({
    next: (response: any) => {
      this.contacts = response.data;
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error resetting contacts:', err);
      this.isLoading = false;
    }
  });
}



ContactList() {
  this.api.FetchContacts().subscribe({
    next: (response: any) => {
      this.contacts = response.data;
      // this.toast.show({ type: 'info', message: 'Contact list updated.' });
    },
    error: (err) => {
      console.error('Error refreshing contacts:', err);
    }
  });
}

refreshContactList() {
 this.api.FetchContacts().subscribe({
    next: (response: any) => {
      this.contacts = response.data;
      // this.toast.show({ type: 'info', message: 'Contact list updated.' });
    },
    error: (err) => {
      console.error('Error refreshing contacts:', err);
    }
  });
}



}