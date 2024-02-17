import './CardFinais.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Api } from '../../services/api';
import { Button } from '../Button/button';

const CardFinais = ({className, getDadosJogo}) => {

    const [selectedValues, setSelectedValues] = useState([]);
    
    const [semis, setSemis] = useState([])

    const [chave, setChave] = useState({})

    const { id } = useParams()

    console.log(semis)

    useEffect(() => {


        const getSemis = async () => {
            const {data} = await Api.get(`/campeonatos/time/times/fase/semis/${id}`)
            setSemis(data)
        } 

        const getFinal = async () => {
            const {data} = await Api.get(`/campeonatos/time/times/chave/esquerda/${id}/final`)
            setChave(data)
        }

        getFinal()
        getSemis()
    }, [])

    console.log(chave)

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

    const handleDeletaChave = async () => {
        try{
            await Api.delete(`/campeonatos/resetar/fase/semis/${id}`)
            window.location.reload()
        }catch(e){
            alert(e)
        }
    }


    return (
        <>
            <div className={` finais-fase ${className}`}>
                <div className="fase-titulo">
                    Final
                </div>
                <div className="fase-jogos">
                    <div className="jogo">
                        <div className="jogo-numero">jogo 1</div>
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(0, `jogo 1 final (casa)`, e)}>
                            {
                                (chave.length === 0) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{chave.length > 0 ? chave[0].nome : ""}</option>
                                )
                            }

                            
                            {
                                semis.map((item, index) => (
                                    <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                        {item.nome}
                                    </option>
                                )) 
                            }

                        </select>
                        VS.
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(0, `jogo 1 final (visitante)`, e)}>
                            {
                                (!chave || !chave[1]) ? (
                                    <option value="">Selecione a equipe!</option>
                                ) : (
                                    <option value="">{chave.length > 0 ? chave[1].nome : ""}</option>
                                )
                            }

                            
                            {
                                semis.map((item, index) => (
                                    <option key={index} value={`${item.fk_id_time} ${item.id_time_campeonato} ${item.fk_id_campeonato}`}>
                                        {item.nome}
                                    </option>
                                )) 

                            }
                            
                            
                            
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export { CardFinais }