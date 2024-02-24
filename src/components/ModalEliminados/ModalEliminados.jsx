import { useEffect, useState } from "react"
import { ModalComponent } from "../Modal/Modal"
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import { Api } from "../../services/api"
import { useParams } from "react-router-dom"


const ModalEliminados = () => {
    const { id } = useParams()
    const [eliminados, setEliminados] = useState({})
    const [filter, setFilter] = useState("all")

    useEffect(() => {
        const getEliminados = async () => {
            const { data: oitavas } = await Api.get(`campeonatos/time/times/fase/eliminado%20oitavas/1`)
            const { data: quartas } = await Api.get(`/campeonatos/time/times/fase/eliminado quartas/${id}`)
            const { data: semis } = await Api.get(`/campeonatos/time/times/fase/eliminado semis/${id}`)
            const { data: final } = await Api.get(`/campeonatos/time/times/fase/eliminado final/${id}`)

            setEliminados({
                oitavas,
                quartas,
                semis,
                final
            })
        }
        getEliminados()
    }, [])


    const handleFiltrar = (e) => {
        const filteTarget = e.target.value;
        console.log(filteTarget)
        setFilter(filteTarget)
    }




    return (
        <>
            <ModalComponent titulo={'Eliminados'} textModalOpenBtn={'Ver eliminados'} variantTextOpenBtn={'red'}>
                <select name="campeao" id="campeao" className="select-campeao" onChange={handleFiltrar}>
                    <option value="">
                        Filtre os eliminados por Fase:
                    </option>
                    <option value={`all`}>
                        Todos
                    </option>
                    <option value={`oitavas`}>
                        Oitavas
                    </option>
                    <option value={`quartas`}>
                        Quartas
                    </option>
                    <option value={`semis`}>
                        Semis
                    </option>
                    <option value={`final`}>
                        Final
                    </option>
                </select>
                <TableContainer>
                    <Table size='md'>
                        <Thead >
                            <Tr>
                                <Th color={'#7662F1'}>Time</Th>
                                <Th color={'#7662F1'}>Fase de eliminação</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filter == 'oitavas' || filter == 'all' && eliminados && eliminados?.oitavas ? eliminados.oitavas.map((item) => (
                                <Tr key={item.id_time_campeonato}>
                                    <Td color={'#40B52D'}>{item.nome}</Td>
                                    <Td>OITAVAS</Td>
                                </Tr>
                            )) : null}

                            {filter == 'quartas' || filter == 'all' && eliminados && eliminados?.quartas ? eliminados.quartas.map((item) => (
                                <Tr key={item.id_time_campeonato}>
                                    <Td color={'#40B52D'}>{item.nome}</Td>
                                    <Td>QUARTAS</Td>
                                </Tr>
                            )) : null}
                            {filter == 'semis' || filter == 'all' && eliminados && eliminados?.semis ? eliminados.semis.map((item) => (
                                <Tr key={item.id_time_campeonato}>
                                    <Td color={'#40B52D'}>{item.nome}</Td>
                                    <Td>SEMIS</Td>
                                </Tr>
                            )) : null}
                            {filter == 'final' || filter == 'all' && eliminados && eliminados?.final ? eliminados.final.map((item) => (
                                <Tr key={item.id_time_campeonato}>
                                    <Td color={'#40B52D'}>{item.nome}</Td>
                                    <Td>VICE-CAMPEÃO</Td>
                                </Tr>
                            )) : null}
                        </Tbody>
                    </Table>
                </TableContainer>


                {/* SELECT DOS FILTROS, FAZER UM FILTRO EM TEMPO REAL COM ONCHANGE */}
                {/* NÃO PRECISA FAZER NOVAS REQUESTS SEMPRE QUE O FILTRO FOR USADO, MAS SOMENTE USAR UM FILTER OU MAP NO ARRAY DOS TIMES ELIMINADOS  */}

            </ModalComponent >
        </>
    )
}

export { ModalEliminados }