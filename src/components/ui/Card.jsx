import Link from 'next/link';
import Image from 'next/image';

import CardProfileHeader from './CardProfileHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';

import styles from '@/styles/CardStyles.module.css'

const Card = ({ photo, index }) => {
  return (
    <div className={styles.cardWrapper} key={`${photo.id}-${index}`} >
        <Link href={`/profile/${photo.user.username}`}>
            <CardProfileHeader photo={photo} />
        </Link>
        <Image 
            className={styles.cardImg} 
            src={`https://source.unsplash.com/${photo.id}`} 
            alt={photo.alt_description || `unsplash photo`} 
            width={300} 
            height={300}
            blurDataURL={photo.blur_hash}
        />
        <CardBody photo={photo} />
        <CardFooter photo={photo} />
  </div>
  );
};

export default Card;