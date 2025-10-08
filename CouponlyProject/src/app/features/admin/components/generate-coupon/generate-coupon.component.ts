import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, CardComponent, CardHeaderComponent, CardModule, ColComponent, FormModule, GridModule, ModalComponent, ModalModule, ModalToggleDirective, TableDirective, TabsComponent } from '@coreui/angular';
import { CouponService } from '../../../../commons/services/Coupon/coupon.service';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';
import { Coupon, CouponType } from '../../../../commons/models/coupon.model' 
import { ImageUploadService } from '../../../../commons/services/ImageUpload/image-upload.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generate-coupon',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    GridModule,
    CardModule,
    ModalModule,
    ButtonModule
  ],
  templateUrl: './generate-coupon.component.html',
  styleUrls: ['./generate-coupon.component.scss']
})
export class GenerateCouponComponent implements OnInit {
  activeTab: string = 'upload';

  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null;
  today: string = '';

  aiImage: string | null = null;
  couponTypeList: CouponType [] = [];
  isUserLimit: boolean = false;
  storeId!: number;
  userId = sessionStorage.getItem('userId');
  prompt: string = ''
  loading: boolean = false;
  aiText: string = ''

  coupon: Coupon = {
    title: '',
    description: '',
    code: '',
    couponType: null,
    discount: null,
    minimumAmount: null,
    userLimit: false,
    userLimitCount: 1,
    validFrom: '',
    validUntil: ''
  };

  constructor(
    private couponApi: CouponService, 
    private toastService: ToastService, 
    private imageUpload: ImageUploadService, 
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
    this.storeId = params['id'];
  });
  }

  ngOnInit(): void {

    const now = new Date();
    this.today = now.toISOString().split('T')[0];

    console.log(this.userId);
    console.log(this.isUserLimit);
    
    this.couponApi.getCouponType().subscribe({
      next: (data: any) => {
        if(data.isSuccess){
          console.log(data);
          this.couponTypeList = data.data;
        }
      },
      error: (err: any) => {
        this.toastService.show({ type: 'error', message: `Failed to load coupon types` });
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  ngOnChange(): void {
    console.log(this.coupon.couponType);
  }

  onUserLimitChange(value: boolean | null): void {
    console.log(value);
    if (value === false) {
    this.coupon.userLimitCount = 0;
  }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log(this.selectedFile);
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  generateAICoupon() {
    this.aiImage = 'https://via.placeholder.com/400x200.png?text=AI+Generated+Coupon';
  }

  private initialCoupon(): Coupon {
    return {
      title: '',
      description: '',
      code: '',
      couponType: null,
      discount: null,
      minimumAmount: null,
      userLimit: false,
      userLimitCount: 1,
      validFrom: '',
      validUntil: ''
    };
  }

  saveCoupon() {
    console.log(this.coupon);
    
    
    this.imageUpload.UploadImage(this.selectedFile!).subscribe({
      next: (res: any) => {
          if (res.status && res.url) {
            const payload = this.buildPayload(res.url);
            console.log(payload);
            this.couponApi.GenerateCoupon(payload).subscribe({
              next: (res : any )=>{
                this.toastService.show({ type: 'success', message: 'Coupon Generated Successfully' });
                console.log('Coupon Generated Successfully');
                setTimeout(()=>{
                  this.router.navigate(['/admin/couponlist'])
                },5000);
              },
              error:( err: any) => {
                this.toastService.show({ type: 'error', message: 'Coupon generation failed' });
              } 
            })
          }
        },
        error:( err: any) => {
          this.toastService.show({ type: 'error', message: 'Failed to upload coupon image' });
        }
    })
  }

  
private buildPayload(url: string): any {
  return {
    name : this.coupon.title,
      couponCode : this.coupon.code,
      description : this.coupon.description,
      typeId : this.coupon.couponType?.id,
      userLimit: this.coupon.userLimit,
      userLimitCount : this.coupon.userLimitCount,
      discountPercentage : this.coupon.discount,
      startingDate: this.coupon.validFrom,
      endingDate: this.coupon.validUntil,
      minAmount: this.coupon.minimumAmount,
      storeId: this.storeId,
      createdBy: this.userId,
      couponImage: url
  };
}
}
