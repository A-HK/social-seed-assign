import { useContext, useRef, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Image from 'next/image';

import styles from '@/styles/AppFeed.module.css'

const InfiniteList = () => {
  const { photos } = useContext(AppContext);
  const [visiblePhotos, setVisiblePhotos] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    console.log(photos)
    if (photos.length > 0) {
      setVisiblePhotos(photos);
    }
  }, [photos]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    });

    if (listRef.current) {
      observer.observe(listRef.current);
    }

    return () => {
      if (listRef.current) {
        observer.unobserve(listRef.current);
      }
    };
  }, [visiblePhotos]);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && photos.length > 0) {
      setVisiblePhotos((prevVisiblePhotos) => [...prevVisiblePhotos, ...photos]);
    }
  };

  const capitalizeEachWord = (inputString) => {
    if(inputString === null)
    {
       return null
    }
    return inputString
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <div>
      <div>
        {visiblePhotos.map((photo, index) => (
            <div className={styles.cardWrapper} key={`${photo.id}-${index}`} >
              
              <div className={styles.whiteDiv}>
                <div className={styles.profileWrapper}>
                    <Image 
                      className={styles.profilePicture} 
                      src={photo.user.profile_image.small} 
                      alt={photo.alt_description} 
                      width={100} 
                      height={100}
                      blurDataURL={photo.blur_hash}
                    />
                  <p className={styles.profileName}>{photo.user.name}</p>
                </div>
              </div>
              <Image 
                className={styles.cardImg} 
                src={`https://source.unsplash.com/${photo.id}`} 
                alt={photo.alt_description} 
                width={300} 
                height={300}
                blurDataURL={photo.blur_hash}
                />
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderTitle}>{capitalizeEachWord(photo.description) || capitalizeEachWord(photo.alt_description) || `The Coldest Sunset`}</div>
                <p className={styles.cardHeaderDesc}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
              </div>
              <div className={styles.cardTagWrapper}>
                {Object.keys(photo.topic_submissions).length > 0
                  ? Object.entries(photo.topic_submissions).slice(0, 3).map((topic, index) => {
                    {console.log(photo.color)}
                    return (
                      <span key={`${topic[0]}-${index}`} className={styles.cardTag} style={{"backgroundColor" : `${photo.color}`}}>#{topic[0]}</span>
                    )
                  })
                  : <div>
                      <span className={styles.cardTag} style={{"backgroundColor" : "#c0c0c0"}}>#life</span>
                      <span className={styles.cardTag} style={{"backgroundColor" : "#c0c0c0"}}>#inspiration</span>
                      <span className={styles.cardTag} style={{"backgroundColor" : "#c0c0c0"}}>#growwth</span>
                    </div>
                }       
              </div>
            </div>
        ))}
      </div>
      <div ref={listRef}></div>
    </div>
  );
};

export default InfiniteList;
