import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import InfiniteList from './InfiniteList'; 
import Card from './ui/Card';

import styles from '../styles/UserProfile.module.css'; 

const UserProfile = () => {
  const router = useRouter();
  const { username } = router.query;
  const [userDetails, setUserDetails] = useState({});
  const [userPhotos, setUserPhotos] = useState([]);
  const [isGridView, setIsGridView] = useState(true);

  const toggleView = () => {
    setIsGridView((prev) => !prev);
  };

  useEffect(() => {
    if (username) {
      fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`)
        .then((response) => response.json())
        .then((data) => setUserDetails(data));

      fetch(`https://api.unsplash.com/users/${username}/photos?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`)
        .then((response) => response.json())
        .then((data) => setUserPhotos(data));
    }
  }, [username]);

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.left}>
        <h1>{`${userDetails.name}`}</h1>
        <p>Username: {userDetails.username}</p>
        <p>Location: {userDetails.location}</p> 
      </div>
      <div className={styles.viewWrapper}>
        <button onClick={toggleView} className={styles.toggleButton}>
          <p className={styles.toggleText}>
            {isGridView
            ? `Switch to List View`
            : `Switch to Grid View`
            }
          </p>
          <div className={styles.toggleIcon}>
            {isGridView
            ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
              </svg>
            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            }
          </div>
        </button>
        {isGridView
          ? <>
              {/* Grid View */}
              <div className={styles.grid}>
                {userPhotos.map((photo, index) => (
                  <div key={photo.id} className={styles.gridItem}>
                    <Card photo={photo} index={index} />
                  </div>
                  ))}
              </div>
            </>
          : <>
              {/* List View */}
              <div>
                <InfiniteList visiblePhotos={userPhotos} />
              </div>
            </>
        }
      </div>

      </div>
  );
};

export default UserProfile;
