
import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadingIndicator = document.querySelector('.loading-indicator');
const loadMoreButton = document.querySelector('#load-more-button');

let lightbox = new SimpleLightbox('.gallery a');
let currentPage = 1;
let currentQuery = '';
const perPage = 15;

searchForm.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', loadMoreImages);

async function onSearch(event) {
  event.preventDefault();

  const query = event.target.elements.searchQuery.value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight'
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  gallery.innerHTML = ''; 
  loadingIndicator.style.display = 'block';
  loadMoreButton.style.display = 'none';

  try {
    const data = await fetchImages(query, currentPage);
    loadingIndicator.style.display = 'none';  

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight'
      });
      return;
    }
    
    renderImages(data.hits);
    lightbox.refresh(); 

    if (data.totalHits > perPage) {
      loadMoreButton.style.display = 'block';
    }
  } catch(error) {
    loadingIndicator.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later!',
      position: 'topRight'
    });
    console.error('Error in fetching images:', error);
  }
}

async function loadMoreImages() {
  currentPage += 1; 
  loadingIndicator.style.display = 'block'; 

  try {
    const data = await fetchImages(currentQuery, currentPage);
    loadingIndicator.style.display = 'none';

    renderImages(data.hits);
    lightbox.refresh();

    const totalImagesLoaded = currentPage * perPage;
    if (totalImagesLoaded >= data.totalHits) {
      loadMoreButton.style.display = 'none'; 
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight'
      });
    } else {
      scrollToNewImages();
    } 
  } catch (error) {
    loadingIndicator.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later!',
      position: 'topRight'
    });
    console.error('Error in fetching images:', error);
  }
}
    
function scrollToNewImages() {
  const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
