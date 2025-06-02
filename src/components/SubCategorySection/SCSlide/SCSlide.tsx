import Image from "next/image";

type VSCSlideProps = {
    imgURL: string;
    alt: string;
    title: string;
}

const SCSlide = ({ imgURL, alt, title }: VSCSlideProps) => {
    return (
        <div className="w-full h-full relative">
            <h3 className="absolute bottom-0 left-0 z-40 text-white text-[1.2rem] font-semibold p-4">
                {title}
            </h3>
            <div className="absolute top-0 left-0 w-full h-full z-30 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <div className="w-full h-full overflow-hidden relative">
                <Image alt={alt} src={imgURL} fill style={{ objectFit: 'cover' }} />
            </div>
        </div>
    )
}

export default SCSlide;
