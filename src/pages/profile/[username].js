// pages/profile/[username].js
import { useRouter } from 'next/router';
import fetchUserDetails from '../../utils/fetchUserDetails'; // Implement this function to fetch user details and photos

// components/NewsFeed.js
// ... Implement your NewsFeed component to render photos in grid and list view ...

// pages/profile/[username].js
import { useState } from 'react';
import AppFeed from '../../components/AppFeed'; // Import the NewsFeed component
import UserProfile from '@/components/UserProfile';

const UserProfilePage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [isGridView, setIsGridView] = useState(true);


  const toggleView = () => {
    setIsGridView((prev) => !prev);
  };

  return (
  <UserProfile />
  );
};


export default UserProfilePage;




