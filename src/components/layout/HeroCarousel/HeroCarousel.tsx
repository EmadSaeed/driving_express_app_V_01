"use client"

import styles from "./heroCarousel.module.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


import Image from "next/image"

const slides = [
    "/images/slide1.jpg",
    "/images/slide2.jpg",
    "/images/slide3.jpg",
    "/images/slide4.jpg",
    "/images/slide5.jpg",
]

export default function HeroCarousel() {


    return (
        <div className={styles.heroCarousel}>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {slides.map((src, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="keen-slider__slide">
                            <Image
                                width={1240}
                                height={344}
                                src={src}
                                alt={`Slide ${idx + 1}`}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    )
}
