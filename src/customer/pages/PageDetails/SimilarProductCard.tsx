import React from "react";

const SimilarProductCard =()=>{

    return (
        <div>

         <div className="group px-4 relative">
            <div >
                 <img className='card-media object-top' src={"http://res.cloudinary.com/dxoqwusir/image/upload/v1727451023/green_1_tm1yuw.jpg"} alt=""    />
            
           
            
            </div>

            <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
                <div className="name">
                    <h1>MOHEYS</h1>
                    <p> Red Saree</p>

                </div>

                <div className="price flex items-center gap-3">

                <span className="font-sans text-gray-800"> rs 1200
                </span>
                <span className="thin-line-through text-gray-400"> rs 2000</span>
                <span className="text-green-500 font-semibold">60%</span> 


                </div>

            </div>

          

        </div>


            
        </div>

    )


}

export default SimilarProductCard;