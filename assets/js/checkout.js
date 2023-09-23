const cepField = document.getElementById('cep');
const roadField = document.getElementById('road');
const neighbField = document.getElementById('neighb');
const cityField = document.getElementById('city');
const ufField = document.getElementById('uf');

const cards = [
    {
        'image': './assets/img/coffees/Type=Expresso.png',
        'type': 'Tradicional',
        'title': 'Expresso Tradicional',
        'description': 'O tradicional café feito com água quente e grãos moídos',
        'price': 9.9,
        'amount': 1,
    },
    {
        'image': './assets/img/coffees/Type=Americano.png',
        'type': 'Tradicional',
        'title': 'Expresso Americano',
        'description': 'Expresso diluído, menos intenso que o tradicional',
        'price': 9.9,
        'amount': 1,
    },
    {
        'image': './assets/img/coffees/Type=ExpressoCremoso.png',
        'type': 'Tradicional',
        'title': 'Expresso Cremoso',
        'description': 'Café expresso tradicional com espuma cremosa',
        'price': 12.9,
        'amount': 1,
    },
    {
        'image': './assets/img/coffees/Type=CafeGelado.png',
        'type': 'Tradicional | Gelado',
        'title': 'Expresso Gelado',
        'description': 'Bebida preparada com café expresso e cubos de gelo',
        'price': 12.9,
        'amount': 1,
    },
    {
        'image': './assets/img/coffees/Type=CafecomLeite.png',
        'type': 'Tradicional | Com leite',
        'title': 'Café com Leite',
        'description': 'Meio a meio de expresso tradicional com leite vaporizado',
        'price': 14.9,
        'amount': 1,
    },
    {
        'image': './assets/img/coffees/Type=Latte.png',
        'type': 'Tradicional | Com leite',
        'title': 'Latte',
        'description': 'Uma dose de café expresso com o dobro de leite e espuma cremosa',
        'price': 14.9,
        'amount': 1,
    },
    {
        'image': './assets/img/coffees/Type=Capuccino.png',
        'type': 'Tradicional | Com leite',
        'title': 'Capuccino',
        'description': 'Bebida com canela feita de doses iguais de café, leite e espuma',
        'price': 18.9,
        'amount': 1,
    },
    {
        'image': './assets/img/coffees/Type=Macchiato.png',
        'type': 'Tradicional | Com leite',
        'title': 'Macchiato',
        'description': 'Café expresso misturado com um pouco de leite quente e espuma',
        'price': 18.9,
        'amount': 1,
    },
    {
        'image': './assets/img/coffees/Type=Mochaccino.png',
        'type': 'Tradicional | Com leite',
        'title': 'Mochaccino',
        'description': 'Café expresso com calda de chocolate, pouco leite e espuma',
        'price': 19.9,
        'amount': 1,
    },
    {
        'image': './assets/img/coffees/Type=ChocolateQuente.png',
        'type': 'Especial | Com leite',
        'title': 'Chocolate Quente',
        'description': 'Bebida feita com chocolate dissolvido no leite quente e café',
        'price': 21.9,
        'amount': 1,
    },
    {
        'image': './assets/img/coffees/Type=Cubano.png',
        'type': 'Especial | Alcoólico | Gelado',
        'title': 'Cubano',
        'description': 'Drink gelado de café expresso com rum, creme de leite e hortelã',
        'price': 21.9,
        'amount': 1,
    },
    {
        'image': './assets/img/coffees/Type=Havaiano.png',
        'type': 'Especial',
        'title': 'Havaino',
        'description': 'Bebida adocicada preparada com café e leite de coco',
        'price': 25.9,
        'amount': 1,
    },
    {
        'image': './assets/img/coffees/Type=Arabe.png',
        'type': 'Especial',
        'title': 'Árabe',
        'description': 'Bebida preparada com grãos de café árabe e especiarias',
        'price': 32.9,
        'amount': 1,
    },
    {
        'image': './assets/img/coffees/Type=Irlandes.png',
        'type': 'Especial | Alcoólico',
        'title': 'Irlandês',
        'description': 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
        'price': 32.9,
        'amount': 1,
    }

];
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
let sectionCard = document.getElementById('cart__section');

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
                <img src="./assets/img/icon/decrease.svg" alt="Diminuir um" id="decrease">
                <span>
                ${amount}
                </span>
                <img src="./assets/img/icon/increase.svg" alt="Acrescentar um" id="increase">
            </button>
            <button class="card__select remove__button" id="remove">
                <img src="./assets/img/icon/trash.svg"
                alt="Ícone de uma lixeira, representando a ação de remover o item do seu carrinho">
                Remover
            </button>
        </div>
    </div>
    <div>
        <span class="price__coffe" id="priceField">R$ ${formatter(priceFloat)}</span>
    </div>
</div>
`
}

cardsLocalStorage.forEach((card) => createACard(card.image, card.title, card.amount, card.price));

const increaseB = document.querySelectorAll('#increase');
const decreaseB = document.querySelectorAll('#decrease');
const priceField = document.querySelectorAll('#priceField');
const removeB = document.querySelectorAll('#remove');

increaseB.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        if (cardsLocalStorage[i].amount < 30) {
            cardsLocalStorage[i].amount++;
        }

        cards.forEach(card => {
            if (card.title === cardsLocalStorage[i].title) {
                const price = card.price;
                const multiplyPrice = (price * cardsLocalStorage[i].amount);
                cardsLocalStorage[i].price = parseFloat(multiplyPrice);

                let spanIncreaseAmount = btn.previousElementSibling;
                spanIncreaseAmount.innerText = `${cardsLocalStorage[i].amount}`;

                priceField[i].innerText = `R$ ${formatter(multiplyPrice)}`;

                localStorage.setItem('cart', JSON.stringify(cardsLocalStorage));
            }
        })
    })
})

decreaseB.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        if (cardsLocalStorage[i].amount > 1) {
            cardsLocalStorage[i].amount--;

        }

        cards.forEach(card => {
            if (card.title === cardsLocalStorage[i].title && cardsLocalStorage[i].amount > 1) {
                const price = card.price;
                const subtractPrice = (price * cardsLocalStorage[i].amount);
                cardsLocalStorage[i].price = parseFloat(subtractPrice);

                let spanIncreaseAmount = btn.nextElementSibling;
                spanIncreaseAmount.innerText = `${cardsLocalStorage[i].amount}`;

                priceField[i].innerText = `R$ ${formatter(subtractPrice)}`;

                localStorage.setItem('cart', JSON.stringify(cardsLocalStorage));
                console.log(card.price, subtractPrice)
            }
        })
    })
})

removeB.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        cardsLocalStorage.splice(i, 1);
        localStorage.setItem('cart', JSON.stringify(cardsLocalStorage));

        sectionCard.innerHTML = ``;
        cardsLocalStorage.forEach(card => createACard(card.image, card.title, card.amount, card.price));

        console.log(i);
    })
})

///////////////////////////////////////////////////////////////////////////
//Payment area
const paymentArea = document.getElementById('payment__area');
const deliveryP = 3.50;
let totalItems = 0;
let totalWDelivery = 0;

const totalPrice = document.getElementById('total__price');
const totalWithDelivery = document.getElementById('total__with__delivery');

if (cardsLocalStorage.length > 0) {
    prices = cardsLocalStorage.map(card => { return { price: card.price * card.amount } });
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