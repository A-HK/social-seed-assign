import { useContext, useRef, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Image from 'next/image';

import styles from '../styles/AppFeed.module.css'

const InfiniteList = () => {
  const { photos } = useContext(AppContext);
  const [visiblePhotos, setVisiblePhotos] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
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

  return (
    <div className={styles.row}>
      <div>
        {visiblePhotos.map((photo, index) => (
            <Image className={styles.column} key={`${photo.id}-${index}`} src={`https://source.unsplash.com/${photo.id}`} alt={photo.alt_description} width={300} height={300}/>
        ))}
      </div>
      <div ref={listRef}></div>
    </div>
  );
};

export default InfiniteList;
