import { useEffect, useState } from "react"
import { CardValores } from "../../components/CardValores/CardValores"
import { formataDinheiro } from "../editarCampeonato/EditarCampeonato"
import { Api } from "../../services/api"

const Valores = () => {

    const [valores, setValores] = useState({})

    useEffect(() => {
        const getData = async () => {
            try {
                const {data: valorTotal} = await Api.get(`/campeonatos/times/pagamentos`)  
                const {data: premiacao } = await Api.get(`/campeonatos/premiacao/total`)
                setValores({
                    total: valorTotal[0].valor_arrecadado,
                    media: valorTotal[0].media,
                    premiacao: premiacao[0].premiacao
                })                          

            } catch (e) {
                console.error("apoiwgowegijah")
            }
        }

        getData()

    }, [])

    console.log(valores)

    return (
        <>
            <h1>Valores</h1>
            <CardValores titulo={'GERAL'}>
                <ul>
                    <li>VALOR ARRECADADO: <span className="valores">{formataDinheiro(valores.total)}</span></li>
                    <li>VALOR EM PREMIAÇÕES: <span className="valores">{formataDinheiro(valores.premiacao)}</span></li>
                    <li>MÉDIA DE VALOR ARRECADADO <span className="valores">{formataDinheiro(valores.media)}</span></li>
                </ul>
            </CardValores>
        </>
    )
}
export { Valores }