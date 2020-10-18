// initial card array where new images will be pushed into
const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
  ]; 

//  create card function
let createCard = (name, link, id) => {
    const content = `
    <li class="element" id=${id}>
    <button id=${id} type="button" class="element__delete"></button>
    <img class="element__image" alt="${name}" src="${link}"/>
    <div class="element__text">
    <h2 class="element__name">${name}</h2>
    <button id=${id} type="button" class="element__heart"></button>
    </div>
    </li>`

    return content
}

initialCards.forEach((c, id) => {
    let newCards = createCard(c.name, c.link, id);

    document.querySelector('.elements__table').innerHTML += newCards;
})

let imageDelete = document.querySelectorAll('.element__delete');
let imageLike = document.querySelectorAll('.element__heart');

function deleteImage(e) {
    let id = e.target.getAttribute("id");
    let idTarget = document.querySelector(`[id='${id}']`);
    idTarget.remove();
    console.log(e.target);
}

imageDelete.forEach(card => {
    card.addEventListener("click", deleteImage);
})

function likeImage(e) {
    let id = e.target.getAttribute("id");
    let idTarget = document.querySelector(`.element__name ~ [id='${id}']`);
    idTarget.classList.toggle("element__heart_active");
    console.log(idTarget);
}

imageLike.forEach(card => {
    card.addEventListener("click", likeImage);
})


// profile modal
let profileModal = document.querySelector(".modal");
let profileClose = document.querySelector('.modal__close_type_profile');
let profileAdd = document.querySelector('.profile__edit');

let profileForm = document.querySelector('.modal__form_type_profile');

let nameInput = document.querySelector('.modal__input_type_form-name');
let jobInput = document.querySelector('.modal__input_type_form-job');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function openProfile() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    profileModal.classList.add("modal_open");
}

function closeProfile() {
    profileModal.classList.remove("modal_open")
}

function submitProfile(e) {
    e.preventDefault();
    
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    closeProfile();
}

// photo modal
let imageModal = document.querySelector(".modal__type_add-image")
let imageClose = document.querySelector('.modal__close_type_image')
let imageAdd = document.querySelector(".profile__add");

let imageForm = document.querySelector('.modal__form_type_image');

let titleInput = document.querySelector('.modal__input_type_title');
let imageInput = document.querySelector('.modal__input_type_image');

function submitImage(e) {
    e.preventDefault();
    let title = titleInput.value;
    let image = imageInput.value;
    let id = document.querySelectorAll('.element').length;

    let newCard = createCard(title, image, id);
    
    document.querySelector('.elements__table').insertAdjacentHTML('afterbegin', newCard);
    
    let imageDelete = document.querySelector(`.element__delete`);
    let imageLike = document.querySelector(`.element__heart`);
    let picturePopup = document.querySelector(`.element__image`);

    imageDelete.addEventListener('click', deleteImage);
    imageLike.addEventListener('click', likeImage);
    picturePopup.addEventListener('click', popupPicture);
    
    titleInput.value = ""
    imageInput.value = ""
    
    console.log(imageDelete, imageLike, id);

    closeImage();
}

function openImage() {
    imageModal.classList.add("modal_open")
}

function closeImage() {
    imageModal.classList.remove("modal_open")
}

// picture modal
let popupModal = document.querySelector('.modal__type_image-popup');
let picturePopup = document.querySelectorAll('.element__image');


// create an onclick that passes values to event target values html and opens modal 
function popupPicture(e) {
    console.log(e.target.alt)
    
    popupModal.classList.add("modal_open")
    
    let popup = `
    <div class="modal__container_type_popup">
        <button type="button" class="modal__close modal__close_type_popup"></button>
        <img alt="${e.target.alt}" src="${e.target.src}" class="modal__popup-img">
        <h3 class="modal__img-name">${e.target.alt}</h3>
    </div>
    `
    
    document.querySelector('.modal__type_image-popup').innerHTML += popup;

    let popupClose = document.querySelector('.modal__close_type_popup');
    
    popupClose.addEventListener("click", closePicture);
}


picturePopup.forEach(card => {
    card.addEventListener("click", popupPicture);
})

function closePicture() {
    document.querySelector('.modal__type_image-popup').innerHTML = '';

    popupModal.classList.remove("modal_open");
    // console.log(e.target)
}

profileAdd.addEventListener("click", openProfile);
profileClose.addEventListener("click", closeProfile);
profileForm.addEventListener("submit", submitProfile);

imageAdd.addEventListener("click", openImage);
imageClose.addEventListener("click", closeImage);
imageForm.addEventListener("submit", submitImage);

// let modal = document.querySelector(".modal");
// let modalClose = document.querySelector('.modal__close');
// let profileAdd = document.querySelector('.profile__edit');

// let modalForm = document.querySelector('.modal__form');

// let nameInput = document.querySelector('.modal__input_type_form-name');
// let jobInput = document.querySelector('.modal__input_type_form-job');

// let profileTitle = document.querySelector('.profile__title');
// let profileSubtitle = document.querySelector('.profile__subtitle');


// function handleForm(e) {
//     e.preventDefault();

    
//     profileTitle.textContent = nameInput.value;
//     profileSubtitle.textContent = jobInput.value;

//     closeModal();
// }


// function openModal() {
//     nameInput.value = profileTitle.textContent;
//     jobInput.value = profileSubtitle.textContent;
//     modal.classList.add("modal_open");
// }

// function closeModal() {
//     modal.classList.remove("modal_open")
// }

// modalForm.addEventListener("submit", handleForm);

// profileAdd.addEventListener("click", openModal);
// modalClose.addEventListener("click", closeModal);