import { useContext, useRef, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

import InfiniteList from './InfiniteList';

const FetchPhotos = () => {
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

  return (
    <>
      <InfiniteList visiblePhotos={visiblePhotos} />
      <div ref={listRef}></div>
    </>
  )

}



export default FetchPhotos;
