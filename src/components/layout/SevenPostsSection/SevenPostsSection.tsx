import styles from "./sevenPostsSection.module.css";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import LargeCard from "@/components/layout/SevenPostsSection/LargeCard";
import SmallCard from "@/components/layout/SevenPostsSection/SmallCard";
import { dummyPosts } from "@/dummyData/dummyData";

const SevenPostsSection = () => {
    return (
        <div className={styles.container}>
            <div className={styles.catTitleWrapper}>
                <div className={styles.side}>
                    <h2 className={styles.catTitle}><a>Learn to drive</a></h2>
                    <MdOutlineArrowForwardIos />
                </div>
                <div className={styles.side}>
                    <h2 className={styles.more}><a>View more</a></h2>
                    <MdOutlineArrowForwardIos />
                </div>
            </div>

            <ul className={styles.gridContainer}>
                {dummyPosts.slice(0, 1).map(post => (
                    <li key={post.id} className={`${styles.item} ${styles.item1}`}>
                        <LargeCard
                            mainPhotoURL={post.mainPhotoURL}
                            alt={post.alt}
                            title={post.title}
                            intro={post.excerpt}
                        />
                    </li>
                ))}

                {dummyPosts.slice(1, 7).map(post => (
                    <li key={post.id} className={styles.item}>
                        <SmallCard
                            mainPhotoURL={post.mainPhotoURL}
                            alt={post.alt}
                            title={post.title}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SevenPostsSection;
