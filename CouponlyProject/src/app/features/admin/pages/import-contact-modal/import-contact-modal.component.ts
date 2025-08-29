import { Component,Output,EventEmitter } from '@angular/core';
import { ContactService } from '../../../../commons/services/Contacts/contact.service';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-import-contact-modal',
  imports: [CommonModule],
  templateUrl: './import-contact-modal.component.html',
  styleUrl: './import-contact-modal.component.scss'
})
export class ImportContactModalComponent {

  @Output() contactsImported = new EventEmitter<void>();
@Output() closeModal = new EventEmitter<void>();

showCsvInput = true;

showvcardInput= true;




csvFile: File | null = null;
vcardFile: File | null = null;
 constructor(private contactService: ContactService,private toast:ToastService) {}

  // 📄 Handle CSV File Selection
  handleCSVUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      this.csvFile = file;

    


    } else {
      console.warn('Invalid file type for CSV');
    }
  }

  // 📇 Handle vCard File Selection
  handleVCardUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && file.name.endsWith('.vcf')) {
      this.vcardFile = file;
    } else {
      console.warn('Invalid file type for vCard');
    }
  }

  // 🚀 Import CSV File
 importCSV() {
  if (!this.csvFile) {
    this.toast.show({ type: 'warning', message: 'Please select a CSV file before importing.' });
    return;
  }

  console.log('Importing CSV...');

  this.contactService.ImportContactsFromCsv(this.csvFile).subscribe({
    next: (response: any) => {
      

      this.toast.show({ type: 'success', message: response.data });
      this.contactsImported.emit();
      this.csvFile = null;
      this.close();
      this.refreshclose();
    },
    error: (error: any) => {
      console.error('CSV import failed:', error);
      this.toast.show({ type: 'error', message: error.errors });
    }
  });
}




  // 🚀 Import vCard File
importVcard() {
  if (!this.vcardFile) {
    this.toast.show({ type: 'warning', message: 'Please select a vCard file before importing.' });
    return;
  }

  console.log('Importing vCard...');

  // Use the new service method for vCard import
  this.contactService.ImportContactsFromVCard(this.vcardFile).subscribe({
    next: (response: any) => {
      this.toast.show({ type: 'success', message: response.data });
      this.contactsImported.emit();
      this.vcardFile = null;
      this.close();
      this.refreshclosesvcard();
    },
    error: (error: any) => {
      console.error('vCard import failed:', error);
      this.toast.show({ type: 'error', message: error.errors });
    }
  });
}

  // ❌ Close Modal
  close() {
    this.closeModal.emit();
    
  }


  

  refreshclose()
  {
    this.csvFile = null;

  // Force re-render of input
  this.showCsvInput = false;
  setTimeout(() => {
    this.showCsvInput = true;
  }, 0);
  }


  refreshclosesvcard()
  {
    this.csvFile = null;

  // Force re-render of input
  this.showvcardInput = false;
  setTimeout(() => {
    this.showvcardInput = true;
  }, 0);
  }
}

