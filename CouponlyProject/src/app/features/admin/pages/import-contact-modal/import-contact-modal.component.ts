import { Component,Output,EventEmitter } from '@angular/core';
import { ContactService } from '../../../../commons/services/Contacts/contact.service';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';

@Component({
  selector: 'app-import-contact-modal',
  imports: [],
  templateUrl: './import-contact-modal.component.html',
  styleUrl: './import-contact-modal.component.scss'
})
export class ImportContactModalComponent {

  @Output() contactsImported = new EventEmitter<void>();
@Output() closeModal = new EventEmitter<void>();


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
      // Optional: Check for duplicates or other metadata in response
      if (response?.duplicates?.length > 0) {
        this.toast.show({
          type: 'info',
          message: `${response.duplicates.length} contacts already exist and were skipped.`
        });
      }

      this.toast.show({ type: 'success', message: 'CSV imported successfully.' });
      this.contactsImported.emit();
      this.csvFile = null;
    },
    error: (error: any) => {
      console.error('CSV import failed:', error);
      this.toast.show({ type: 'error', message: 'Failed to import CSV. Please try again.' });
    }
  });
}




  // 🚀 Import vCard File
importVCard() {
  if (!this.vcardFile) {
    this.toast.show({ type: 'warning', message: 'Please select a vCard file before importing.' });
    return;
  }

  console.log('Importing vCard...');

  this.contactService.ImportContactsFromVCard(this.vcardFile).subscribe({
    next: (response: any) => {
      if (response?.duplicates?.length > 0) {
        this.toast.show({
          type: 'info',
          message: `${response.duplicates.length} contacts already exist and were skipped.`
        });
      }

      this.toast.show({ type: 'success', message: 'vCard imported successfully.' });
      this.contactsImported.emit();
      this.vcardFile = null;
    },
    error: (err: any) => {
      console.error('vCard import failed:', err);
      this.toast.show({ type: 'error', message: 'Failed to import vCard. Please try again.' });
    }
  });
}

  // ❌ Close Modal
  close() {
    this.closeModal.emit();
  }
}



