"use client"

import styles from "./verticalSlider.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import VSlide from "./VSlide";
import { dummyPosts } from "@/dummyData/dummyData";

const VerticalSlider = () => {
    return (
        <div className={styles.container}>
            <Swiper
                slidesPerView={4}
                spaceBetween={16}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    480: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
                modules={[Autoplay, Pagination,]}
                className="mySwiper"
            >
                {dummyPosts.map(post => (
                    <SwiperSlide key={post.id}><VSlide imgURL={post.mainPhotoURL} alt={post.alt} category={post.category} title={post.title} /></SwiperSlide>
                ))}
            </Swiper>
        </div >
    )
}

export default VerticalSlider