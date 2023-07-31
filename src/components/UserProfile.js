import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import InfiniteList from './AppFeed'; // Assuming you have already created this component
import styles from '../styles/UserProfile.module.css'; // Assuming you have CSS module for styling

const UserProfile = () => {
  const router = useRouter();
  const { username } = router.query;
  const [userDetails, setUserDetails] = useState({});
  const [userPhotos, setUserPhotos] = useState([]);

  useEffect(() => {
    if (username) {
      // Fetch user details and photos based on the username
      fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`)
        .then((response) => response.json())
        .then((data) => setUserDetails(data));

      fetch(`https://api.unsplash.com/users/${username}/photos?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`)
        .then((response) => response.json())
        .then((data) => setUserPhotos(data));
    }
  }, [username]);

  return (
    <div>
      <h1>{`${userDetails.name}'s Profile`}</h1>
      <p>Username: {userDetails.username}</p>
      <p>Location: {userDetails.location}</p>

      {/* Grid View */}
      <div className={styles.grid}>
        {userPhotos.map((photo) => (
          <div key={photo.id} className={styles.gridItem}>
            <Image
              src={photo.urls.regular}
              alt={photo.alt_description}
              width={300}
              height={300}
            />
            <p>{photo.description}</p>
          </div>
        ))}
      </div>

      {/* List View */}
      <div>
        <h2>List View</h2>
        <InfiniteList photos={userPhotos} />
      </div>
    </div>
  );
};

export default UserProfile;
