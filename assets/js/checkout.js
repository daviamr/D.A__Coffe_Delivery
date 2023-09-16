const cepField = document.getElementById('cep');
const roadField = document.getElementById('road');
const neighbField = document.getElementById('neighb');
const cityField = document.getElementById('city');
const ufField = document.getElementById('uf');

const valorBusca = [];

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