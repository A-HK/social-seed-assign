import capitalizeEachWord from '@/helpers/capitalizeEachWord';

import styles from '@/styles/CardStyles.module.css'

const CardBody = ({photo}) => {
    return (
        <div className={styles.cardBody}>
            <div className={styles.cardBodyTitle}>{capitalizeEachWord(photo.description) || capitalizeEachWord(photo.alt_description) || `The Coldest Sunset`}</div>
            <p className={styles.cardBodyDesc}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
        </div>
    )
}

export default CardBody;