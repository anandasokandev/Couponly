import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, TableActiveDirective, TableDirective } from '@coreui/angular';
import { EditContactModalComponent } from '../../pages/edit-contact-modal/edit-contact-modal.component';
import { AddContactModalComponent } from '../../pages/add-contact-modal/add-contact-modal.component';

import { FormsModule } from '@angular/forms';
import { ContactService } from '../../../../commons/services/Contacts/contact.service';

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



  constructor(private api:ContactService){}
  ngOnInit() {
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


}