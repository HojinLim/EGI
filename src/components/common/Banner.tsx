import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const imageData = [
  {
    alt: 'image1',
    url: 'https://picsum.photos/100/100/?random=1'
  },
  {
    alt: 'image2',
    url: 'https://picsum.photos/100/100/?random=2'
  },
  {
    alt: 'image3',
    url: 'https://picsum.photos/100/100/?random=3'
  },
  {
    alt: 'image4',
    url: 'https://picsum.photos/100/100/?random=4'
  },
  {
    alt: 'image5',
    url: 'https://picsum.photos/100/100/?random=5'
  }
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleChange(index: number) {
    setCurrentIndex(index);
  }

  const renderSlides = imageData.map((image) => (
    <div key={image.alt}>
      <img src={image.url} alt={image.alt} style={{ width: '1200px', height: '300px' }} />
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
