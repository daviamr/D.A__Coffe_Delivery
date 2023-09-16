async function searchCep(cep) {
    const endpoint = await fetch(`https://viacep.com.br/ws/25560461/json/`);
    const dataConverted = await endpoint.json();
    return dataConverted;
}

export const apiConection = {
    searchCep
}
