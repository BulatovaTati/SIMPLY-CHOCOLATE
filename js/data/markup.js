const products = [
  {
    id: 1,
    title: 'orange',
    image: {
      srcset: ['./images/products/orange-1x.png 1x', './images/products/orange-2x.png 2x'],
      src: './images/products/orange-1x.png',
      alt: 'orange',
    },
    description: 'Dark chocolate',
    price: 45,
  },
  {
    id: 2,
    title: 'APPLE&CRANBERRY',
    image: {
      srcset: [
        './images/products/apple&cranberry-1x.png 1x',
        './images/products/apple&cranberry-2x.png 2x',
      ],
      src: './images/products/apple&cranberry-1x.png',
      alt: 'APPLE&CRANBERRY',
    },
    description: 'Milk chocolate',
    price: 50,
  },
  {
    id: 3,
    title: 'lime&sea salt',
    image: {
      srcset: ['./images/products/lime-1x.png 1x', './images/products/lime-2x.png 2x'],
      src: './images/products/lime-1x.png',
      alt: 'lime&sea salt',
    },
    description: 'Dark chocolate',
    price: 66,
  },
  {
    id: 4,
    title: 'pineapple',
    image: {
      srcset: ['./images/products/pineapple-1x.png 1x', './images/products/pineapple-2x.png 2x'],
      src: './images/products/pineapple-1x.png',
      alt: 'pineapple',
    },
    description: 'Dark chocolate',
    price: 54,
  },
  {
    id: 5,
    title: 'Classic',
    image: {
      srcset: [
        './images/products/classic-milk-1x.png 1x',
        './images/products/classic-milk-2x.png 2x',
      ],
      src: './images/products/classic-milk-1x.png',
      alt: 'Classic',
    },
    description: 'Milk chocolate',
    price: 45,
  },
  {
    id: 6,
    title: 'honey',
    image: {
      srcset: ['./images/products/honey-1x.png 1x', './images/products/honey-2x.png 2x'],
      src: './images/products/honey-1x.png',
      alt: 'honey',
    },
    description: 'Milk chocolate',
    price: 50,
  },
  {
    id: 7,
    title: 'Roasted fruits',
    image: {
      srcset: ['./images/products/roasted-f-1x.png 1x', './images/products/roasted-f-2x.png 2x'],
      src: './images/products/roasted-f-1x.png',
      alt: 'Roasted fruits',
    },
    description: 'Dark chocolate',
    price: 66,
  },
  {
    id: 8,
    title: 'Classic',
    image: {
      srcset: [
        './images/products/classic-white-1x.png 1x',
        './images/products/classic-white-2x.png 2x',
      ],
      src: './images/products/classic-white-1x.png',
      alt: 'Classic',
    },
    description: 'White chocolate',
    price: 54,
  },
  {
    id: 9,
    title: 'Classic',
    image: {
      srcset: [
        './images/products/classic-white-1x.png 1x',
        './images/products/classic-white-2x.png 2x',
      ],
      src: './images/products/classic-white-1x.png',
      alt: 'Classic',
    },
    description: 'White chocolate',
    price: 54,
  },
  {
    id: 10,
    title: 'Classic',
    image: {
      srcset: [
        './images/products/classic-white-1x.png 1x',
        './images/products/classic-white-2x.png 2x',
      ],
      src: './images/products/classic-white-1x.png',
      alt: 'Classic',
    },
    description: 'White chocolate',
    price: 54,
  },
  {
    id: 11,
    title: 'Classic',
    image: {
      srcset: [
        './images/products/classic-white-1x.png 1x',
        './images/products/classic-white-2x.png 2x',
      ],
      src: './images/products/classic-white-1x.png',
      alt: 'Classic',
    },
    description: 'White chocolate',
    price: 54,
  },
];
const PRODUCTS_PER_PAGE = 8;
let currentPage = 1;

const productList = document.querySelector('.products-list');
const loadMoreBtn = document.querySelector('.load-more');

function markup(products, startIndex, endIndex) {
  return products.slice(startIndex, endIndex).reduce(
    (acc, { image: { srcset }, src, alt, description, price, title, id }) =>
      acc +
      `       <li class="products-item" data-id='${id}'>
              <img
                srcset="${srcset[0]}, ${srcset[1]}"
                src="${src}"
                alt="${alt}"
                class="products-item-image"
              />
              <h3 class="products-item-title">${title}</h3>
              <p class="products-item-text">${description}</p>
              <div class="basket-container">
                <button type="button" class="products-item-price">${price} UAH</button>
                <button type="button" class="products-item-price js-open-modal" data-modal="2">
                  <svg class="basket-icon" width="16" height="16">
                    <use href="./icons/icons.svg#icon-shopping-basket"></use>
                  </svg>
                </button>
              </div>
            </li>  `,
    ''
  );
}

productList.insertAdjacentHTML('beforeend', markup(products, 0, PRODUCTS_PER_PAGE));

loadMoreBtn.addEventListener('click', () => {
  const startIndex = currentPage * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  productList.insertAdjacentHTML('beforeend', markup(products, startIndex, endIndex));

  currentPage++;
  smoothScrolling();

  if (endIndex >= products.length) {
    loadMoreBtn.style.display = 'none';
  }
});

function smoothScrolling() {
  const { height: cardHeight } = document
    .querySelector('.products-list')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight,
    behavior: 'smooth',
  });
}
