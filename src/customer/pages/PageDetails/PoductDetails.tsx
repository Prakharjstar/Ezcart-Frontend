import React, { useEffect, useState } from "react";
import StarRateIcon from '@mui/icons-material/StarRate';
import { teal } from "@mui/material/colors";
import { Button, Divider } from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddIcon from '@mui/icons-material/Add';
import { AddShoppingCart, FavoriteBorder, Remove, Shield, Wallet, WorkspacePremium, LocalShipping } from "@mui/icons-material";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../Review/ReviewCard";
import { useAppDispatch, useAppSelector } from "../../../State/store";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../State/customer/ProductSlice";
import { addItemToCart, fetchUserCart } from "../../../State/customer/CartSlice";
import { addProductToWishlist, getWishlistByUserId } from "../../../State/customer/WishListSlice";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const dispatch = useAppDispatch();
  const { product } = useAppSelector(store => store.product);
  const { wishlist } = useAppSelector(store => store.wishlist);
  const { jwt } = useAppSelector(store => store.auth);

  const { productId } = useParams();

  // Fetch product details
  useEffect(() => {
    if (productId) dispatch(fetchProductById(Number(productId)));
  }, [productId]);

  // Fetch wishlist if user logged in
  useEffect(() => {
    if (jwt) dispatch(getWishlistByUserId());
  }, [jwt]);

  // Cart handler
  const handleAddToCart = () => {
    if (!jwt) {
      alert("Please login to add items to cart");
      return;
    }

    dispatch(
      addItemToCart({
        jwt,
        request: {
          productId: product?.id,
          size: product?.sizes[0] || "M",
          quantity,
        },
      })
    ).then(() => {
      dispatch(fetchUserCart(jwt));
    });
  };

  // Wishlist handler
  const handleAddToWishlist = () => {
    if (!jwt) {
      alert("Please login to add items to wishlist");
      return;
    }
    if (!product?.id) return;

    dispatch(addProductToWishlist({ productId: product?.id })).then(() => {
      dispatch(getWishlistByUserId());
    });
  };

  // Check if product is already in wishlist
  const isInWishlist = wishlist?.products?.some(
    (item: any) => item.id === product?.id
  );

  const handleActiveImage = (index: number) => () => {
    setActiveImage(index);
  };

  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {product?.images.map((img, idx) => (
              <img
                key={idx}
                onClick={handleActiveImage(idx)}
                className="lg:w-full w-[50px] cursor-pointer rounded-md"
                src={img}
                alt=""
              />
            ))}
          </div>
          <div className="w-full lg:w-[85%]">
            <img
              className="w-full rounded-md"
              src={product?.images[activeImage]}
              alt=""
            />
          </div>
        </section>

        {/* Product Info */}
        <section>
          <h1 className="font-bold text-lg text-primary-color">
            {product?.seller?.businessDetails.businessName}
          </h1>
          <p className="text-gray-500 font-semibold">{product?.title}</p>

          <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center">
              <span>4</span>
              <StarRateIcon sx={{ color: teal[500], fontSize: "17px" }} />
            </div>
            <Divider orientation="vertical" flexItem />
            <span>234 Ratings</span>
          </div>

          <div className="price flex items-center gap-3 mt-5 text-2xl">
            <span className="font-sans text-gray-800">
              <CurrencyRupeeIcon />
              {product?.sellingPrice}
            </span>
            <span className="line-through text-gray-400">
              <CurrencyRupeeIcon />
              {product?.mrpPrice}
            </span>
            <span className="text-green-500 font-semibold">
              {product?.discountPercent}
            </span>
          </div>
          <p className="text-sm mt-2">
            Inclusive of all taxes. Free Shipping above{" "}
            <span className="text-2xl">
              <CurrencyRupeeIcon />1500
            </span>
          </p>

          {/* Highlights */}
          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-4">
              <Shield sx={{ color: teal[500] }} />
              <p>Authentic & Quality Assured</p>
            </div>
            <div className="flex items-center gap-4">
              <WorkspacePremium sx={{ color: teal[500] }} />
              <p>100% money back guarantee</p>
            </div>
            <div className="flex items-center gap-4">
              <LocalShipping sx={{ color: teal[500] }} />
              <p>Free shipping & Returns</p>
            </div>
            <div className="flex items-center gap-4">
              <Wallet sx={{ color: teal[500] }} />
              <p>Pay on delivery might be available</p>
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-7 space-y-2">
            <h1>QUANTITY</h1>
            <div className="flex items-center gap-2 w-[140px] justify-between">
              <Button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>
                <Remove />
              </Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity(quantity + 1)}>
                <AddIcon />
              </Button>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-12 flex items-center gap-5">
            <Button
              onClick={handleAddToCart}
              fullWidth
              variant="contained"
              startIcon={<AddShoppingCart />}
              sx={{ py: "1rem" }}
            >
              Add To Bag
            </Button>

            <Button
              onClick={handleAddToWishlist}
              fullWidth
              variant={isInWishlist ? "contained" : "outlined"}
              startIcon={<FavoriteBorder />}
              sx={{ py: "1rem" }}
              disabled={isInWishlist}
            >
              {isInWishlist ? "Added" : "WishList"}
            </Button>
          </div>

          {/* Description */}
          <div className="mt-5 font-semibold">
            <p>{product?.description}</p>
          </div>

          {/* Reviews */}
          <div className="mt-12 space-y-5">
            <ReviewCard />
            <Divider />
          </div>
        </section>
      </div>

      {/* Similar Products */}
      <div className="mt-20">
        <h1 className="text-lg font-bold text-center">Similar Product</h1>
        <div className="pt-5">
          <SimilarProduct />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;