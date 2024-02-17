import { useParams } from 'react-router-dom';
import { Api } from '../../services/api';
import './CardOitavasFinais.css'
import { useEffect, useState } from 'react';

const CardOitavasFinais = ({ className, getDadosJogo, ladoChave }) => {

    const [selectedValues, setSelectedValues] = useState([]);
    
    const [times, setTimes] = useState([])
        
    const [nomeChaves, setNomeChaves] = useState([])

    const [chave, setChave] = useState({})

    const { id } = useParams()

    useEffect(() => {
        const getTeams = async () => {
            const { data } = await Api.get(`/campeonatos/time/times/${id}`)
            setTimes(data)
        }

        const getChave = async () => {
            const esq = await Api.get(`/campeonatos/time/times/chave/esquerda/${id}/oitavas`)
            const dir = await Api.get(`/campeonatos/time/times/chave/direita/${id}/oitavas`)

            setChave({
                esquerda: esq.data,
                direita: dir.data
            })
        }

        getTeams()
        getChave()
    }, [])

    console.log(chave)

    useEffect(() => {
        async function fetchNomesOitavas() {            
            const nomesTimesChavesEsq = await Promise.all(
                chave.esquerda.map(async (item) => {
                    const { data } = await Api.get(`/times/time/${item.fk_id_time}`)
                    return { id_time_campeonato: item.id_time_campeonato, id_time: data[0].id_campeonato, nome: data[0].nome };
                })
            );

            const nomesTimesChavesDir = await Promise.all(
                chave.direita.map(async (item) => {
                    const { data } = await Api.get(`/times/time/${item.fk_id_time}`)
                    return { id_time_campeonato: item.id_time_campeonato, id_time: item.fk_id_time, nome: data[0].nome };
                })
            );

            setNomeChaves({
                esquerda: nomesTimesChavesEsq,
                direita: nomesTimesChavesDir
            })
        }

        fetchNomesOitavas()
    }, [chave])

    console.log(times)


    const handleSelectChange = (id, name, event) => {
        setSelectedValues(prevState => [
            ...prevState,
            { "id_time_and_time_campeonato": event.target.value, "name": name }
        ]);
    };

    useEffect(() => {
        getDadosJogo(selectedValues)
        console.log(selectedValues)
    }, [selectedValues])

    //console.log(chave.esquerda[0])

    return (
        <>
            <div className={`oitavas-fase ${className}`} >
                <div className="fase-titulo">
                    Oitavas
                </div>
                {/* alimentar os selects com os times ficticios */}
                <div className="fase-jogos">
                    <div className="jogo">
                        <div className="jogo-numero">jogo 1</div>
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(0, `jogo 1 oitavas (casa) ${ladoChave}`, e)}>
                            {/* se existe time cadastrado o valor padrao vai ser ele */}

                            {/* NA PARTE DO CLIENTE DEVEMOS FAZER A REQUEST SEM A CHAVE, JOGO E FASE.  */}
                            {/* VAMOS FAZER UM PUT E SETAR TODOS NAS OITAVAS, DEPOIS SÓ COM POSTS PRA PRÓXIMAS FASES */}
                            

                            {/* ITS FUCKING WORKING BITCHHHHHHHHH */}
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[0]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && nomeChaves?.esquerda ? nomeChaves?.esquerda[0]?.nome : ladoChave === 'direita' && nomeChaves?.direita ? nomeChaves?.direita[0]?.nome : ""}</option>
                                )
                            }

                            {times.map((item, index) => (
                                <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                        VS.
                        <select name="sla" id="sla" onChange={(e) => handleSelectChange(1, `jogo 1 oitavas (visitante) ${ladoChave}`, e)}>
                            
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[1]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && nomeChaves?.esquerda ? nomeChaves?.esquerda[1]?.nome : ladoChave === 'direita' && nomeChaves?.direita ? nomeChaves?.direita[1]?.nome : ""}</option>
                                )
                            } 

                            {times.map((item, index) => (
                                <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="jogo">
                        <div className="jogo-numero">jogo 2</div>
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(2, `jogo 2 oitavas (casa) ${ladoChave}`, e)}>
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[2]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && nomeChaves?.esquerda ? nomeChaves?.esquerda[2]?.nome : ladoChave === 'direita' && nomeChaves?.direita ? nomeChaves?.direita[2]?.nome : ""}</option>
                                )
                            }
                            {times.map((item, index) => (
                                <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                        VS.
                        <select name="sla" id="sla" onChange={(e) => handleSelectChange(3, `jogo 2 oitavas (visitante) ${ladoChave}`, e)}>
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[3]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && nomeChaves?.esquerda ? nomeChaves?.esquerda[3]?.nome : ladoChave === 'direita' && nomeChaves?.direita ? nomeChaves?.direita[3]?.nome : ""}</option>
                                )
                            }
                            {times.map((item, index) => (
                                <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="jogo">
                        <div className="jogo-numero">jogo 3</div>
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(4, `jogo 3 oitavas (casa) ${ladoChave}`, e)}>
                            
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[4]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && nomeChaves?.esquerda ? nomeChaves?.esquerda[4]?.nome : ladoChave === 'direita' && nomeChaves?.direita ? nomeChaves?.direita[4]?.nome : ""}</option>
                                )
                            }

                            {times.map((item, index) => (
                                <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                        VS.
                        <select name="sla" id="sla" onChange={(e) => handleSelectChange(5, `jogo 3 oitavas (visitante) ${ladoChave}`, e)}>
                            
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[5]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && nomeChaves?.esquerda ? nomeChaves?.esquerda[5]?.nome : ladoChave === 'direita' && nomeChaves?.direita ? nomeChaves?.direita[5]?.nome : ""}</option>
                                )
                            }

                            {times.map((item, index) => (
                                <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="jogo">
                        <div className="jogo-numero">jogo 4</div>
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(6, `jogo 4 oitavas (casa) ${ladoChave}`, e)}>
                            
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[6]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && nomeChaves?.esquerda ? nomeChaves?.esquerda[6]?.nome : ladoChave === 'direita' && nomeChaves?.direita ? nomeChaves?.direita[6]?.nome : ""}</option>
                                )
                            }

                            {times.map((item, index) => (
                                <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                        VS.
                        <select name="sla" id="sla" onChange={(e) => handleSelectChange(7, `jogo 4 oitavas (visitante) ${ladoChave}`, e)}>
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[0]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && nomeChaves?.esquerda ? nomeChaves?.esquerda[7]?.nome : ladoChave === 'direita' && nomeChaves?.direita ? nomeChaves?.direita[7]?.nome : ""}</option>
                                )
                            }
                            
                            {times.map((item, index) => (
                                <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
            </div>
        </>
    )
}

export { CardOitavasFinais }