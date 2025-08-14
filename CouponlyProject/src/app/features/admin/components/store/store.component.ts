import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalComponent, ModalToggleDirective, TableDirective } from '@coreui/angular';
import { AddStoreModalComponent } from '../../pages/add-store-modal/add-store-modal.component';
import { EditStoreModalComponent } from '../../pages/edit-store-modal/edit-store-modal.component';
import { StoreService } from 'src/app/commons/services/Store/store.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-store',
  imports: [CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    TableDirective,
    ModalToggleDirective,
    ModalComponent,
    ReactiveFormsModule,
    FormsModule,
    AddStoreModalComponent,
    EditStoreModalComponent,
    CommonModule
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
  standalone: true
})
export class StoreComponent {

  stores:any[]=[];
  type:number=0;
  searchtype:number=0;
  searchtext:string='';

  constructor(private api:StoreService){}
  ngOnInit(){

    this.api.FetchStores().subscribe({
        next:(response: any) =>{
          this.stores=response.data;
        }
      })
}

    FilterStore(){
    this.api.searchStores(this.type,this.searchtype,this.searchtext).subscribe({
      next:(response: any) =>{
        this.stores=response.data;
      }
    })
    }


    reset(){
      this.type=0;
      this.searchtype=0;
      this.searchtext='';
      this.FilterStore();
    }
}
