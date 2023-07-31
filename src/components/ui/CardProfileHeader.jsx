import Image from 'next/image';

import styles from '@/styles/CardStyles.module.css'

const CardProfileHeader = ({photo}) => {
    return (
        <div className={styles.upperDiv}>
            <div className={styles.profileWrapper}>
                <Image 
                className={styles.profilePicture} 
                src={photo.user.profile_image.small} 
                alt={photo.alt_description || `unsplash photo`} 
                width={100} 
                height={100}
                blurDataURL={photo.blur_hash}
                />
            <p className={styles.profileName}>{photo.user.username}</p>
            </div>
      </div>
    )
}

export default CardProfileHeader;