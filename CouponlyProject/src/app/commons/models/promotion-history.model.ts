export interface PromotionHistory {
    id: number;
    campaignName: string;
    couponName: string;
    contacts: number;
    amount: number;
    store: string;
    date: string; // ISO date string
    // Add any other fields that are relevant to the redeem history
}
