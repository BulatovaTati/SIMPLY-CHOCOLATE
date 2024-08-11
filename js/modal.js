const modalOpenButtons = document.querySelectorAll('[data-open-modal]');
const modalCloseButtons = document.querySelectorAll('[data-close-modal]');
const body = document.querySelector('body');
let isModalOpen = false;

modalCloseButtons.forEach(closeBtn => {
  closeBtn.addEventListener('click', e => {
    modalClose(closeBtn.closest('[data-modal]'));
  });
});

modalOpenButtons.forEach(modalBtn => {
  modalBtn.addEventListener('click', e => {
    const modalName = modalBtn.getAttribute('data-open-modal');
    const currentModal = document.querySelector(`[data-modal="${modalName}"]`);

    modalOpen(currentModal);
  });
});

function modalOpen(currentModal) {
  const form = currentModal.querySelector('form');

  currentModal.classList.remove('is-hidden');
  bodyLock();
  isModalOpen = true;

  document.addEventListener('keydown', onEscOrClick);
  currentModal.addEventListener('click', onEscOrClick);

  function onEscOrClick(e) {
    if (e.which === 27 || e.target === currentModal) {
      modalClose(currentModal);
      document.removeEventListener('keydown', onEscOrClick);
      currentModal.removeEventListener('click', onEscOrClick);
    }
  }

  if (!form) {
    return;
  }

  form.addEventListener('submit', onSubmit);

  function onSubmit(e) {
    e.preventDefault();
    modalClose(currentModal);

    const modalName = form.getAttribute('data-form');
    if (modalName) {
      const currentModal = document.querySelector(`[data-modal="${modalName}"]`);
      modalOpen(currentModal);
    }

    e.target.reset();
    form.removeEventListener('submit', onSubmit);
  }
}

function modalClose(modalActive) {
  modalActive.classList.add('is-hidden');
  isModalOpen = false;
  modalActive.addEventListener('transitionend', onTransitionEnd);

  function onTransitionEnd() {
    modalActive.removeEventListener('transitionend', onTransitionEnd);
    bodyUnLock();
  }
}

function bodyLock() {
  const scrollbarWidth = window.innerWidth - body.offsetWidth + 'px';
  const bodyPaddingRight = body.style.paddingRight;

  body.style.overflow = 'hidden';
  body.style.paddingRight = !bodyPaddingRight ? scrollbarWidth : bodyPaddingRight;
}

function bodyUnLock() {
  if (!isModalOpen) {
    body.style.removeProperty('overflow');
    body.style.removeProperty('padding-right');
  }
}
