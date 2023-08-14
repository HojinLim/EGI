import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
// import bannerimage1 from '../bannerimage/banner_main.jpg';
import bannerimage2 from '../bannerimage/bannermain2.jpg';
import bannerimage3 from '../bannerimage/banneriphone.jpg';
import bannerimage4 from '../bannerimage/banner_samsung.png';
import bannerimage5 from '../bannerimage/banner_other.png';
import bannerimage6 from '../bannerimage/lck.png';

const imageData = [
  // {
  //   alt: 'image1',
  //   src: bannerimage1
  // },

  {
    alt: 'image3',
    src: bannerimage3
  },

  {
    alt: 'image4',
    src: bannerimage4
  },
  {
    alt: 'image5',
    src: bannerimage5
  },
  {
    alt: 'image6',
    src: bannerimage6
  },
  {
    alt: 'image2',
    src: bannerimage2
  }
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleChange(index: number) {
    setCurrentIndex(index);
  }

  const renderSlides = imageData.map((image) => (
    <div key={image.src}>
      {image.src ? (
        <img src={image.src} alt={image.alt} style={{ width: '1500px', height: '500px' }} />
      ) : (
        <img src={image.src} alt={image.alt} style={{ width: '1500px', height: '500px' }} />
      )}
    </div>
  ));

  return (
    <div>
      <Carousel
        showArrows={true}
        autoPlay={true}
        interval={5000}
        infiniteLoop={true}
        showThumbs={false}
        selectedItem={currentIndex}
        onChange={handleChange}
        className="w-[400px] lg:hidden"
      >
        {renderSlides}
      </Carousel>
    </div>
  );
};

export default Banner;
