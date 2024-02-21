import { useParams } from "react-router-dom"
import { Api } from "../../services/api"
import { useEffect, useState } from "react"
import { CardValores } from "../../components/CardValores/CardValores"

const ValoresCampeonato = () => {

    const { id } = useParams()
    const [campeonato, setCampeonato] = useState({})

    useEffect(() => {

        const getCamepeonatoData = async () => {
            try {
                const fetch = await Api.get(`campeonatos/id/${id}`)
                console.log(fetch)
                setCampeonato(fetch.data[0])
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
                    <li>VALOR ARRECADADO: <span className="valores">111.10  R$</span></li>
                    <li>VALOR EM PREMIAÇÕES: <span className="valores">1111</span></li>
                    <li>VALOR DA INSCRIÇÃO: <span className="valores">1111</span></li>
                    <li>TIMES INSCRITOS: <span className="times-inscritos">1111</span></li>
                </ul>
            </CardValores>
        </>
    )
}

export { ValoresCampeonato }