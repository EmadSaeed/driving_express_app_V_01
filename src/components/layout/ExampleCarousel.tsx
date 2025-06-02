'use client';
import React from 'react';
import Image from 'next/image';

import { dummyPosts } from '@/dummyData/dummyData';
import Autoplay from 'embla-carousel-autoplay';


import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from '@/components/ui/carousel';


const ExampleCarousel = () => {
    const autoplay = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false })
    );

    return (
        <Carousel
            opts={{ loop: true }}
            plugins={[autoplay.current]}
            className="w-full mx-auto"
        >
            <CarouselPrevious />
            <CarouselContent>
                {dummyPosts.map((post, index) => (
                    <CarouselItem key={index} className="p-4">
                        <div className="relative rounded-lg p-40 text-center text-xl font-semibold">
                            <Image src={post.mainPhotoURL} alt={post.alt} fill style={{ objectFit: 'cover' }} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext />
        </Carousel>
    );
};

export default ExampleCarousel;
