import styles from "./vSlide.module.css";
import Image from "next/image";

type VSlideProps = {
    imgURL: string;
    alt: string;
    category: string;
    title: string;
}

const VSlide = ({ imgURL, alt, category, title }: VSlideProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image alt={alt} src={imgURL} fill style={{ objectFit: 'cover' }} />
            </div>
            <h2 className={styles.categoryName}>{category}</h2>
            <h3 className={styles.title}>{title}</h3>
        </div>
    )
}

export default VSlide