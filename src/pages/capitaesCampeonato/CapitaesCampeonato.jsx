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
} from '@chakra-ui/react'
import { AuthContext } from '../../context/auth'

const CapitaesCampeonato = () => {

    const { id } = useParams()
    const [campeonato, setCampeonato] = useState({})
    const [timesOitavas, setTimesOitavas] = useState([])
    const [times, setTimes] = useState([])
    const [timeCapitain, SetTimeCapitain] = useState([])
    const {token} = useContext(AuthContext)


    useEffect(() => {

        const getCamepeonatoData = async () => {
            try {
                const fetch = await Api.get(`campeonatos/id/${id}`)
                setCampeonato(fetch.data[0])
            } catch (e) {
                console.log(e)
            }
        }

       

        const getTimesByCampeonato = async () => {
            try {
                // O FETCH AQUI TEM QUE PEGAR OS DADOS DOS TIMES INSCRITOS NO CAMPEONATO 
                const fetch = await Api.get(`/campeonatos/time/times/fase/oitavas/${id}`)
                setTimesOitavas(fetch.data)

               timesOitavas.map(async (time) => {
                    const fkIdTime = time.fk_id_time

                    const fetchTime = await Api.get(`/times/time/${fkIdTime}`)
                    
                    setTimes(prevTimes => ([...prevTimes, fetchTime.data]));
                })
            } catch (e) {
                console.log(e)
            }
        }

       

        const getCapitainsByTime = async () => {
            try {
                Api.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;

                times.map(async (time) => {
                    const fkIdCaptain = time.fk_id_capitao;
                    console.log(time)
                    const fetchCapitain = await Api.get(`/usuarios/${fkIdCaptain}`);

                    const newCapitain = {
                        id: time.id_time,
                        nome: fetchCapitain.nome,
                        email: fetchCapitain.email,
                        time: time.nome
                    }
                    SetTimeCapitain(prevCapitains => [...prevCapitains, newCapitain])
                })

            } catch (e) {
                console.log(e);
            }
        }


        getCamepeonatoData()
        getTimesByCampeonato()
        getCapitainsByTime()


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
                            <Th color={'#7662F1'}>Email</Th>
                            <Th color={'#7662F1'}>Time</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            timeCapitain.map((capitain) => (
                                    <Tr key={capitain.id}>
                                        <Td>{capitain.nome}</Td>
                                        <Td>{capitain.email}</Td>
                                        <Td>{capitain.time}</Td>
                                    </Tr>
                            ))

                        }

                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export { CapitaesCampeonato }