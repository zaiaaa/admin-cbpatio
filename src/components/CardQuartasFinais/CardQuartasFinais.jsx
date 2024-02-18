import './CardQuartasFinais.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Api } from '../../services/api';
import { Button } from '../Button/button';

const CardQuartasFinais = ({className, getDadosJogo, ladoChave}) => {

    const [selectedValues, setSelectedValues] = useState([]);
    
    const [times, setTimes] = useState([])

    const [oitavas, setOitavas] = useState([])

    const [chave, setChave] = useState({})

    const { id } = useParams()

    useEffect(() => {
        const getTeams = async () => {
            const { data } = await Api.get(`/campeonatos/time/times/${id}`)
            setTimes(data)
        }

        const getOitavas = async () => {
            const {data} = await Api.get(`/campeonatos/time/times/fase/oitavas/${id}`)
            setOitavas(data)
        } 

        const getChave = async () => {
            const esq = await Api.get(`/campeonatos/time/times/chave/esquerda/${id}/quartas`)
            const dir = await Api.get(`/campeonatos/time/times/chave/direita/${id}/quartas`)

            setChave({
                esquerda: esq.data,
                direita: dir.data
            })
        }

        getTeams()
        getChave()
        getOitavas()
    }, [])

    console.log(oitavas)

    const handleSelectChange = (id, name, event) => {      
         // Define o novo valor selecionado
        const newValue = { "id": id, "id_time_and_time_campeonato": event.target.value, "name": name };
        // Atualiza o estado mantendo apenas o último valor para o checkbox correspondente
        setSelectedValues(prevState => {
        // Filtra os valores antigos removendo o valor do checkbox atual
        const filteredValues = prevState.filter(value => value.id !== id);
        // Retorna um novo array com o novo valor adicionado
        return [...filteredValues, newValue];}
    )};

    useEffect(() => {
        getDadosJogo(selectedValues)
    }, [selectedValues])

    const handleDeletaChave = async () => {
        try{
            await Api.delete(`/campeonatos/resetar/fase/quartas/${id}`)
            await Api.delete(`/campeonatos/resetar/fase/eliminado oitavas/${id}`)
            window.location.reload()
        }catch(e){
            alert(e)
        }
    }
    //console.log(chave.esquerda[0])

    return (
        // TODO fazer um botao de resetar a chave e cadastrar defineCssVars, pq das quartas pra frente é só post
        <>
            <div className={`quartas-fase ${className}`}>
                <div className="fase-titulo">
                    Quartas
                </div>
                <div className="fase-jogos">
                    <div className="jogo">
                        <div className="jogo-numero">jogo 1</div>
                        {!chave || !chave.esquerda || !chave.esquerda[0] ? 
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(0, `jogo 1 quartas${oitavas.length == 0 ? '-start' : ""} (casa) ${ladoChave}`, e)}>
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[0]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && chave?.esquerda ? chave?.esquerda[0]?.nome : ladoChave === 'direita' && chave?.direita ? chave?.direita[0]?.nome : ""}</option>
                                )
                            }

                            {times.map((item, index) => (
                                <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                        
                        : 
                        
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(0, `jogo 1 quartas${oitavas.length == 0 ? '-start' : ""} (casa) ${ladoChave}`, e)}>
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[0]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && chave?.esquerda ? chave?.esquerda[0]?.nome : ladoChave === 'direita' && chave?.direita ? chave?.direita[0]?.nome : ""}</option>
                                )
                            }

                            {times.map((item, index) => (
                                <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                        }
                        
                        
                        VS.
                        
                        {!chave || !chave.esquerda || !chave.esquerda[1] ? 
                        <select name="sla" id="sla" onChange={(e) => handleSelectChange(1, `jogo 1 quartas${oitavas.length == 0 ? '-start' : ""} (visitante) ${ladoChave}`, e)}>
                            
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[1]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && chave?.esquerda ? chave?.esquerda[1]?.nome : ladoChave === 'direita' && chave?.direita ? chave?.direita[1]?.nome : ""}</option>
                                )
                            }

                            {times.map((item, index) => (
                                <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select> 
                        
                        :
                        
                        <select name="sla" id="sla" onChange={(e) => handleSelectChange(1, `jogo 1 quartas${oitavas.length == 0 ? '-start' : ""} (visitante) ${ladoChave}`, e)}>
                            
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[1]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && chave?.esquerda ? chave?.esquerda[1]?.nome : ladoChave === 'direita' && chave?.direita ? chave?.direita[1]?.nome : ""}</option>
                                )
                            }

                            {times.map((item, index) => (
                                <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}

                        </select>
                        
                        }
                        
                    </div>
                    <div className="jogo">
                        <div className="jogo-numero">jogo 2</div>
                        
                        {!chave || !chave.esquerda || !chave.esquerda[2] ? <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(2, `jogo 2 quartas${oitavas.length == 0 ? '-start' : ""} (casa) ${ladoChave}`, e)}>
                        {
                            (!chave || !chave.esquerda || !chave.esquerda[2]) ? (
                                <option value="">Selecione a equipe!</option>
                            ) : (
                                <option value="">{ladoChave === 'esquerda' && chave?.esquerda ? chave?.esquerda[2]?.nome : ladoChave === 'direita' && chave?.direita ? chave?.direita[2]?.nome : ""}</option>
                            )
                        }
                        {times.map((item, index) => (
                                <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                        
                        : 
                        
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(2, `jogo 2 quartas${oitavas.length == 0 ? '-start' : ""} (casa) ${ladoChave}`, e)}>
                        {
                            (!chave || !chave.esquerda || !chave.esquerda[2]) ? (
                                <option value="">Selecione a equipe!</option>
                            ) : (
                                <option value="">{ladoChave === 'esquerda' && chave?.esquerda ? chave?.esquerda[2]?.nome : ladoChave === 'direita' && chave?.direita ? chave?.direita[2]?.nome : ""}</option>
                            )
                        }
                        {times.map((item, index) => (
                                <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}

                        </select>
                        
                        }

                        

                        VS.
                        
                        {!chave || !chave.esquerda || !chave.esquerda[3] ? <select name="sla" id="sla" onChange={(e) => handleSelectChange(3, `jogo 2 quartas${oitavas.length == 0 ? '-start' : ""} (visitante) ${ladoChave}`, e)}>
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[3]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && chave?.esquerda ? chave?.esquerda[3]?.nome : ladoChave === 'direita' && chave?.direita ? chave?.direita[3]?.nome : ""}</option>
                                )
                            }

                           {times.map((item, index) => (
                                <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}

                        </select>
                        
                    :
                    
                    <select name="sla" id="sla" onChange={(e) => handleSelectChange(0, `jogo 2 quartas${oitavas.length == 3 ? '-start' : ""} (visitante) ${ladoChave}`, e)}>
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[3]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && chave?.esquerda ? chave?.esquerda[3]?.nome : ladoChave === 'direita' && chave?.direita ? chave?.direita[3]?.nome : ""}</option>
                                )
                            }

                            {times.map((item, index) => (
                                <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                    }
                        
                    </div>
                </div>
                
                {oitavas.length > 0 ? <Button text={"Resetar quartas"} variant={"red"} onClick={handleDeletaChave}/> : ""}
                
            </div>
        </>
    )
}

export { CardQuartasFinais }