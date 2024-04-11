import {useEffect, useState} from 'react';

const API_KEY = 'JoVftrLnZNNhWOTeUZjspSySRLgeSB73Ew6mvwOGvoDEAkp0jIZBNJHQ';
const URL = 'https://api.pexels.com/v1/search?query=japan';

const useImage = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const data = await fetch(URL, {
      headers: {
        Authorization: API_KEY,
      },
    });
    const result = await data.json();
    return result;
  };
  useEffect(() => {
    const fetchRequest = async () => {
      const data = await fetchImages();
      setImages(data.photos);
    };
    fetchRequest();
  }, []);
  return images;
};
export default useImage;
