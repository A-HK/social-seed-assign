import { useRouter } from 'next/router';
import fetchUserDetails from '../../utils/fetchUserDetails'; 
import { useState } from 'react';
import AppFeed from '../../components/AppFeed'; 
import UserProfile from '@/components/UserProfile';

const UserProfilePage = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <UserProfile />
  );
};


export default UserProfilePage;




