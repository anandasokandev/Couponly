export interface CouponType {
  id: number;
  name: string;
}

export interface Coupon {
  title: string;
  description: string;
  code: string;
  couponType: CouponType | null;
  discount: number | null;
  minimumAmount: number | null;
  userLimit: number;
  validFrom: string;
  validUntil: string;
}