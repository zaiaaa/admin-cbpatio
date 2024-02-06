import './PreviewCampeonato.css'


const PreviewCampeonato = ({ nome, sinopse, data_hora, modalidade, valor_ingresso, premiacao, jogadores_time, limite_inscricao }) => {
    return (
        <>
            <div className="card-info">
                <div>
                    <p>
                        <span>nome: </span>
                        {nome}
                    </p>
                    <p>
                        <span>sinopse: </span>
                        {sinopse}
                    </p>
                </div>
                <div>
                    <p>
                        <span>data & hora: </span>
                        {data_hora}
                    </p>
                    <p>
                        <span>modalidade: </span>
                        {modalidade}
                    </p>
                    <p>
                        <span>valor_ingresso: </span>
                        <span className='valor'>{valor_ingresso},00 R$</span>
                    </p>
                    <p>
                        <span >premiacao: </span>
                        <span className='premio'>{premiacao},00 R$</span>
                    </p>
                    <p>
                        <span>jogadores_time: </span>
                        {jogadores_time}
                    </p>
                    <p>
                        <span>limite_inscricao: </span>
                        {limite_inscricao}
                    </p>
                </div>
            </div>
            <div className="preview">

            </div>
        </>
    )
}

export { PreviewCampeonato }