async function viaCep(cep) {
    const endpoint = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dataConverted = await endpoint.json();
    console.log(dataConverted)
}
viaCep(25561140)