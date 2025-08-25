import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-export-contact-modal',
  imports: [],
  templateUrl: './export-contact-modal.component.html',
  styleUrl: './export-contact-modal.component.scss'
})
export class ExportContactModalComponent {

@Output() exportCSV = new EventEmitter<void>();
@Output() exportVCard = new EventEmitter<void>();
@Output() closeModal = new EventEmitter<void>();

onExportCSV() {
  this.exportCSV.emit();
  this.closeModal.emit();
}

onExportVCard() {
  this.exportVCard.emit();
  this.closeModal.emit();
}




}
