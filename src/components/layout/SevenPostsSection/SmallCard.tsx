import styles from "./smallCard.module.css";
import Image from "next/image";


type SmallCardProps = {
    mainPhotoURL: string;
    alt: string;
    title: string;
};


const SmallCard = ({ mainPhotoURL, alt, title }: SmallCardProps) => {
    return (
        <div className={styles.smallCardContainer}>
            <div className={styles.imgContainer}>
                < Image src={mainPhotoURL} alt={alt} fill style={{ objectFit: 'cover' }} />
            </div>
            <h3 className={styles.title}>{title}</h3>
        </div>
    )
}

export default SmallCard