
import axios from 'axios';

const API_KEY = '45127620-5b07992107ac4e8771e67df86';
const BASE_URL = 'https://pixabay.com/api';
const perPage = 15; 

export async function fetchImages(query, page) {
  const url = `${BASE_URL}/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`HTTP error! status: ${error.response.status}`);
  }
}
