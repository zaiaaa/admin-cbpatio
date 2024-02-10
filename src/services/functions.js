function formataDinheiro(valor){
    const formata = Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
    return formata.format(valor)
}

export {formataDinheiro}