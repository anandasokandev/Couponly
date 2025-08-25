import { Component,Output,EventEmitter } from '@angular/core';

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
vCardFile: File | null = null;

handleCSVUpload(event: any) {
  this.csvFile = event.target.files[0];
}

handleVCardUpload(event: any) {
  this.vCardFile = event.target.files[0];
}

importCSV() {
  if (this.csvFile) {
    // Parse and import logic here
    this.contactsImported.emit();
  }
}

importVCard() {
  if (this.vCardFile) {
    // Parse and import logic here
    this.contactsImported.emit();
  }
}

close() {
  this.closeModal.emit();
}


}
