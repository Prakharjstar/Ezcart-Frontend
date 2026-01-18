export interface PickupAddress {
    id: number;
    name: string;
    locality: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    mobile: string;
}
export interface BankDetails {
    accountNumber: string;
    accountHolderName: string;
    ifscCode: string;
}

export interface BusinessDetails {
    businessName: string,
}
export interface Seller {
    id?: number;
    sellerName: string;
    mobile: string;
    email: string;
    password: string;
    businessDetails: BusinessDetails;
    bankDetails: BankDetails;
    pickupAddress: PickupAddress;
    GSTIN: string;
    accountStatus?: string;
    otp: string,
}
export interface SellerEarnings {
    id: number;
    seller: Seller;
    totalEarnings: number;
    totalSales: number;
    totalRefunds: number;
    totalTax: number;
    netEarnings: number;
    totalOrders: number;
    canceledOrders: number;
    totalTransactions: number;
}