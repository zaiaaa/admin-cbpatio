import './CardOitavasFinais.css'

const CardOitavasFinais = ({className}) => {
    return (
        <>
            <div className={`oitavas-fase ${className}`} >
                <div className="fase-titulo">
                    Oitavas
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
                    <div className="jogo">
                        <div className="jogo-numero">jogo 2</div>
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
                    <div className="jogo">
                        <div className="jogo-numero">jogo 2</div>
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

export { CardOitavasFinais }