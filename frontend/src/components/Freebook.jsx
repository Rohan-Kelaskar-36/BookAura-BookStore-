import React, { useState,useEffect } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';
import axios from 'axios';

function Freebook() {
  const [book, setBook] = useState([]);

  useEffect(()=> {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        console.log(res.data);
        const data = res.data.filter((data) => data.category === "free");
        setBook(data);
      } catch (error) {
        console.log("Error", error);
      }
    };

    getBook(); 
  }, []);
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
  return (
    <>
    <div className="py-1 max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-900 dark:text-white">
        <div><h1 className="font-semibold text-xl pb-2">Free Offered Books</h1>
        <p>Free books provide accessible reading materials at no cost, offering valuable knowledge and entertainment to a wide audience. These resources promote literacy, education, and creativity by making books available to those who may not have access otherwise.</p></div>
    <div className="my-5">
    <Slider {...settings}>
        {book.map((item)=>(
            <Cards item={item} key={item.id}/>
        ))}
      </Slider>  
    </div>
    </div>
    </>
  )
}

export default Freebook
