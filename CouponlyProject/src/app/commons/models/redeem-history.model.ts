export interface RedeemHistory {
    id: number;
    redeemCouponCode: string;
    redeemCouponName: string;
    user: string;
    store: string;
    date: string; // ISO date string
    // Add any other fields that are relevant to the redeem history
}
