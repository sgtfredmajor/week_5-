'use strict';

let category = 'dev';

const refreshQuoteButton = document.querySelector('#refreshQuote');
const submitFormButton = document.querySelector('#submitForm');
const categoryChangeForm = document.querySelector('#categoryChangeForm');
const closeModalButton = document.querySelector('#closeModal')

function getQuote(category) {
  const apiUrl = `https://api.chucknorris.io/jokes/random?category=${category}`;
  const chuckSaysParagraph = document.querySelector('#chuckSays');

  const modalWindow = document.querySelector('.modal-overlay')
  get(apiUrl).then(function(response) {
    chuckSaysParagraph.innerHTML = response.value;
    modalWindow.classList.toggle('open');
  });
}
function getCategories() {
    const apiUrl = `https://api.chucknorris.io/jokes/categories`; 
    const categorySelectLabel = document.querySelector('#categorySelectLabel');
    const modalWindow =document.querySelector('.modal-overlay');

    get(apiUrl).then(function(response) {
        const categoryList = response.filter(function(category) {
          if (category != 'explicit') {
            return category;
          }
        });
        const categoryElement = document.createElement('select');

        categoryList.map(function(category) {
          const categoryOption = document.createElement('option');
          categoryOption.value = category;
          categoryOption.text = category;
          categoryElement.appendChild(categoryOption);
        });
        categorySelectLabel.appendChild(categoryElement);
      });
}

refreshQuoteButton.addEventListener('click', function(e) {
  e.preventDefault();
  getQuote(category);
});

submitFormButton.addEventListener('click', function(e) {
  e.preventDefault();
  // const categoryInput = document.querySelector('#categoryInput');
  const categoryInput = document.querySelector('#categoryChangeForm select');
  category = categoryInput.value;
  getQuote(category);
})


  closeModalButton.addEventListener('click', function(e) {  
    const modelWindow = document.querySelector('.modal-overlay');
    modalWindow.classList.toggle('open');
});

getQuote(category);
getCategories();

