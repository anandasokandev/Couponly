import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalModule, ModalToggleDirective } from '@coreui/angular';
import { CostSettingService } from '../../../../../commons/services/Promotion/cost-setting.service';
import { CostSetting } from '../../../../../commons/models/CostSetting.model';

@Component({
  selector: 'app-promotion-calculator-model',
  imports: [
    ModalComponent,
    ModalModule,
    ModalToggleDirective,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonDirective,
    CommonModule
  ],
  templateUrl: './promotion-calculator-model.component.html',
  styleUrls: ['./promotion-calculator-model.component.scss']
})
export class PromotionCalculatorModelComponent {

  @Input() campaign: any;
  

  ngOnInit() {
    
  }

  constructor(private costService: CostSettingService) {
    
  }

    
}
