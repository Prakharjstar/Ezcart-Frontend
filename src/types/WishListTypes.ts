import { Product } from "./ProductTypes";
import { User } from "./userTypes";

 export interface WishList {
    id: number;
    user: User;
    products:Product[];
 }

 export interface WishlistState {
    wishlist: WishList |null;
    loading: boolean;
    error: string |null;
 }

 export interface AddProductToWishlistPayload {
    wishlistId  :number;
    productId : number;
 }