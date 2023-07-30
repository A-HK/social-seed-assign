// utils/unsplash.js
import axios from 'axios';

const fetchRandomPhotos = async () => {
  const ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  const count = 10;
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${count}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching random photos from Unsplash:', error);
    return [];
  }
};

export default fetchRandomPhotos;
