//(index.html)
const fieldCards = document.querySelector('[data-cards]');
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
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
//func to create the cards
function createACard(image, type, title, description, price, amount) {
    const formatedPrice = price.toLocaleString('pt-br', { minimumFractionDigits: 2 });

    fieldCards.innerHTML += `
<div class="card__item">
    <img src="${image}" alt="Foto do tipo do café">
    <div class="card__info">
        <span class="card__span_typeCoffe">${type}</span>
        <h1 class="card__title">${title}</h1>
        <h2 class="card__subtitle">${description}</h2>
    </div>
    <div class="card__box">
        <p class="card__coin">R$ <span id="price">${formatedPrice}</span></p>
        <div class="card__buttons__content">
        <div class="flex card__button">
        <img src="./assets/img/icon/decrease.svg" alt="Diminuir um" id="decrease">
        <span class="span__amount" id="amountValue">${amount}</span>
        <img src="./assets/img/icon/increase.svg" alt="Acrescentar um" id="increase">
    </div>
    <button class="cart__button" id="selectButton">
    <img src="./assets/img/icon/white-cart-2.svg"
    alt="Imagem de um carrinho, para adicionar um item à sua lista">
    </button>
    </div>
    </div>
</div>
`
}

cards.forEach(card => {
    createACard(card.image, card.type, card.title, card.description, card.price, card.amount);
})

//quanty and price interaction (index.html)
const increaseB = document.querySelectorAll('#increase');
const decreaseB = document.querySelectorAll('#decrease');
const priceField = document.querySelectorAll('#price');

//increase item
increaseB.forEach((btn, i) => btn.addEventListener('click', () => {
    if (cards[i].amount < 30) {
        cards[i].amount++;

        const price = cards[i].price;
        const multiplyPrice = (price * cards[i].amount);

        let spanIncreaseAmount = btn.previousElementSibling;

        spanIncreaseAmount.innerText = `${cards[i].amount}`;
        priceField[i].innerText = `${multiplyPrice.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`
    }
}));

//decrease item
decreaseB.forEach((btn, i) => btn.addEventListener('click', () => {
    if (cards[i].amount > 1) {
        cards[i].amount--;

        const price = cards[i].price;
        const subtractPrice = (price * cards[i].amount);

        let spanDecreaseAmount = btn.nextElementSibling;

        spanDecreaseAmount.innerText = `${cards[i].amount}`;
        priceField[i].innerText = `${subtractPrice.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`
    }
}));

//cart list interaction
const quantity = document.getElementById('item__quantity');
const select = document.querySelectorAll('#selectButton');
const price = document.querySelectorAll('#price');

select.forEach((btn, i) => {
    btn.addEventListener('click', () => {

        let priceMultipliedCorrectly = price[i].textContent;
        priceMultipliedCorrectly = parseFloat(priceMultipliedCorrectly.replace(',', '.'));

        const selectedCoffe = {
            'image': `${cards[i].image}`,
            'type': `${cards[i].type}`,
            'title': `${cards[i].title}`,
            'description': `${cards[i].description}`,
            'price': `${priceMultipliedCorrectly}`,
            'amount': `${cards[i].amount}`
        }
        cartItems.push(selectedCoffe);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        numberItemsCart();
    })
})

//function to get all arrays in local storage and sum the 'amount'
function numberItemsCart() {
    const quantityInLocalStorage = JSON.parse(localStorage.getItem('cart'));
    if (quantityInLocalStorage.length > 0) {
        let cartQuantity = quantityInLocalStorage.map(item => {
            return { amount: item.amount };
        });

        totalAmount = cartQuantity.reduce((acc, item) => acc + parseInt(item.amount), 0)
        quantity.innerText = totalAmount;
    }
}
numberItemsCart()