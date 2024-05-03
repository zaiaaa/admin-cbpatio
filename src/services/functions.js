import { format } from "date-fns";

function formataDinheiro(valor){
    const formata = Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
    return formata.format(valor)
}

function formataData(data) {
    const data1 = new Date(data) // Extraindo cada parte da data
    const ano = data1.getUTCFullYear(); // Obtém o ano (UTC)
    const mes = data1.getUTCMonth() + 1; // Obtém o mês (UTC). Lembrando que janeiro é 0, então é necessário adicionar 1.
    const dia = data1.getUTCDate(); // Obtém o dia do mês (UTC)
    const hora = data1.getUTCHours(); // Obtém a hora (UTC)
    const minuto = data1.getUTCMinutes(); // Obtém os minutos (UTC)
    const segundo = data1.getUTCSeconds(); // Obtém os segundos (UTC)
    const milissegundo = data1.getUTCMilliseconds(); // Obtém os milissegundos (UTC)
    const dataLocal = new Date(ano, mes, dia, hora, minuto, segundo, milissegundo);
    return format(dataLocal, "dd/MM/yyyy HH:mm:ss")
}

function formataDataInput(data) {
    const data1 = new Date(data) // Extraindo cada parte da data
    const ano = data1.getUTCFullYear(); // Obtém o ano (UTC)
    const mes = data1.getUTCMonth() + 1; // Obtém o mês (UTC). Lembrando que janeiro é 0, então é necessário adicionar 1.
    const dia = data1.getUTCDate(); // Obtém o dia do mês (UTC)
    const hora = data1.getUTCHours(); // Obtém a hora (UTC)
    const minuto = data1.getUTCMinutes(); // Obtém os minutos (UTC)
    const segundo = data1.getUTCSeconds(); // Obtém os segundos (UTC)
    const milissegundo = data1.getUTCMilliseconds(); // Obtém os milissegundos (UTC)
    const dataLocal = new Date(ano, mes, dia, hora, minuto, segundo, milissegundo);
    return format(dataLocal, "yyyy-MM-dd HH:mm:ss")
}

export {formataDinheiro, formataData, formataDataInput}