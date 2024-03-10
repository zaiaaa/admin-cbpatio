import { useParams } from "react-router-dom"
import { Api } from "../../services/api"
import { useEffect, useState, useContext } from "react"
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Center,
    Spinner
} from '@chakra-ui/react'
import { AuthContext } from '../../context/auth'

const CapitaesCampeonato = () => {

    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [campeonato, setCampeonato] = useState({})
    const [capitaes, setCapitaes] = useState([])

    useEffect(() => {
        const getCapitaes = async () => {
            try {
                const { data: capitaes } = await Api.get(`/campeonatos/time/times/capitaes/${id}`)
                const { data: capitaesOitavas } = await Api.get(`/campeonatos/time/times/capitaes/${id}/fase/oitavas`)

                if (capitaes.length > 16) {
                    setCapitaes(capitaesOitavas)
                } else {
                    setCapitaes(capitaes)
                }

                setLoading(false)
            } catch (e) {
                console.error(e)
            }
        }

        getCapitaes()
    }, [])


    return (
        <>
            <h1>{campeonato.nome}</h1>
            <h2 className="h2-sublinhado">CAPITÃES DOS TIMES</h2>
            {
                loading ?
                    (
                        <Center>
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                color='#fff'
                                size='xl'
                            />
                        </Center>
                    )
                    :
                    (
                        capitaes.length > 0

                            ?

                            <TableContainer>
                                <Table size='md'>
                                    <Thead >
                                        <Tr>
                                            <Th color={'#7662F1'}>Nome</Th>
                                            <Th color={'#7662F1'}>Email</Th>
                                            <Th color={'#7662F1'}>Time</Th>
                                        </Tr>
                                    </Thead>

                                    <Tbody>
                                        {
                                            capitaes.map((capitain) => (
                                                <Tr key={capitain.id_time}>
                                                    <Td>{capitain.nome_usuario}</Td>
                                                    <Td>{capitain.celular ? capitain.celular : "Sem celular cadastrado"}</Td>
                                                    <Td>{capitain.nome_time}</Td>
                                                </Tr>
                                            ))

                                        }
                                    </Tbody>
                                </Table>
                            </TableContainer>

                            :

                            <h2>Nenhum time foi cadastrado nesse campeonato!</h2>
                    )

            }


        </>
    )
}

export { CapitaesCampeonato }