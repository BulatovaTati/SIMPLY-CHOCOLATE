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
    title: 'CRANBERRY',
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
const basket = [];
const basketList = document.querySelector('.basket-list');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.addEventListener('click', onLoadMore);
const productList = document.querySelector('.products-list');
productList.insertAdjacentHTML('beforeend', productMarkup(products, 0, PRODUCTS_PER_PAGE));
productList.addEventListener('click', onBasket);

loadBasketFromLocalStorage();

function productMarkup(products, startIndex, endIndex) {
  return products
    .slice(startIndex, endIndex)
    .reduce((acc, { image: { srcset, src, alt }, description, price, title, id }) => {
      const productInBasket = basket.find(({ id: basketId }) => basketId === id);
      const buttonText = productInBasket ? 'ADDED' : 'BUY';
      const buttonDisabled = productInBasket ? 'disabled' : '';

      return (
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
                <button type="button" class="products-item-price js-add js-open-modal" ${buttonDisabled} data-modal="2">
                  ${buttonText}
                </button>
              </div>
            </li>`
      );
    }, '');
}

function basketMarkup() {
  return basket.reduce(
    (acc, { image: { src }, alt, title, qty, sum, id }) =>
      acc +
      `<li class="basket-item">
            <div class="product-card">
              <img src="${src}"  alt="${alt}" class="product-img" width="120"/>
              <p class="product-title">${title}</p>
              <input
                class="js-product-qty"
                type="number"
                name="product-qty"
                value="${qty}"
                min="1"
                max="10"
                data-id="${id}"    
              />
               <p class="product-sum">${sum} UAH</p>
               <button type="button" class="product-delete" data-id="${id}">
                <svg class="product-delete-icon" width="18" height="18">
                  <use href="./icons/icons.svg#icon-modal-close"></use>
                </svg>
              </button>
            </div>
          </li>`,
    ''
  );
}

function loadBasketFromLocalStorage() {
  const savedBasket = localStorage.getItem('basket-list');
  if (savedBasket) {
    const parsedBasket = JSON.parse(savedBasket);
    parsedBasket.forEach(item => {
      basket.push(item);
    });

    renderBasket();
    updateProductButtons();
  }
}

function saveBasketToLocalStorage() {
  localStorage.setItem('basket-list', JSON.stringify(basket));
}

function updateProductButtons() {
  const productItems = document.querySelectorAll('.products-item');
  productItems.forEach(item => {
    const productId = Number(item.dataset.id);
    const productInBasket = basket.find(({ id }) => id === productId);
    const button = item.querySelector('.js-add');

    if (productInBasket) {
      button.innerHTML = 'Added';
      button.disabled = true;
    }
  });
}

function renderBasket() {
  basketList.innerHTML = '';
  basketList.insertAdjacentHTML('beforeend', basketMarkup());

  const inputs = document.querySelectorAll('.js-product-qty');
  inputs.forEach(input => input.addEventListener('change', updateProductQty));

  const deleteButtons = document.querySelectorAll('.product-delete');
  deleteButtons.forEach(button => button.addEventListener('click', removeProductFromBasket));

  saveBasketToLocalStorage();
}

function onLoadMore() {
  const startIndex = currentPage * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  productList.insertAdjacentHTML('beforeend', productMarkup(products, startIndex, endIndex));

  currentPage++;
  smoothScrolling();

  if (endIndex >= products.length) {
    loadMoreBtn.style.display = 'none';
  }
}

function smoothScrolling() {
  const { height: cardHeight } = document
    .querySelector('.products-list')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight,
    behavior: 'smooth',
  });
}

function onBasket(evt) {
  if (evt.target.classList.contains('js-add')) {
    const currentProduct = evt.target.closest('.products-item');
    const currentId = Number(currentProduct.dataset.id);
    const toBasket = products.find(({ id }) => id === currentId);

    const productInBasket = basket.find(({ id }) => id === currentId);

    if (!productInBasket) {
      toBasket.qty = 1;
      toBasket.sum = toBasket.price;
      basket.push(toBasket);
      evt.target.innerHTML = 'Added';
      evt.target.disabled = true;
    } else {
      productInBasket.qty += 1;
      toBasket.sum = productInBasket.qty * toBasket.price;
    }

    renderBasket();
  }
}

function updateProductQty(evt) {
  const newQty = Number(evt.target.value);
  const productId = Number(evt.target.dataset.id);

  const productInBasket = basket.find(({ id }) => id === productId);

  if (productInBasket && newQty <= 0) {
    removeProductFromBasket(evt);
  } else {
    productInBasket.qty = newQty;
    productInBasket.sum = productInBasket.qty * productInBasket.price;
  }
  renderBasket();
}

function removeProductFromBasket(evt) {
  const button = evt.target.closest('.product-delete');

  if (!button) return;

  const productId = Number(button.dataset.id);
  const productIndex = basket.findIndex(({ id }) => id === productId);

  if (productIndex !== -1) {
    basket.splice(productIndex, 1);
    renderBasket();

    const productItem = productList.querySelector(`[data-id="${productId}"]`);
    const addButton = productItem.querySelector('.js-add');

    addButton.innerHTML = 'BUY';
    addButton.disabled = false;
  }
}
