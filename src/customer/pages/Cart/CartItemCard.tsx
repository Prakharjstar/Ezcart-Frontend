import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Divider, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { CartItem } from "../../../types/cartTypes";
import { useAppDispatch, useAppSelector } from "../../../State/store";
import { updateCartItem, deleteCartItem } from "../../../State/customer/CartSlice";

const CartItemCard = ({ item }: { item: CartItem }) => {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");

  // local quantity for instant UI updates
  const [quantity, setQuantity] = useState(item.quantity);

  // sync local quantity if Redux item changes (e.g., after fetching cart)
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  // handle + / - buttons
  const handleUpdateQuantity = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity < 1) return;

    setQuantity(newQuantity); // instant UI
    if (!jwt) return;

    dispatch(
      updateCartItem({
        jwt,
        cartItemId: item.id,
        cartItem: { quantity: newQuantity },
      })
    );
  };

  // handle remove
  const handleRemoveItem = () => {
    if (!jwt) return;
    dispatch(deleteCartItem({ jwt, cartItemId: item.id }));
  };

  // total price for this item
  const itemTotalPrice = item.sellingPrice * quantity;

  return (
    <div className="border rounded-md relative">
      <div className="p-5 flex gap-3">
        <div>
          <img className="w-[90px] rounded-md" src={item.product.images[0]} alt="" />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-lg">
            {item.product.seller?.businessDetails.businessName}
          </h1>
          <p className="text-gray-600 font-medium text-sm">{item.product.title}</p>
          <p className="text-gray-500 text-sm">
            <strong>quantity : </strong>{quantity}
          </p>
        </div>
      </div>

      <Divider />

      <div className="flex justify-between items-center px-5 py-2">
        <div className="flex items-center gap-2 w-[140px] justify-between">
          <Button onClick={() => handleUpdateQuantity(-1)} disabled={quantity <= 1}>
            <Remove />
          </Button>
          <span>{quantity}</span>
          <Button onClick={() => handleUpdateQuantity(1)}>
            <Add />
          </Button>
        </div>

        <div>
          <p className="text-gray-700 font-medium">₹{itemTotalPrice}</p>
        </div>
      </div>

      <div className="absolute top-1 right-1">
        <IconButton color="primary" onClick={handleRemoveItem}>
          <Close />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItemCard;