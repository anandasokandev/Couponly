import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  
  //#region Decorators

  @Input() coupon: any; 
  @Output() couponUrl = new EventEmitter<string>();
  @ViewChild('closeButton') closeButton!: ElementRef;
  //#endregion
  
  //#region Variables

  generationMethod: 'prompt' | 'default' = 'prompt';
  selectedCoupon: any = null;
  isGenerating: boolean = false;
  generatedCouponUrl: string = '';
  previouslyGeneratedImages: any[] = [];

  //#endregion

  //#region DI
  couponService = inject(CouponService);
  toast = inject(ToastService);
  //#endregion
  
  //#region Lifecycle Hooks
  ngOnInit(): void {
    this.loadPreviouslyGeneratedImages(this.coupon.storeId);
  }
  //#endregion

  //#region Generate Image
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
  //#endregion

  //#region Submit Generated Image & Close Modal
  submitGeneratedImage() {
    this.couponUrl.emit(this.generatedCouponUrl);
    this.closeModal();
  }
  //#endregion

  //#region Select Previously Generated Image
  selectPreviouslyGeneratedImage(image: any) {
    this.selectedCoupon = image;
    this.generatedCouponUrl = image.imageUrl;
  }
  //#endregion
  
  //#region Load Previously Generated Images to display
  private loadPreviouslyGeneratedImages(storeId: number) {
    this.couponService.getAiGeneratedImages(storeId).subscribe({
      next: (response) => {
        console.log(response.data);
        
        if(response.isSuccess == true && response.statusCode == 200 && response){
          this.previouslyGeneratedImages = response.data;
        }else{
          this.toast.show({ type: 'error', message: 'Failed to load previously generated images.' });
        }
      },
      error: (error) => {
        this.toast.show({ type: 'error', message: 'An error occurred while loading previously generated images.' });
        console.error('Error loading images:', error);
      }
    });
  }
  //#endregion

  //#region Build Keywords from Coupon Object

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

  //#endregion

  //#region Close Modal
  closeModal(): void {
    this.closeButton.nativeElement.click();
  }
  //#endregion
}
