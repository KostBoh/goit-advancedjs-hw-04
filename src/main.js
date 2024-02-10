const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let searchQuery = '';

form.addEventListener('submit', async event => {
  event.preventDefault();
  const input = form.elements['searchQuery'];
  searchQuery = input.value.trim();
  currentPage = 1;
  await fetchImages(searchQuery, currentPage);
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  await fetchImages(searchQuery, currentPage);
});

async function fetchImages(query, page) {
  const API_KEY = '42310710-0bcfa885b8d0bd9d4e21f3c00';
  const PER_PAGE = 40;
  const BASE_URL = 'https://pixabay.com/api/';

  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: PER_PAGE,
  });
  const url = `${BASE_URL}?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    const data = await response.json();
    if (data.hits.length === 0) {
      gallery.innerHTML = '';
      throw new Error(
        'Sorry, ther are no images matching your search query. Pleasetry again.'
      );
    }
    if (page === 1) {
      gallery.innerHTML = '';
    }
    data.hits.forEach(image => {
      const card = createImaageCard(image);
      gallery.appendChild(card);
    });
    if (data.totalHits <= page * PER_PAGE) {
      loadMorreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error(error.message);
  }
}

function createImaageCard({
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
