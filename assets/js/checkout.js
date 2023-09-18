const cepField = document.getElementById('cep');
const roadField = document.getElementById('road');
const neighbField = document.getElementById('neighb');
const cityField = document.getElementById('city');
const ufField = document.getElementById('uf');

const cardsLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];

function formatter(element) {
    return element.toLocaleString('pt-br', { minimumFractionDigits: 2 });
}
///////////////////////////////////////////////////////////////////////////
//ViaCep API
async function searchCep(cepS) {
    const endpoint = await fetch(`https://viacep.com.br/ws/${cepS}/json/`);
    const dataConv = await endpoint.json();

    cepField.value = `${dataConv.cep}`
    roadField.value = `${dataConv.logradouro}`
    neighbField.value = `${dataConv.bairro}`
    cityField.value = `${dataConv.localidade}`
    ufField.value = `${dataConv.uf}`

    return dataConv;

}

cepField.addEventListener('focusout', () => {
    const cepValue = cepField.value;
    searchCep(cepValue)
});
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
//Checkout cart
const sectionCard = document.getElementById('cart__section');

function createACard(image, title, amount, price) {

    const priceFloat = parseFloat(price);

    sectionCard.innerHTML += `
    <div class="selected__coffees">
    <img class="image__coffee" src="${image}"
        alt="Foto do café selecionado">
    <div class="coffees__info">
        <h1 class="title__coffe">${title}</h1>
        <div class="buttons__coffee">
            <button class="flex card__button">
                <img src="./assets/img/icon/decrease.svg" alt="Diminuir um">
                ${amount}
                <img src="./assets/img/icon/increase.svg" alt="Acrescentar um">
            </button>
            <button class="card__select remove__button">
                <img src="./assets/img/icon/trash.svg"
                alt="Ícone de uma lixeira, representando a ação de remover o item do seu carrinho">
                Remover
            </button>
        </div>
    </div>
    <div>
        <span class="price__coffe">R$ ${formatter(priceFloat)}</span>
    </div>
</div>
`
}

cardsLocalStorage.forEach(card => createACard(card.image, card.title, card.amount, card.price));
///////////////////////////////////////////////////////////////////////////
//Payment area
const paymentArea = document.getElementById('payment__area');
const deliveryP = 3.50;
let totalItems = 0;
let totalWDelivery = 0;

const totalPrice = document.getElementById('total__price');
const totalWithDelivery = document.getElementById('total__with__delivery');

if (cardsLocalStorage.length > 0) {
    prices = cardsLocalStorage.map(card => { return { price: card.price } });
    totalItems = prices.reduce((acc, item) => acc + parseFloat(item.price), 0);

    totalWDelivery = totalItems + deliveryP;

    paymentArea.innerHTML = `
    <div class="payment__infos__content">
        <div class="flex2">
            <p class="flex2 prices__info">Total de itens</p>
            <span class="prices__info" id="total__price">R$ ${formatter(totalItems)}</span>
        </div>
        <div class="flex2">
            <p class="flex2 prices__info">Entrega</p>
            <span class="prices__info" id="delivery__price">R$ ${formatter(deliveryP)}</span>
        </div>
        <div class="flex2">
            <h1 class="amount__info">Total</h1>
            <h2 class="amount__info" id="total__with__delivery">${formatter(totalWDelivery)}</h2>
        </div>
    </div>
    <button class="primary__button">Confirmar Pedido</button>
    `

} else {
    paymentArea.innerHTML = `
    <div class="payment__infos__content">
        <div class="flex2">
            <p class="flex2 prices__info">Total de itens</p>
            <span class="prices__info" id="total__price">R$ ${formatter(totalItems)}</span>
        </div>
        <div class="flex2">
            <p class="flex2 prices__info">Entrega</p>
            <span class="prices__info" id="delivery__price">R$ ${formatter(deliveryP)}</span>
        </div>
        <div class="flex2">
            <h1 class="amount__info">Total</h1>
            <h2 class="amount__info" id="total__with__delivery">R$ ${formatter(totalWDelivery)}</h2>
        </div>
    </div>
    <button class="primary__button">Confirmar Pedido</button>
    `
}

//function to get all arrays in local storage and sum the 'amount'
const quantity = document.getElementById('item__quantity');
const select = document.querySelectorAll('#selectButton');

function numberItemsCart() {
    if (cardsLocalStorage.length > 0) {
        let cartQuantity = cardsLocalStorage.map(item => {
            return { amount: item.amount };
        });

        totalAmount = cartQuantity.reduce((acc, item) => acc + parseInt(item.amount), 0)
        quantity.innerText = totalAmount;
    }
}
numberItemsCart()