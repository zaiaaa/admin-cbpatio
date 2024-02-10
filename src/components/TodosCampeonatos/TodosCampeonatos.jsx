import './TodosCampeonatos.css'
import { CardCampeonato } from '../CardCampeonato/CardCampeonato'
import { useEffect, useState } from 'react';
import { Api } from '../../services/api';


//colocar path no .env 
const path = "http://localhost:3005"
import img from '../../assets/noimage.png'
import { Spinner, Center } from '@chakra-ui/react';


const TodosCampeonatos = () => {
    const [campeonatos, setCampeonatos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handleGetCampeonatos = async () => {
            try {
                const fetch = await Api.get('/campeonatos')
                setCampeonatos(fetch.data)
                setLoading(false)


            } catch (e) {

            }
        }
        handleGetCampeonatos()
    }, [])

    console.log(campeonatos)
    return (
        <>
            <div className="container">
                {
                    loading ? (
                        <Center>
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                color='#fff'
                                size='xl'
                            />
                        </Center>
                    ) : (
                        campeonatos.length !== 0 ? campeonatos.map((campeonato, index) => {

                            //OK //TODO UMA OPC QUE TENHA UMA FOTO DE QUE A PESSOA/CAMPEONATO NAO TEM FOTO, CASO NAO TENHA
                            let foto = ''
                            if (campeonato.foto) {
                                foto = `${path}/${campeonato.foto.replace(/\\/g, '/')}`
                            } else {
                                foto = img
                            }

                            return (
                                <CardCampeonato
                                    key={index}
                                    idCamp={campeonato.id_campeonato}
                                    titulo={campeonato.nome}
                                    variant={'jogos'}
                                    width={'214px'}
                                    height={'421px'}
                                    bgImage={foto}

                                />
                            )

                        }) : "Não existem campeonatos cadastrados"

                    )
                }


            </div>


        </>
    )
}

export { TodosCampeonatos }