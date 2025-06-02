import Image from "next/image";

type SideRelatedCardProps = {
    title: string;
    slug: string;
    mainPhotoURL: string;
    alt: string;
};

const SideRelatedCard = ({ mainPhotoURL, alt, title, slug }: SideRelatedCardProps) => {
    return (
        <div className="mb-4">
            <a href={slug}>
                <div className="relative w-full aspect-[1/0.65] overflow-hidden">
                    <Image
                        src={mainPhotoURL}
                        alt={alt}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 300px"
                    />
                </div>
                <h3 className="text-[1rem] font-semibold leading-6 pt-2 text-black dark:text-white">{title}</h3>
            </a>
        </div >
    );
};

export default SideRelatedCard;
