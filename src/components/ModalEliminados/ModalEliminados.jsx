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
const ModalEliminados = () => {
    return (
        <>
            <ModalComponent titulo={'Eliminados'} textModalOpenBtn={'Ver eliminados'} variantTextOpenBtn={'red'}>
                <TableContainer>
                    <Table size='md'>
                        <Thead >
                            <Tr>
                                <Th color={'#7662F1'}>Time</Th>
                                <Th color={'#7662F1'}>Fase de eliminação</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>S.Squad</Td>
                                <Td>Oitavas</Td>
                            </Tr>
                            <Tr>
                                <Td>S.Squad 3</Td>
                                <Td>Semi</Td>
                            </Tr>
                             <Tr>
                                <Td>S.Squad</Td>
                                <Td>Oitavas</Td>
                            </Tr>
                            <Tr>
                                <Td>S.Squad 3</Td>
                                <Td>Semi</Td>
                            </Tr>
                            <Tr>
                                <Td>S.Squad</Td>
                                <Td>Oitavas</Td>
                            </Tr>
                            <Tr>
                                <Td>S.Squad 3</Td>
                                <Td>Semi</Td>
                            </Tr>

                        </Tbody>
                    </Table>
                </TableContainer>


                {/* SELECT DOS FILTROS, FAZER UM FILTRO EM TEMPO REAL COM ONCHANGE */}
                {/* NÃO PRECISA FAZER NOVAS REQUESTS SEMPRE QUE O FILTRO FOR USADO, MAS SOMENTE USAR UM FILTER OU MAP NO ARRAY DOS TIMES ELIMINADOS  */}
                <select name="campeao" id="campeao" className="select-campeao">
                    <option value="">
                        Filtre os eliminados por Fase:
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
            </ModalComponent >
        </>
    )
}

export { ModalEliminados }