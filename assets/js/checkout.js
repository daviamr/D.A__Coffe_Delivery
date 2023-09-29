const cepField = document.getElementById('cep');
const roadField = document.getElementById('road');
const neighbField = document.getElementById('neighb');
const cityField = document.getElementById('city');
const ufField = document.getElementById('uf');


const localpoint = document.querySelector('[data-location]');
const submit = document.getElementById('submit');
const numberField = document.getElementById('number');

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
    try {
        const endpoint = await fetch(`https://viacep.com.br/ws/${cepS}/json/`);
        const dataConv = await endpoint.json();

        if (dataConv.erro) {
            throw Error('deu ruim2');
        } else {
            cepField.value = `${dataConv.cep}`
            roadField.value = `${dataConv.logradouro}`
            neighbField.value = `${dataConv.bairro}`
            cityField.value = `${dataConv.localidade}`
            ufField.value = `${dataConv.uf}`

            localpoint.innerHTML = `<img src="./assets/img/icon/location.svg" alt="Imagem contendo o Estado em que você mora">${dataConv.localidade}, ${dataConv.uf}`;
        }

        setSucess(cepField);
        setSucess(roadField);
        setSucess(numberField);
        setSucess(neighbField);
        setSucess(cityField);
        setSucess(ufField);

        return dataConv;
    } catch (erro) {
        cepField.classList.add('set__error');
        cepField.setAttribute('placeholder', 'CEP não encontrado');

        localpoint.innerHTML = `<img src="./assets/img/icon/location.svg" alt="Imagem contendo o Estado em que você mora">`;

        resetFields();
    }

}

cepField.addEventListener('focusout', () => {
    const cepValue = cepField.value;

    if (cepValue.length >= 4) {
        searchCep(cepValue)
    }
});

function resetFields() {
    cepField.value = '';
    roadField.value = '';
    numberField.value = '';
    neighbField.value = '';
    cityField.value = '';
    ufField.value = '';
}

///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
//Checkout cart

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
    } else {
        quantity.innerText = `0`;
    }
}

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
        finalCalc();
        numberItemsCart();
    })
})

decreaseB.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        if (cardsLocalStorage[i].amount > 1) {
            cardsLocalStorage[i].amount--;
        }

        cards.forEach(card => {
            if (card.title === cardsLocalStorage[i].title) {
                const price = card.price;
                const subtractPrice = (price * cardsLocalStorage[i].amount);
                cardsLocalStorage[i].price = parseFloat(subtractPrice);

                let spanDecreaseAmount = btn.nextElementSibling;
                spanDecreaseAmount.innerText = `${cardsLocalStorage[i].amount}`;

                priceField[i].innerText = `R$ ${formatter(subtractPrice)}`;

                localStorage.setItem('cart', JSON.stringify(cardsLocalStorage));
            }
        })
        finalCalc();
        numberItemsCart();
    })
})

const image = document.querySelectorAll('.image__coffee');

removeB.forEach((btn, i) => {
    btn.setAttribute('id', `${cardsLocalStorage[i].id}`);

    btn.addEventListener('click', () => {
        for (let j = cardsLocalStorage.length - 1; j >= 0; j--) {
            if (btn.id === cardsLocalStorage[j].id) {

                const parentNode = image[i].parentNode;

                console.log(cardsLocalStorage[j].title, image[i]);
                cardsLocalStorage.splice(j, 1);
                parentNode.remove();

                // console.log(`${btn.id, cardsLocalStorage[j].id}`);

                // sectionCard.innerHTML = ``
                // cardsLocalStorage.forEach(card =>
                //     createACard(card.image, card.title, card.amount, card.price));

                finalCalc();
                numberItemsCart();
                break
            }
        }
        localStorage.setItem('cart', JSON.stringify(cardsLocalStorage));
    })
});

//Payment area
function finalCalc() {
    const paymentArea = document.getElementById('payment__area');
    const deliveryP = 3.50;
    let totalItems = 0;
    let totalWDelivery = 0;

    prices = cardsLocalStorage.map(card => { return { price: card.price } });
    totalItems = prices.reduce((acc, item) => acc + parseFloat(item.price), 0);

    totalWDelivery = totalItems + deliveryP;

    if (cardsLocalStorage.length > 0) {

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
        `

    } else {
        noneSelected();
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
        `
    }
}
finalCalc();

//function to release the alert that there are no coffees selected
function noneSelected() {
    const noneSTitle = document.getElementById('none__selected');
    return noneSTitle.style.display = 'block';
}

function setError(field) {
    return field.classList.add('set__error');
}

function setSucess(field) {
    return field.classList.remove('set__error');
}

submit.addEventListener('click', (e) => {
    const saveLocation = [];
    e.preventDefault();

    // const paymentMethod = document.querySelectorAll('.method');
    if (!cepField.value || !roadField.value || !neighbField.value || !cityField.value) {

        e.preventDefault();

        setError(cepField);
        setError(roadField);
        setError(neighbField);
        setError(cityField);
        setError(ufField);
    } else if (!numberField.value) {

        e.preventDefault();
        setError(numberField);
    } else if (cardsLocalStorage.length <= 0) {
        e.preventDefault();
        alert('Não há itens selecionados.');

        resetFields();
    } else {

        const location = {
            'road': roadField.value,
            'number': numberField.value,
            'neighborhood': neighbField.value,
            'city': cityField.value,
            'uf': ufField.value
        }

        saveLocation.push(location)
        localStorage.setItem('adress', JSON.stringify(saveLocation));

        setTimeout(() => {
            window.location.href = '../finished.html'
        }, 500);
    }
});

numberField.addEventListener('focusout', () => {
    numberField.classList.remove('set__error');
})
