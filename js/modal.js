!(function (e) {
  'function' != typeof e.matches &&
    (e.matches =
      e.msMatchesSelector ||
      e.mozMatchesSelector ||
      e.webkitMatchesSelector ||
      function (e) {
        for (
          var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0;
          o[n] && o[n] !== t;

        )
          ++n;
        return Boolean(o[n]);
      }),
    'function' != typeof e.closest &&
      (e.closest = function (e) {
        for (var t = this; t && 1 === t.nodeType; ) {
          if (t.matches(e)) return t;
          t = t.parentNode;
        }
        return null;
      });
})(window.Element.prototype);

document.addEventListener('DOMContentLoaded', function () {
  var modalButtons = document.querySelectorAll('.js-open-modal'),
    overlay = document.querySelector('.js-overlay-modal'),
    closeButtons = document.querySelectorAll('.js-modal-close');

  modalButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      var modalId = this.getAttribute('data-modal'),
        modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

      modalElem.classList.add('active');
      overlay.classList.add('active');
      document.body.classList.add('modal-open');
      document.body.classList.remove('is-menu-shown');
    });
  });

  closeButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      var parentModal = this.closest('.modal');

      parentModal.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('modal-open');
    });
  });

  document.body.addEventListener(
    'keyup',
    function (e) {
      var key = e.key;

      if (key === 'Escape') {
        document.querySelector('.modal.active').classList.remove('active');
        document.querySelector('.modal-overlay').classList.remove('active');
        document.body.classList.remove('modal-open');
      }
    },
    false
  );

  overlay.addEventListener('click', function () {
    document.querySelector('.modal.active').classList.remove('active');
    this.classList.remove('active');
    document.body.classList.remove('modal-open');
  });
});

// (() => {
//   const refs = {
//     openModalBtn: document.querySelectorAll('[data-modal-open]'),
//     closeModalBtn: document.querySelector('[data-modal-close]'),
//     modal: document.querySelector('[data-modal]'),
//   };
//   let isShown = false;

//   refs.openModalBtn.forEach(el => el.addEventListener('click', toggleModal));
//   refs.closeModalBtn.addEventListener('click', toggleModal);
//   refs.modal.addEventListener('click', onBackdropClick);

//   function toggleModal() {
//     refs.modal.classList.toggle('is-hidden');
//     document.body.classList.toggle('is-modal-shown');
//     isShown
//       ? document.body.removeEventListener('keydown', onKeyDown)
//       : document.body.addEventListener('keydown', onKeyDown);
//     isShown = !isShown;

//     if (isShown) {
//       document.body.classList.remove('is-menu-shown');
//     }
//   }

//   function onBackdropClick(event) {
//     if (event.target != event.currentTarget) return;
//     toggleModal();
//   }

//   function onKeyDown(event) {
//     if (event.code !== 'Escape') return;
//     toggleModal();
//   }
// })();
