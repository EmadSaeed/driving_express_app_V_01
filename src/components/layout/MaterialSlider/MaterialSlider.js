'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import Image from 'next/image';
// import './MaterialSlider.css'; // We'll import the custom CSS

import { EffectCoverflow, Pagination } from 'swiper/modules';

const slides = [
    '/images/photo-1.jpg',
    '/images/photo-2.jpg',
    '/images/photo-3.jpg',
    '/images/photo-4.jpg',
    '/images/photo-5.jpg',
    '/images/photo-6.jpg',
    '/images/photo-7.jpg',
    '/images/photo-8.jpg',
    '/images/photo-9.jpg',
    '/images/photo-10.jpg',
];

export default function MaterialSlider() {
    return (
        <div className="swiper-material swiper-container m-auto">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={2}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 80,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Pagination]}
                className="swiper-wrapper"
            >
                {slides.map((src, idx) => (
                    <SwiperSlide key={idx} className="swiper-slide">
                        <div className="swiper-material-wrapper">
                            <Image src={src} alt={`Slide ${idx + 1}`} fill className="demo-material-image" />
                            <div className="demo-material-label">Image {idx + 1}</div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
