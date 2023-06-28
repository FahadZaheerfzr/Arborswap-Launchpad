import React, { useState, useEffect } from 'react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import SlideContent from './SlideContent';
import axios from 'axios';
import { BACKEND_URL } from 'config/constants/LaunchpadAddress';

export default function Carousel({ mobileView }) {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/banner`); // Replace '/api/banners' with your actual API endpoint
        setBanners(response.data);
      } catch (error) {
        console.log('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  if (mobileView) {
    return (
      <CarouselProvider
        naturalSlideWidth={70}
        naturalSlideHeight={40}
        totalSlides={banners.length}
        isPlaying={true}
        interval={3000}
        visibleSlides={1.3}
      >
        <Slider>
          {banners.map((banner, index) => (
            <Slide key={index} index={index}>
              <SlideContent img1={banner.url} mobile />
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    );
  }

  return (
    <CarouselProvider naturalSlideWidth={70} naturalSlideHeight={15} totalSlides={banners.length} isPlaying={true} interval={3000}>
      <Slider>
        {banners.map((banner, index) => (
          <Slide key={index} index={index}>
            <SlideContent img1={banner.url} img2={banner.url2} img3={banner.url3} />
          </Slide>
        ))}
      </Slider>
    </CarouselProvider>
  );
}
