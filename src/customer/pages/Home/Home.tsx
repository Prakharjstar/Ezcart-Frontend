import React from "react";
import ElectricCategoryCard from "./ElectricCategory/ElectricCartegoryCard";
import ElectricCategory from "./ElectricCategory/ElectricCategory";
import CategoryGrid from "./CategoryGrid/CategoryGrid";




const Home = ()=>{

return (
<>
<div  className= 'space-y-5 lg:space-y-10 relative' >

 <ElectricCategory/>
 <CategoryGrid/>

</div>

</>




)


}
export default Home