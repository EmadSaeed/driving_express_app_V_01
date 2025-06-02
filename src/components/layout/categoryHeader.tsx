import Image from 'next/image';
import { dummyCategory } from '@/dummyData/dummyData';

const CategoryHeader = () => {
    return (
        <div className="w-full bg-DX_blue py-6 sm:py-8">
            <div className="max-w-7xl w-full h-full px-4 mx-auto flex items-center">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                    <Image
                        src={dummyCategory[0].iconURL
                            ? dummyCategory[0].iconURL
                            : '/icons/default-icon.svg'
                        }
                        alt="category icon"
                        fill
                        style={{ objectFit: 'contain' }}
                        sizes="48px, (min-width: 640px) 64px"
                        className="object-contain"
                    />
                </div>
                <div className="ml-4 flex flex-col justify-center">
                    <h1 className="text-white text-2xl sm:text-3xl font-bold">
                        {dummyCategory[0].title}
                    </h1>
                    <span className="text-white text-base leading-6 pt-2 pl-0.5 w-[70%] sm:w-full">
                        {dummyCategory[0].slogan}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CategoryHeader;
