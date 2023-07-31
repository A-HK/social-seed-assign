import axios from 'axios';

const fetchUserDetails = async (username) => {
  const ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

  try {
    const userResponse = await axios.get(`https://api.unsplash.com/users/${username}?client_id=${ACCESS_KEY}`);
    const photosResponse = await axios.get(`https://api.unsplash.com/users/${username}/photos?client_id=${ACCESS_KEY}&per_page=12`); // You can adjust the per_page value to fetch more or fewer photos

    const user = userResponse.data;
    const photos = photosResponse.data;

    console.log(userResponse)
    console.log(photosResponse)

    return { user, photos };
  } catch (error) {
    console.error('Error fetching user details from Unsplash:', error);
    return { user: null, photos: [] };
  }
};

export default fetchUserDetails;
