import './CardFinais.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Api } from '../../services/api';
import { Button } from '../Button/button';
import { PopoverComponent } from '../Popover/Popover';
import { PopoverDefinirHorario } from '../PopoverDefinirHorario/PopoverDefinirHorario';
import { format } from 'date-fns';


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
        console.log(selectedValues)
    }, [selectedValues])

    const handleDeletaChave = async () => {
        try{
            await Api.delete(`/campeonatos/resetar/fase/final/${id}`)
            await Api.delete(`/campeonatos/resetar/fase/eliminado semis/${id}`)
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
                        <select name="jogo" id="jogo" onChange={(e) => handleSelectChange(1, `jogo 1 final (visitante)`, e)}>
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

                    <div className="jogo-opcoes">
                            {/* AQUI É ONDE VC VAI COLOCAR O HORARIO DO JOGO (SE VIRA) */}
                            
                            {/* aqui vem o ternario do lado da chave, certo? dps eu faço pq eu fui na harumi. fézinha 👌 */}
                            <PopoverComponent
                                popoverTitle={'O jogo vai começar:'}
                                textDispare={<i className="fa-solid fa-clock"></i>}
                            >
                                { 
                                !chave ||!chave[0] || !chave[0].data_hora 
                                ?
                                 
                                "Sem horario definido" 
                                 
                                 :
                                 
                                 format(chave[0].data_hora, "dd/MM/yyyy - HH:mm:ss")

                                }
                            </PopoverComponent>

                            {/* AQUI É ONDE VC VAI SALVAR O HORARIO DO JOGO (SE VIRA) */}
                            <PopoverDefinirHorario
                                jogo={1}
                                chave={"esquerda"}
                                fase={"final"}
                                textDispare={<i className="fa-solid fa-gear"></i>}
                                popoverTitle={`Data & Hora do jogo 1: `}
                            />
                        </div>

                </div>
            </div>
        </>
    )
}

export { CardFinais }