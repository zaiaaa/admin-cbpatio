import './CardQuartasFinais.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Api } from '../../services/api';

const CardQuartasFinais = ({className, getDadosJogo, ladoChave}) => {

    const [selectedValues, setSelectedValues] = useState([]);
    
    const [times, setTimes] = useState([])
        
    const [nomeChaves, setNomeChaves] = useState([])

    const [chave, setChave] = useState({})
    
    const [timesComNomes, setTimesComNomes] = useState([]);
    //const [IdtimesJaSelecionados, setIdTimesJaSelecionados] = useState([])


    const { id } = useParams()

    useEffect(() => {
        const getTeams = async () => {
            const { data } = await Api.get(`/campeonatos/time/times/fase/oitavas/${id}`)
            setTimes(data)
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
    }, [])

    console.log(chave)

    useEffect(() => {
        async function fetchNomesTimes() {
            const nomesTimes = await Promise.all(
                times.map(async (item) => {
                    const { data } = await Api.get(`/campeonatos/time/times/nome/ids/${item.fk_id_time}`)
                    return { id_time_campeonato: item.id_time_campeonato, id_time: item.fk_id_time, id_campeonato: data[0].id_campeonato, nome: data[0].nome_time };
                })
            );

            setTimesComNomes(nomesTimes);
        }

        fetchNomesTimes();
    }, [times]);

    console.log(timesComNomes)

    useEffect(() => {
        async function fetchNomesOitavas() {            
            const nomesTimesChavesEsq = await Promise.all(
                chave.esquerda.map(async (item) => {
                    const { data } = await Api.get(`/times/time/${item.fk_id_time}`)
                    return { id_time_campeonato: item.id_time_campeonato, id_time: item.fk_id_time, nome: data[0].nome };
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

    console.log(nomeChaves)


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

    console.log(times)

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
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(0, `jogo 1 quartas (casa) ${ladoChave}`, e)}>
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[0]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && nomeChaves?.esquerda ? nomeChaves?.esquerda[0]?.nome : ladoChave === 'direita' && nomeChaves?.direita ? nomeChaves?.direita[0]?.nome : ""}</option>
                                )
                            }

                            {timesComNomes.map((item, index) => (
                                <option key={index} value={`${item.id_time} ${item.id_time_campeonato} ${item.id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                        VS.
                        <select name="sla" id="sla" onChange={(e) => handleSelectChange(0, `jogo 1 quartas (visitante) ${ladoChave}`, e)}>
                            
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[1]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && nomeChaves?.esquerda ? nomeChaves?.esquerda[1]?.nome : ladoChave === 'direita' && nomeChaves?.direita ? nomeChaves?.direita[1]?.nome : ""}</option>
                                )
                            }

                            {timesComNomes.map((item, index) => (
                                <option key={index} value={`${item.id_time} ${item.id_time_campeonato} ${item.id_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}

                        </select>
                    </div>
                    <div className="jogo">
                        <div className="jogo-numero">jogo 2</div>
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(0, `jogo 2 quartas (casa) ${ladoChave}`, e)}>
                        {
                            (!chave || !chave.esquerda || !chave.esquerda[2]) ? (
                                <option value="">Selecione a equipe!</option>
                            ) : (
                                <option value="">{ladoChave === 'esquerda' && nomeChaves?.esquerda ? nomeChaves?.esquerda[2]?.nome : ladoChave === 'direita' && nomeChaves?.direita ? nomeChaves?.direita[2]?.nome : ""}</option>
                            )
                        }
                        {timesComNomes.map((item, index) => (
                            <option key={index} value={`${item.id_time} ${item.id_time_campeonato} ${item.id_campeonato}`}>
                                {item.nome}
                            </option>
                        ))}

                        </select>
                        VS.
                        <select name="sla" id="sla" onChange={(e) => handleSelectChange(0, `jogo 2 quartas (visitante) ${ladoChave}`, e)}>
                            {
                                (!chave || !chave.esquerda || !chave.esquerda[3]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && nomeChaves?.esquerda ? nomeChaves?.esquerda[3]?.nome : ladoChave === 'direita' && nomeChaves?.direita ? nomeChaves?.direita[3]?.nome : ""}</option>
                                )
                            }

                            {timesComNomes.map((item, index) => (
                                <option key={index} value={`${item.id_time} ${item.id_time_campeonato} ${item.id_campeonato}`}>
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

export { CardQuartasFinais }