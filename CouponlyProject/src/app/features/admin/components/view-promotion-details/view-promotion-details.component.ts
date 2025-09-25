import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective, CardComponent, CardModule, ColComponent, FormModule, SpinnerComponent } from '@coreui/angular';
import { PromotionService } from '../../../../commons/services/Promotion/promotion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-promotion-details',
  imports: [
    SpinnerComponent,
    CommonModule,
    CardModule,
    CardComponent,
    ColComponent,
    ButtonDirective
  ],
  templateUrl: './view-promotion-details.component.html',
  styleUrl: './view-promotion-details.component.scss'
})
export class ViewPromotionDetailsComponent {
  promotion: any;
  today: Date = new Date();
  constructor(private promotionService: PromotionService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    const promotionId = this.route.snapshot.paramMap.get('id');
    if (promotionId) {
      const id = parseInt(promotionId, 10);
      this.promotionService.getPromotionById(id).subscribe(promotion => {
        this.promotion = promotion.data;
        this.promotion.date = new Date(this.promotion.date);
        console.log(this.promotion);
        console.log(this.today);
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
