export interface RedeemHistory {
    id: number;
    couponCode: string;
    couponName: string;
    user: string;
    store: string;
    redeemDate: string; // ISO date string
    // Add any other fields that are relevant to the redeem history
}
