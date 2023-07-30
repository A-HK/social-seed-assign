import { createContext, useState, useEffect } from 'react';
import fetchRandomPhotos from '../utils/unsplash';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch random photos and set them in the state only if the state is empty
    if (photos.length === 0) {
      fetchRandomPhotos().then((data) => setPhotos(data));
    }
  }, [photos]);

  return (
    <AppContext.Provider value={{ photos }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
