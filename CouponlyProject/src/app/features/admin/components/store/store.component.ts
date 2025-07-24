import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalComponent, ModalToggleDirective, TableDirective } from '@coreui/angular';
import { AddStoreModalComponent } from '../../pages/add-store-modal/add-store-modal.component';

@Component({
  selector: 'app-store',
  imports: [CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    TableDirective,
    ButtonDirective,
    ModalToggleDirective,
    ModalComponent,
    ReactiveFormsModule,
    FormsModule,
    AddStoreModalComponent
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
  standalone: true
})
export class StoreComponent {

}
