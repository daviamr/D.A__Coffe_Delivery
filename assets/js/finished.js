const local = document.getElementById('local');
const uf = document.getElementById('uf');
const localpoint = document.querySelector('[data-location]')

const adressLocalStorage = JSON.parse(localStorage.getItem('adress')) || [];

local.innerHTML = `
<h3 class="third__title">Entrega em <span id="local">
${adressLocalStorage[0].road},
${adressLocalStorage[0].number}</h3>`

uf.innerHTML = ``

localpoint.innerHTML = `<img src="./assets/img/icon/location.svg" alt="Imagem contendo o Estado em que você mora">${adressLocalStorage[0].city}, ${adressLocalStorage[0].uf}`;