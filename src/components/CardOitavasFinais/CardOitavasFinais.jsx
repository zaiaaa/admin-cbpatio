import { useParams } from 'react-router-dom';
import { Api } from '../../services/api';
import './CardOitavasFinais.css'
import { useEffect, useState } from 'react';

const CardOitavasFinais = ({ className, getDadosJogo, ladoChave }) => {

    const [selectedValues, setSelectedValues] = useState([]);
    const [times, setTimes] = useState([])
    const [oitavas, setOitavas] = useState([])
    const [nomeOitavas, setNomeOitavas] = useState([])
    const [timesComNomes, setTimesComNomes] = useState([]);
    //const [IdtimesJaSelecionados, setIdTimesJaSelecionados] = useState([])


    const { id } = useParams()

    useEffect(() => {
        const getTeams = async () => {
            const { data } = await Api.get(`/campeonatos/time/times/${id}`)
            setTimes(data)
        }

        const getOitavas = async () => {
            const { data } = await Api.get('/campeonatos/time/times/fase/oitavas')
            setOitavas(data)
        }
        getTeams()
        getOitavas()
    }, [])

    useEffect(() => {
        async function fetchNomesTimes() {
            const nomesTimes = await Promise.all(
                times.map(async (item) => {
                    const { data } = await Api.get(`/times/time/${item.fk_id_time}`)
                    return { id_time_campeonato: item.id_time_campeonato, id_time: item.fk_id_time, nome: data[0].nome };
                })
            );
            
            const nomesOitavas = await Promise.all(
                oitavas.map(async (item) => {
                    const { data } = await Api.get(`/times/time/${item.fk_id_time}`)
                    return { id_time_campeonato: item.id_time_campeonato, id_time: item.fk_id_time, nome: data[0].nome };
                })
            );

            setTimesComNomes(nomesTimes);
            setNomeOitavas(nomesOitavas)
        }

        fetchNomesTimes();
    }, [times]);


    const handleSelectChange = (id, name, event) => {
        // console.log(event.target.value)
        // const idTime = event.target.value.split(" ")[0]

        // setIdTimesJaSelecionados(prevState => [
        //     ...prevState,
        //     idTime
        // ])

        // console.log(IdtimesJaSelecionados)
        // console.log(timesComNomes)
        // const optionsTags = window.document.getElementsByTagName('option')
        // const selectTags = document.querySelector('.oitavas-fase').getElementsByTagName('select')

        // console.log(selectTags)

        

        setSelectedValues(prevState => [
            ...prevState,
            { "id_time_and_time_campeonato": event.target.value, "name": name }
        ]);
    };

    useEffect(() => {
        getDadosJogo(selectedValues)
        console.log(selectedValues)
    }, [selectedValues])

    console.log(oitavas)

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
                            {!oitavas || !oitavas[0] ? (<option value="">Selecione a equipe!</option>) : (<option value={oitavas ? oitavas[0]?.fk_id_time : "2"}>{nomeOitavas && ladoChave == 'esquerda' ? nomeOitavas[0]?.nome : nomeOitavas[8]?.nome}</option>) }

                            {timesComNomes.map((item, index) => (
                                <option key={index} value={`${item.id_time} ${item.id_time_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                        VS.
                        <select name="sla" id="sla" onChange={(e) => handleSelectChange(1, `jogo 1 oitavas (visitante) ${ladoChave}`, e)}>
                        {!oitavas || !oitavas[0] ? (<option value="">Selecione a equipe!</option>) : (<option value={oitavas ? oitavas[1]?.fk_id_time : "2"}>{nomeOitavas ? nomeOitavas[1]?.nome : ""}</option>) }
 
                            {timesComNomes.map((item, index) => (
                                <option key={index} value={`${item.id_time} ${item.id_time_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="jogo">
                        <div className="jogo-numero">jogo 2</div>
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(2, `jogo 2 oitavas (casa) ${ladoChave}`, e)}>
                        {!oitavas || !oitavas[0] ? (<option value="">Selecione a equipe!</option>) : (<option value={oitavas ? oitavas[2]?.fk_id_time : "2"}>{nomeOitavas ? nomeOitavas[2]?.nome : ""}</option>) }

                            {timesComNomes.map((item, index) => (
                                <option key={index} value={`${item.id_time} ${item.id_time_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                        VS.
                        <select name="sla" id="sla" onChange={(e) => handleSelectChange(3, `jogo 2 oitavas (visitante) ${ladoChave}`, e)}>
                        {!oitavas || !oitavas[0] ? (<option value="">Selecione a equipe!</option>) : (<option value={oitavas ? oitavas[3]?.fk_id_time : "2"}>{nomeOitavas ? nomeOitavas[3]?.nome : ""}</option>) }

                            {timesComNomes.map((item, index) => (
                                <option key={index} value={`${item.id_time} ${item.id_time_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="jogo">
                        <div className="jogo-numero">jogo 3</div>
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(4, `jogo 3 oitavas (casa) ${ladoChave}`, e)}>
                        {!oitavas || !oitavas[0] ? (<option value="">Selecione a equipe!</option>) : (<option value={oitavas ? oitavas[4]?.fk_id_time : "2"}>{nomeOitavas ? nomeOitavas[4]?.nome : ""}</option>) }

                            {timesComNomes.map((item, index) => (
                                <option key={index} value={`${item.id_time} ${item.id_time_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                        VS.
                        <select name="sla" id="sla" onChange={(e) => handleSelectChange(5, `jogo 3 oitavas (visitante) ${ladoChave}`, e)}>
                        {!oitavas || !oitavas[0] ? (<option value="">Selecione a equipe!</option>) : (<option value={oitavas ? oitavas[5]?.fk_id_time : "2"}>{nomeOitavas ? nomeOitavas[5]?.nome : ""}</option>) }

                            {timesComNomes.map((item, index) => (
                                <option key={index} value={`${item.id_time} ${item.id_time_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="jogo">
                        <div className="jogo-numero">jogo 4</div>
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(6, `jogo 4 oitavas (casa) ${ladoChave}`, e)}>
                        {!oitavas || !oitavas[0] ? (<option value="">Selecione a equipe!</option>) : (<option value={oitavas ? oitavas[6]?.fk_id_time : "2"}>{nomeOitavas ? nomeOitavas[6]?.nome : ""}</option>) }

                            {timesComNomes.map((item, index) => (
                                <option key={index} value={`${item.id_time} ${item.id_time_campeonato}`}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                        VS.
                        <select name="sla" id="sla" onChange={(e) => handleSelectChange(7, `jogo 4 oitavas (visitante) ${ladoChave}`, e)}>
                        {!oitavas || !oitavas[0] ? (<option value="">Selecione a equipe!</option>) : (<option value={oitavas ? oitavas[7]?.fk_id_time : "2"}>{nomeOitavas ? nomeOitavas[7]?.nome : ""}</option>) }

                            {timesComNomes.map((item, index) => (
                                <option key={index} value={`${item.id_time} ${item.id_time_campeonato}`}>
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