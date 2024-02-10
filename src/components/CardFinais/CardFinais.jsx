import './CardFinais.css'

const CardFinais = ({className}) => {
    return (
        <>
            <div className={` finais-fase ${className}`}>
                <div className="fase-titulo">
                    Final
                </div>
                <div className="fase-jogos">
                    <div className="jogo">
                        <div className="jogo-numero">jogo 1</div>
                        <select name="jogo" id="jogo">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        VS.
                        <select name="sla" id="sla">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export { CardFinais }