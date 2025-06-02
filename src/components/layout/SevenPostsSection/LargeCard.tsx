import styles from "./largeCard.module.css";
import Image from "next/image";


type LargeCardProps = {
    title: string;
    mainPhotoURL: string;
    alt: string;
    intro: string;
};


const LargeCard = ({ mainPhotoURL, alt, title, intro }: LargeCardProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                < Image src={mainPhotoURL} alt={alt} fill style={{ objectFit: 'cover' }} />
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p>{intro}</p>

        </div>
    )
}

export default LargeCard