import { useParams } from 'react-router-dom';
import { Api } from '../../services/api';
import './CardOitavasFinais.css'
import { useEffect, useState } from 'react';
import { Button } from '../Button/button';
import { PopoverComponent } from '../Popover/Popover';
import { PopoverDefinirHorario } from '../PopoverDefinirHorario/PopoverDefinirHorario';
import { format } from 'date-fns';


const CardOitavasFinais = ({ className, getDadosJogo, ladoChave }) => {

    const [selectedValues, setSelectedValues] = useState([]);

    const [times, setTimes] = useState([])

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
    console.log(chave.esquerda)


    const handleSelectChange = (id, name, event) => {
        // Define o novo valor selecionado
        const newValue = { "id": id, "id_time_and_time_campeonato": event.target.value, "name": name };
        // Atualiza o estado mantendo apenas o último valor para o checkbox correspondente
        setSelectedValues(prevState => {
            // Filtra os valores antigos removendo o valor do checkbox atual
            const filteredValues = prevState.filter(value => value.id !== id);
            // Retorna um novo array com o novo valor adicionado
            return [...filteredValues, newValue];
        }
        )
    };

    useEffect(() => {
        getDadosJogo(selectedValues)
        console.log(selectedValues)
    }, [selectedValues])

    //console.log(chave.esquerda[0])

    const handleAlteraChave = async () => {
        try {
            const { data } = await Api.get(`/campeonatos/time/times/fase/oitavas/${id}`);
            for (const time of data) {
                await Api.put(`/campeonatos/time/alterarTime/${time.id_time_campeonato}`, {
                    fase: "",
                    jogo: "",
                    chave: ""
                });
            }
            window.location.reload();
        } catch (error) {
            alert(error);
        }
    }

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
                        {/*disabled={chave ? true : false}*/}
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(0, `jogo 1 oitavas (casa) ${ladoChave}`, e)}  >


                            {/* nesse caso, se nao tiver chave, o default será "Selecione a equipe!, se já tiver uma chave (ou seja, se ja existem times cadastrados nessa fase), mostraremos o nome do time. "*/}
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
                        VS.
                        <select name="sla" id="sla" onChange={(e) => handleSelectChange(1, `jogo 1 oitavas (visitante) ${ladoChave}`, e)}>

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

                        <div className="jogo-opcoes">
                            {/* AQUI É ONDE VC VAI COLOCAR O HORARIO DO JOGO (SE VIRA) */}
                            
                            {/* aqui vem o ternario do lado da chave, certo? dps eu faço pq eu fui na harumi. fézinha 👌 */}
                            <PopoverComponent
                                popoverTitle={'O jogo vai começar:'}
                                textDispare={<i className="fa-solid fa-clock"></i>}
                            >
                                { !chave || !chave.esquerda || !chave.esquerda[0] || !chave.esquerda[0].data_hora ? "Sem horario definido" : format(chave.esquerda[0].data_hora, "dd/MM/yyyy - HH:mm:ss")}
                            </PopoverComponent>

                            {/* AQUI É ONDE VC VAI SALVAR O HORARIO DO JOGO (SE VIRA) */}
                            <PopoverDefinirHorario
                                jogo={1}
                                chave={ladoChave}
                                fase={"oitavas"}
                                textDispare={<i className="fa-solid fa-gear"></i>}
                                popoverTitle={`Data & Hora do jogo 1: `}
                            />
                        </div>
                    </div>
                    <div className="jogo">
                        <div className="jogo-numero">jogo 2</div>
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(2, `jogo 2 oitavas (casa) ${ladoChave}`, e)}>
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
                        VS.
                        <select name="sla" id="sla" onChange={(e) => handleSelectChange(3, `jogo 2 oitavas (visitante) ${ladoChave}`, e)}>
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
                    </div>
                    <div className="jogo">
                        <div className="jogo-numero">jogo 3</div>
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(4, `jogo 3 oitavas (casa) ${ladoChave}`, e)}>

                            {
                                (!chave || !chave.esquerda || !chave.esquerda[4]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{ladoChave === 'esquerda' && chave?.esquerda ? chave?.esquerda[4]?.nome : ladoChave === 'direita' && chave?.direita ? chave?.direita[4]?.nome : ""}</option>
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
                                    <option value="">{ladoChave === 'esquerda' && chave?.esquerda ? chave?.esquerda[5]?.nome : ladoChave === 'direita' && chave?.direita ? chave?.direita[5]?.nome : ""}</option>
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
                                    <option value="">{ladoChave === 'esquerda' && chave?.esquerda ? chave?.esquerda[6]?.nome : ladoChave === 'direita' && chave?.direita ? chave?.direita[6]?.nome : ""}</option>
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
                                    <option value="">{ladoChave === 'esquerda' && chave?.esquerda ? chave?.esquerda[7]?.nome : ladoChave === 'direita' && chave?.direita ? chave?.direita[7]?.nome : ""}</option>
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

                <Button text={"Resetar oitavas"} variant={"red"} onClick={handleAlteraChave} />
            </div>
        </>
    )
}

export { CardOitavasFinais }