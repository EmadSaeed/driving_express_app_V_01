"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { dummyPosts } from "@/dummyData/dummyData";
import SCSlide from "./SCSlide/SCSlide";

const SubCategorySection = () => {
    return (
        <div id="subCategorySection" className="w-full sm:mb-12">
            <div className="w-full ">
                <div className="w-full mt-4 sm:px-4 mx-auto flex flex-col md:w-[90%] lg:w-[80rem]">
                    <h2 className="
                        w-full px-4 sm:mt-4
                        text-[1.5rem] sm:text-2xl md:text-[2rem] lg:text-[2.25rem]
                        text-left font-bold text-DX_blue dark:text-white
                    ">
                        How to drive a car
                    </h2>
                    <p className="
                        w-full sm:mt-2 px-4
                        text-[1rem] leading-6 sm:text-[1.1rem] sm:leading-7 md:text-[1.15rem] md:leading-7 lg:text-[1.25rem] lg:leading-7
                        text-left
                        text-DX_blue dark:text-white
                    ">
                        Are you a keen learner? Below are a list of questions you will have when taking your driving lessons.
                    </p>
                </div>
                <div className="
                    relative w-full mt-6 sm:mt-8
                   h-[330px]
                ">
                    <Swiper
                        modules={[Navigation]}
                        navigation={true}
                        slidesPerView="auto"
                        slidesPerGroup={1}
                        spaceBetween={16}
                        watchOverflow={true}
                        slidesOffsetAfter={1000}
                        className="mySwiper"
                    >
                        {dummyPosts.map(post => (
                            <SwiperSlide key={post.id}>
                                <div className="
                                    w-full
                                    h-[310px]
                                    bg-[#ccc] rounded-xl shadow-md overflow-hidden
                                ">
                                    <a href={`${post.category}/${post.slug}`}> <SCSlide imgURL={post.mainPhotoURL} alt={post.alt} title={post.title} /></a>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default SubCategorySection;
