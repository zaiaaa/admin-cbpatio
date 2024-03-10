import { useParams } from "react-router-dom"
import { Api } from "../../services/api"
import { useEffect, useState } from "react"
import { CardValores } from "../../components/CardValores/CardValores"
import { formataDinheiro } from "../editarCampeonato/EditarCampeonato"

const ValoresCampeonato = () => {

    const { id } = useParams()
    const [campeonato, setCampeonato] = useState({})
    const [valoresCamp, setValoresCamp] = useState(0)
    const [jogadoresInscritos, setJogadoresInscritos] = useState(0)

    useEffect(() => {

        const getCamepeonatoData = async () => {
            try {
                const fetch = await Api.get(`campeonatos/id/${id}`)
                setCampeonato(fetch.data[0])
                const {data: valores} = await Api.get(`/campeonatos/pagamentos/${id}`)
                setValoresCamp(valores[0].valor_total)

                const {data: inscritos} = await Api.get(`/campeonatos/time/times/${id}`)
                setJogadoresInscritos(inscritos.length)
            } catch (e) {
                console.log(e)
            }
        }
        getCamepeonatoData()

    }, [])

    return (
        <>
            <h1>{campeonato.nome}</h1>
            <CardValores titulo={'VALORES'}>
                <ul>
                    
                    <li>VALOR ARRECADADO: <span className="valores">{formataDinheiro(valoresCamp)}</span></li>
                    <li>VALOR EM PREMIAÇÕES: <span className="valores">{formataDinheiro(campeonato.premiacao)}</span></li>
                    <li>VALOR DA INSCRIÇÃO: <span className="valores">{formataDinheiro(campeonato.valor_entrada)}</span></li>
                    <li>TIMES INSCRITOS: <span className="times-inscritos">{jogadoresInscritos}</span></li>
                </ul>
            </CardValores>
        </>
    )
}

export { ValoresCampeonato }