import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardHeaderComponent, CardModule, FormModule, GridModule, InputGroupComponent, ModalBodyComponent, ModalComponent, ModalDialogComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { CouponService } from '../../../../commons/services/Coupon/coupon.service';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';

@Component({
  selector: 'app-ai-image-modal',
  imports: [
    CardBodyComponent,
    CardHeaderComponent,
    ModalToggleDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonDirective,
    InputGroupComponent,
    GridModule,
    FormModule,
    CommonModule,
    FormsModule,
    CardModule
  ],
  templateUrl: './ai-image-modal.component.html',
  styleUrl: './ai-image-modal.component.scss'
})
export class AiImageModalComponent implements OnInit {

  @Input() coupon: any; 
  @Output() couponUrl = new EventEmitter<string>();
  
  public generationMethod: 'prompt' | 'default' = 'prompt';
  selectedCoupon: any = null;
  isGenerating: boolean = false;
  generatedCouponUrl: string = '';

  couponService = inject(CouponService);
  toast = inject(ToastService);
  
  ngOnInit(): void {

  }

  generateImage(promptInput: string) {
    this.isGenerating = true;

    if (this.generationMethod === 'prompt') {
      this.couponService.generateAiImage({prompt:promptInput ,storeId:this.coupon.storeId}).subscribe({
        next: (response) => {
          if(response.isSuccess == true && response.statusCode == 200){
            this.generatedCouponUrl = response.data.url;
            this.isGenerating = false;
          }else{
            this.toast.show({ type: 'error', message: 'Failed to generate image. Please try again.' });
            this.isGenerating = false;
          }
        },
        error: (error) => {
          this.toast.show({ type: 'error', message: 'An error occurred while generating the image.' });
          console.error('Error generating coupon:', error);
          this.isGenerating = false;
        }
      });
    }
    else {
      // console.log(this.buildKeywords(this.coupon));
      this.couponService.generateAiImage({prompt:this.buildKeywords(this.coupon) ,storeId:this.coupon.storeId}).subscribe({
        next: (response) => {
          if(response.isSuccess == true && response.statusCode == 200){
            this.generatedCouponUrl = response.data.url;
            this.isGenerating = false;
          }else{
            this.toast.show({ type: 'error', message: 'Failed to generate image. Please try again.' });
            this.isGenerating = false;
          }
        },
        error: (error) => {
          this.toast.show({ type: 'error', message: 'An error occurred while generating the image.' });
          console.error('Error generating coupon:', error);
          this.isGenerating = false;
        }
      });
    }
  }


  submitGeneratedImage() {
    this.couponUrl.emit(this.generatedCouponUrl);
  }

  private loadPreviouslyGeneratedImages(storeId: number) {
    
  }

  private buildKeywords(couponObj: Record<string, any>): string {
    const keywords: string[] = [];

    for (const [key, value] of Object.entries(couponObj)) {
      if (value === null || value === undefined) continue;

      // Skip storeId field
      if (key.toLowerCase() === "storeid") continue;

      // For nested objects, flatten them
      if (typeof value === "object" && !Array.isArray(value)) {
        for (const [innerKey, innerValue] of Object.entries(value)) {
          keywords.push(`${key}-${innerKey}-${innerValue}`.toLowerCase());
        }
      } else {
        keywords.push(`${key}-${value}`.toLowerCase());
      }
    }
    return keywords.join(", ");
  }
}
