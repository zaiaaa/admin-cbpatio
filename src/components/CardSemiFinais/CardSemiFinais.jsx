import './CardSemiFinais.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Api } from '../../services/api';
import { Button } from '../Button/button';
import { PopoverComponent } from '../Popover/Popover';
import { PopoverDefinirHorario } from '../PopoverDefinirHorario/PopoverDefinirHorario';
import { format } from 'date-fns';
import { Center, Spinner } from '@chakra-ui/react';


const CardSemiFinais = ({ className, getDadosJogo, ladoChave }) => {
    
    const [loading, setLoading] = useState(false)

    const [selectedValues, setSelectedValues] = useState([]);
    
    const [times, setTimes] = useState([])

    const [oitavas, setOitavas] = useState({})

    const [quartas, setQuartas] = useState([])

    const [final, setFinal] = useState([])

    const [chave, setChave] = useState({})

    const { id } = useParams()

    useEffect(() => {
        const getTeams = async () => {
            const [times, oitavas, quartas, final] = await Promise.all([
                Api.get(`/campeonatos/time/times/${id}`),
                Api.get(`/campeonatos/time/times/fase/oitavas/${id}`),
                Api.get(`/campeonatos/time/times/fase/quartas/${id}`),
                Api.get(`/campeonatos/time/times/fase/final/${id}`)
            ])
            
            setTimes(times.data)
            setOitavas(oitavas.data)
            setQuartas(quartas.data)
            setFinal(final.data)
        }

        const getChave = async () => {
            setLoading(true)
            const [esq, dir] = await Promise.all([
                Api.get(`/campeonatos/time/times/chave/esquerda/${id}/semis`),
                Api.get(`/campeonatos/time/times/chave/direita/${id}/semis`)
            ])
            
            setChave({
                esquerda: esq.data,
                direita: dir.data
            })
            setLoading(false)
        }

        getTeams()
        getChave()
    }, [])

    console.log(chave)

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
            await Api.delete(`/campeonatos/resetar/fase/semis/${id}`)
            await Api.delete(`/campeonatos/resetar/fase/eliminado quartas/${id}`)

            await Api.put(`/campeonatos/time/aconteceu/fase/quartas/${id}`, {
                aconteceu: ''
            })
            window.location.reload()
        }catch(e){
            alert(e)
        }
        setLoading(false)
    }

    const handleAlteraChave = async () => {
        setLoading(true)
        try {
            const { data } = await Api.get(`/campeonatos/time/times/fase/semis/${id}`);
            for (const time of data) {
                await Api.put(`/campeonatos/time/alterarTime/${time.id_time_campeonato}`, {
                    fase: "",
                    jogo: "",
                    chave: "",
                    aconteceu: "",
                    data_hora: null
                });
            }

            alert("Chave resetada com sucesso!")
            window.location.reload();
        } catch (error) {
            alert(error);
        }
        setLoading(false)
    }

    function disableCheckBox(){
        //se tem chave e se nao tem quartas
        if(chave?.esquerda?.length > 0) return true

        if(final?.length > 0) return true

        if(quartas?.length > 0) return false
        
        if(oitavas?.length > 0) return true

        
        return false
    }

    console.log(final?.length > 0)

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

            <div className={`semis-fase ${className}`}>
                <div className="fase-titulo">
                    Semis
                </div>
                <div className="fase-jogos">
                    <div className="jogo">
                        <div className="jogo-numero">jogo 1</div>
                        {!chave || !chave.esquerda || !chave.esquerda[0] ? 
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(0, `jogo 1 semis${quartas.length == 0 ? '-start' : ""} (casa) ${ladoChave}`, e)} disabled={disableCheckBox()}>
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[0]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && chave?.esquerda ? chave?.esquerda[0]?.nome : ladoChave === 'direita' && chave?.direita ? chave?.direita[0]?.nome : ""}</option>
                                )
                            }

                            
                            {
                                quartas.length === 0 ? 
                                
                                times.map((item, index) => (
                                    <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                        {item.nome}
                                    </option>
                                )) 
                                
                                : 

                                quartas.map(
                                    (item, index) => (
                                    <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                        {item.nome}
                                    </option>
                                ))

                            }
                            
                            
                            
                        </select>
                        
                        : 
                        
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(0, `jogo 1 semis${quartas.length == 0 ? '-start' : ""} (casa) ${ladoChave}`, e)} disabled={disableCheckBox()}>
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
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(1, `jogo 1 semis${quartas.length == 0 ? '-start' : ""} (visitante) ${ladoChave}`, e)} disabled={disableCheckBox()}>
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[1]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && chave?.esquerda ? chave?.esquerda[1]?.nome : ladoChave === 'direita' && chave?.direita ? chave?.direita[1]?.nome : ""}</option>
                                )
                            }

                            
                            {
                                quartas.length === 0 ? 
                                times.map((item, index) => (
                                    <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                        {item.nome}
                                    </option>
                                )) 
                                
                                : 

                                quartas.map(
                                    (item, index) => (
                                    <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                        {item.nome}
                                    </option>
                                ))

                            }
                            
                            
                            
                        </select>
                        
                        : 
                        
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(1, `jogo 1 semis${quartas.length == 0 ? '-start' : ""} (visitante) ${ladoChave}`, e)} disabled={disableCheckBox()}>
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
                                fase={"semis"}
                                textDispare={<i className="fa-solid fa-gear"></i>}
                                popoverTitle={`Data & Hora do jogo 1: `}
                                timesInscritos={chave?.esquerda}
                            />
                        </div>
                    </div>
                </div>
                {quartas?.length > 0 && chave?.esquerda?.length && final?.length === 0 ? <Button text={"Resetar semis"} variant={"red"} onClick={handleDeletaChave}/> : quartas?.length === 0 && chave?.esquerda?.length && final?.length === 0 ? <Button text={"put semis"} variant={"red"} onClick={handleAlteraChave}/> : ""}

            </div>
        }
        </>
    )
}

export { CardSemiFinais }