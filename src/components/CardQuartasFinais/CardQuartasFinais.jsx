import './CardQuartasFinais.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Api } from '../../services/api';
import { Button } from '../Button/button';
import { PopoverComponent } from '../Popover/Popover';
import { PopoverDefinirHorario } from '../PopoverDefinirHorario/PopoverDefinirHorario';
import { format } from 'date-fns';
import { Center, Spinner } from '@chakra-ui/react';

const CardQuartasFinais = ({className, getDadosJogo, ladoChave}) => {

    const [loading, setLoading] = useState(false)

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
        setLoading(true)
        try{
            await Api.delete(`/campeonatos/resetar/fase/quartas/${id}`)
            await Api.delete(`/campeonatos/resetar/fase/eliminado oitavas/${id}`)
            window.location.reload();
            alert( "jogos resetados com sucesso")
        }catch(e){
            alert(e)
        }
        setLoading(false)
    }

    const handleAlteraChave = async () => {
        setLoading(true)
        try {
            const { data } = await Api.get(`/campeonatos/time/times/fase/quartas/${id}`);
            for (const time of data) {
                await Api.put(`/campeonatos/time/alterarTime/${time.id_time_campeonato}`, {
                    fase: "",
                    jogo: "",
                    chave: "",
                    data_hora: null
                });
            }
            window.location.reload();
        } catch (error) {
            alert(error);
        }
        setLoading(false)
    }
    //console.log(chave.esquerda[0])

    return (
        <>
        
        {
            loading

            ?
            
            <Center>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    color='#fff'
                    size='xl'
                />
            </Center>

            :

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
                        
                        <div className="jogo-opcoes">
                            {/* AQUI É ONDE VC VAI COLOCAR O HORARIO DO JOGO (SE VIRA) */}
                            
                            {/* aqui vem o ternario do lado da chave, certo? dps eu faço pq eu fui na harumi. fézinha 👌 */}
                            <PopoverComponent
                                popoverTitle={'O jogo vai começar:'}
                                textDispare={<i className="fa-solid fa-clock"></i>}
                            >
                                { 

                                ladoChave == "esquerda"
                                ?

                                !chave || !chave.esquerda || !chave.esquerda[0] || !chave.esquerda[0].data_hora 
                                ?
                                 
                                "Sem horario definido" 
                                 
                                 :
                                 
                                 format(chave.esquerda[0].data_hora, "dd/MM/yyyy - HH:mm:ss")
                                
                                 :

                                 !chave || !chave.direita || !chave.direita[0] || !chave.direita[0].data_hora 
                                ?
                                 
                                "Sem horario definido" 
                                 
                                 :
                                 
                                 format(chave.direita[0].data_hora, "dd/MM/yyyy - HH:mm:ss")
                                }
                            </PopoverComponent>

                            {/* AQUI É ONDE VC VAI SALVAR O HORARIO DO JOGO (SE VIRA) */}
                            <PopoverDefinirHorario
                                jogo={1}
                                chave={ladoChave}
                                fase={"quartas"}
                                textDispare={<i className="fa-solid fa-gear"></i>}
                                popoverTitle={`Data & Hora do jogo 1: `}
                            />
                        </div>

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

                        <div className="jogo-opcoes">
                            {/* AQUI É ONDE VC VAI COLOCAR O HORARIO DO JOGO (SE VIRA) */}
                            
                            {/* aqui vem o ternario do lado da chave, certo? dps eu faço pq eu fui na harumi. fézinha 👌 */}
                            <PopoverComponent
                                popoverTitle={'O jogo vai começar:'}
                                textDispare={<i className="fa-solid fa-clock"></i>}
                            >
                                { 

                                ladoChave == "esquerda"
                                ?

                                !chave || !chave.esquerda || !chave.esquerda[2] || !chave.esquerda[2].data_hora 
                                ?
                                 
                                "Sem horario definido" 
                                 
                                 :
                                 
                                 format(chave.esquerda[2].data_hora, "dd/MM/yyyy - HH:mm:ss")
                                
                                 :

                                 !chave || !chave.direita || !chave.direita[2] || !chave.direita[2].data_hora 
                                ?
                                 
                                "Sem horario definido" 
                                 
                                 :
                                 
                                 format(chave.direita[2].data_hora, "dd/MM/yyyy - HH:mm:ss")
                                }
                            </PopoverComponent>

                            {/* AQUI É ONDE VC VAI SALVAR O HORARIO DO JOGO (SE VIRA) */}
                            <PopoverDefinirHorario
                                jogo={2}
                                chave={ladoChave}
                                fase={"quartas"}
                                textDispare={<i className="fa-solid fa-gear"></i>}
                                popoverTitle={`Data & Hora do jogo 2: `}
                            />
                        </div>
                        
                    </div>
                </div>
                
                {oitavas.length > 0 ? <Button text={"Resetar quartas"} variant={"red"} onClick={handleDeletaChave}/> : <Button text={"Resetar quartas"} variant={"red"} onClick={handleAlteraChave}/>}
                
            </div>

        }
            
        </>
    )
}

export { CardQuartasFinais }