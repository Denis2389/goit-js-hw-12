
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');

export function renderImages(images) {
  const markup = images.map(image => createImageCard(image)).join('');
  
  gallery.insertAdjacentHTML('beforeend', markup); 
}

function createImageCard({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
  return `
    <a class="gallery__item" href="${largeImageURL}">
      <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${likes}</p>
          <p class="info-item"><b>Views:</b> ${views}</p>
          <p class="info-item"><b>Comments:</b> ${comments}</p>
          <p class="info-item"><b>Downloads:</b> ${downloads}</p>
        </div>
      </div>
    </a>
  `;
}
