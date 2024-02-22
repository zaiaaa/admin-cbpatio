import { useEffect, useState } from "react"
import { ModalComponent } from "../Modal/Modal"
import './ModalCampeao.css'
import { Api } from "../../services/api"
import { useParams } from "react-router-dom"

const ModalCampeao = () => {

    const { id } = useParams()
    
    const [campeao, setCampeao] = useState({})
    const [finalistas, setFinalistas] = useState({})
    const [times, setTimes] = useState({})
    const [selectedValue, setSelectedValue] = useState([])

    const findEliminado = async (jogo, faseAnterior, faseAtual, chave, chaveTarget) => {
        const timeEliminado = await Api.get(`/campeonatos/time/times/eliminados/${id}`, {
            params: {
                "jogo": jogo,
                "faseAnterior": faseAnterior,
                "faseAtual": faseAtual,
                "chave": chave,
                "chaveTarget": chaveTarget
            },

            headers: {
                "Content-Type": "application/json"
            }
        })

        //console.log(timeEliminado)

        await Api.post(`/campeonatos/time/novoTime`, {
            "fk_id_time": timeEliminado.data[0].fk_id_time,
            "fk_id_campeonato": id,
            "fase": `eliminado ${faseAnterior}`,
            "jogo": ""
        })
    }
    
    
    
    const handleOnClickSaveButton = async () => {
        const ids = selectedValue[0].id_time_and_campeonato
        console.log(ids)
        const split = ids.split(" ")
        const time = split[0]
        const camp = split[1]

        try {
            await Api.post("/campeonatos/time/novoTime", {
                "fk_id_time": time,
                "fk_id_campeonato": camp,
                "fase": "campeao",
                "jogo": ""
            })

            findEliminado(1, "final", "acabou", "esquerda", "esquerda")
        } catch (error) {
            alert("Erro -> ", error)
        }

        alert(`o time selecionado foi campeão!`)
    }

    const handleSelectChange = (id, name, event) => {
        const newValue = { "id": id, "id_time_and_campeonato": event.target.value, "name": name };
        setSelectedValue(prevState => {
            const filteredValues = prevState.filter(value => value.id !== id);
            return [...filteredValues, newValue];
        }
        )
    };

    useEffect(() => {
        console.log(selectedValue)
    }, [selectedValue])

    useEffect(() => {
        const getTeams = async () => {
            const {data: finalistas} = await Api.get(`/campeonatos/time/times/fase/final/${id}`)             
            //a gnt vai usar essa opção pro fall guys, como é tudo sem fase, seleciona ele
            const {data: times} = await Api.get(`/campeonatos/time/times/${id}`) 

            setFinalistas(finalistas)
            setTimes(times)
        }

        getTeams()
    }, [])

    console.log("TIMES: ", times)
    console.log("FINAL: ", finalistas)

    return (
        <>
            <ModalComponent
                titulo={'Quem ganhou a porra toda?'}
                textModalOpenBtn={'Definir Campeão'}
                variantTextOpenBtn={'orange'}
                handleOnClickSaveButton={handleOnClickSaveButton}
            >
                <select name="campeao" id="campeao" className="select-campeao" onChange={(e) => handleSelectChange(0, `campeao`, e)}>
                    <option value="">Selecione o campeão</option>
                    
                    {finalistas && finalistas[0] ? finalistas.map((finalista) => (
                        <option value={`${finalista.id_time} ${finalista.fk_id_campeonato}`}>
                            {finalista.nome}
                        </option>
                    )) : null}
                </select>

            </ModalComponent>
        </>
    )
}

export { ModalCampeao }