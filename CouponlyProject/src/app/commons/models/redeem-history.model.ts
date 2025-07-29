export interface RedeemHistory {
    id: number;
    couponCode: string;
    couponName: string;
    userName: string;
    storeName: string;
    redeemDate: string; // ISO date string
    // Add any other fields that are relevant to the redeem history
}
