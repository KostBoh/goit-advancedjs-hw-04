import axios from 'axios';
import iziToast from 'izitoast';
import Notiflix from 'notiflix';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let searchQuery = '';
let firstSearch = true;

form.addEventListener('submit', async event => {
  event.preventDefault();
  const input = form.elements['searchQuery'];
  searchQuery = input.value.trim();
  currentPage = 1;
  loadMoreBtn.style.display = 'none';
  firstSearch = true;
  if (searchQuery !== '') {
    await fetchImages(searchQuery, currentPage);
  } else {
    iziToast.show({
      title: 'Hey',
      message:
        'The search text is empty. Enter the information you want to find.',
    });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  await fetchImages(searchQuery, currentPage);
});

async function fetchImages(query, page) {
  const API_KEY = '42310710-0bcfa885b8d0bd9d4e21f3c00';
  const PER_PAGE = 40;
  const BASE_URL = 'https://pixabay.com/api/';

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: PER_PAGE,
      },
    });

    const data = response.data;
    if (data.hits.length === 0) {
      gallery.innerHTML = '';
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
      });
      return;
    }
    if (page === 1) {
      gallery.innerHTML = '';
      if (firstSearch) {
        iziToast.success({
          title: 'Success',
          message: `Hooray! We found ${data.totalHits} images.`,
        });
        firstSearch = false;
      }
    }
    data.hits.forEach(image => {
      const card = createImageCard(image);
      gallery.appendChild(card);
    });
    if (data.totalHits <= page * PER_PAGE) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error(error.message);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images',
    });
  }
}

function createImageCard({
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  const card = document.createElement('div');
  card.classList.add('photo-card');
  card.innerHTML = `
  <img src="${webformatURL}" alt="${tags}" loading="lazy">
  <div class="info">
    <p class="info-item"><b>Likes:</b> ${likes}</p>
    <p class="info-item"><b>Views:</b> ${views}</p>
    <p class="info-item"><b>Comments:</b> ${comments}</p>
    <p class="info-item"><b>Downloads:</b> ${downloads}</p> 
  </div>
    `;
  return card;
}
