import { useParams } from "react-router-dom"
import { Api } from "../../services/api"
import { useEffect, useState } from "react"

const ChaveCampeonato = () => {

    const { id } = useParams()
    const [campeonato, setCampeonato] = useState({})

    useEffect(() => {

        const getCamepeonatoData = async () => {
            try {
                const fetch = await Api.get(`campeonatos/id/${id}`)
                console.log(fetch)
                setCampeonato(fetch.data[0])
            } catch(e) {
                console.log(e)
            }
        }
        getCamepeonatoData()

    }, [])

    return (
        <>
            <h1>{campeonato.nome}</h1>
        </>
    )
}

export { ChaveCampeonato }