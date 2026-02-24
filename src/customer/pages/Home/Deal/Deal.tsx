import React from "react";
import DealCard from "./DealCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppSelector } from "../../../../State/store";

const Deal = () => {
  const { customer } = useAppSelector((store) => store);

  const settings = {
  dots: false,
  infinite: true,
  speed: 300,        // faster slide transition (ms)
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,  // 1 second per slide
  pauseOnHover: true,
  cssEase: "linear",     // smooth continuous scrolling
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } }
  ]
};

  return (
    <div className='py-5 lg:px-20'>
      <Slider {...settings}>
        {customer.homePageData?.deals.map((item) => (
          <DealCard key={item.id} item={item} />
        ))}
      </Slider>
    </div>
  );
};

export default Deal;