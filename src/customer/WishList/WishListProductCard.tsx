import React from 'react'
import { Product } from '../../types/ProductTypes'

const WishListProductCard = ({item}: {item:Product}) => {
  return (
    <div className='w-60 relative'>
        <div className='w-full'>

            <img src = {item.images[0]} className='object-top w-full' alt=""/>

        </div>

        <div className='pt-3 space-y-1 '>
            <p>{item.title}</p>
            <div className="price flex items-center gap-3">

                <span className="font-sans text-gray-800">{item.sellingPrice}
                </span>
                <span className="thin-line-through text-gray-400">{item.mrpPrice}</span>
                <span className="text-green-500 font-semibold">{item.discountPercent}%</span> 


                </div>

        </div>

    </div>
  )
}

export default WishListProductCard
