import { useParams } from "react-router-dom"
import { Api } from "../../services/api"
import { useEffect, useState } from "react"
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'

const CapitaesCampeonato = () => {

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
            <h2 className="h2-sublinhado">CAPITÃES DOS TIMES</h2>

            <TableContainer>
                <Table size='md'>
                    <Thead >
                        <Tr>
                            <Th color={'#7662F1'}>Nome</Th>
                            <Th color={'#7662F1'}>Telefone</Th>
                            <Th color={'#7662F1'}>Time</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>marechal pirocudo</Td>
                            <Td>15998985654</Td>
                            <Td>S.Squad</Td>
                        </Tr>
                        <Tr>
                            <Td>marechal roludo</Td>
                            <Td>15998985654</Td>
                            <Td>S.Squad</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export { CapitaesCampeonato }