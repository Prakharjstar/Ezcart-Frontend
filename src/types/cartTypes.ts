export interface CartItem {
  mrpPrice: number;
  sellingPrice: number;
  id: number;
  product: any;
  quantity: number;
  size: string;
}

export interface Cart {
  id: number;
  user: any;
  cartItems: CartItem[];

  totalSellingPrice: number;
  totalItem: number;
  totalMrpPrice: number;

  discountAmount: number;
  finalPrice: number;

  couponCode: string | null;
}