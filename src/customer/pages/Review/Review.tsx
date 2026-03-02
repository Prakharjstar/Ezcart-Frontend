import React, { useEffect, useState } from "react";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ReviewCard from "./ReviewCard";
import { Divider } from "@mui/material";
import ReviewBarCard from "./ReviewBarCard";
import { useParams, Link } from "react-router-dom";

const Review= ()=>{
    const { productId } = useParams();
    const [localReviews, setLocalReviews] = useState<any[]>([]);

    useEffect(()=>{
        if(!productId) return;
        const key = `reviews_${productId}`;
        const arr = JSON.parse(localStorage.getItem(key) || "[]");
        setLocalReviews(arr || []);
    }, [productId]);
    return(
        <div className="p-5 lg:px-20 flex flex-col lg:flex-row gap-20">
            <section className="w-full md:w-1/2 lg:w-[30%] space-y-2">
            <img src="http://res.cloudinary.com/dxoqwusir/image/upload/v1727451187/SoftSilkZariBanarasiSaree_1_fwms3w.jpg" alt="" />
            
            <div>
                <div>
                    <p className="font-bold text-xl">Vicky Clothing</p>
                    <p className="text-lg text-gray-600">Women's Saree</p>
                </div>

                <div>
                        <div className="price flex items-center gap-3 mt-5 text-2xl">

                <span className="font-sans text-gray-800"> <CurrencyRupeeIcon/>1200
                </span>
                <span className="line-through text-gray-400"> <CurrencyRupeeIcon/>2000</span>
                <span className="text-green-500 font-semibold">60%</span> 


                </div>

               
                    </div>
            </div>
            </section>
            
            <section></section>

            <section className="space-y-5 w-full">
               
                   <ReviewBarCard/>
                                {localReviews.length === 0 ? (
                                        <div className="text-center py-8">
                                            <p className="text-gray-600">No reviews yet. Be the first to review this product.</p>
                                            <div className="mt-4"><Link to={`/reviews/${productId}/create`} className="text-blue-600 underline">Write a review</Link></div>
                                        </div>
                                ) : (
                                        localReviews.map((r)=> (
                                            <div key={r.id} className="spy3 space-y-3">
                                                <ReviewCard
                                                    review={r}
                                                    onDelete={(id) => {
                                                        if (id == null) return;
                                                        // remove review with this id from any reviews_* key
                                                        Object.keys(localStorage).forEach((k) => {
                                                            if (!k.startsWith("reviews_")) return;
                                                            try {
                                                                const arr = JSON.parse(localStorage.getItem(k) || "[]");
                                                                const updated = (arr || []).filter((x: any) => String(x.id) !== String(id));
                                                                localStorage.setItem(k, JSON.stringify(updated || []));
                                                            } catch (e) {}
                                                        });

                                                        // refresh current list
                                                        const key = `reviews_${productId}`;
                                                        const newList = JSON.parse(localStorage.getItem(key) || "[]");
                                                        setLocalReviews(newList || []);
                                                    }}
                                                />
                                                <Divider/>
                                            </div>
                                        ))
                                )}
              
            </section>

        </div>

    )
}
export default Review