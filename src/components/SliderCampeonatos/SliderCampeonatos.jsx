
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Center, Spinner } from '@chakra-ui/react';

// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

import './SliderCampeonatos.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';


import { CardCampeonato } from '../CardCampeonato/CardCampeonato';
import { useEffect, useState } from 'react';
import { Api } from '../../services/api';

//colocar path no .env 
const path = "http://localhost:3005"
import img from '../../assets/noimage.png'


const SliderCampeonatos = ({ }) => {

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
                    <Swiper
                        slidesPerView={5}
                        centeredSlides={false}
                        spaceBetween={10}
                        pagination={{
                            type: 'fraction',
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {

                            campeonatos.length !== 0 ? campeonatos.map((campeonato, index) => {

                                //OK //TODO UMA OPC QUE TENHA UMA FOTO DE QUE A PESSOA/CAMPEONATO NAO TEM FOTO, CASO NAO TENHA
                                let foto = ''
                                if (campeonato.foto) {
                                    foto = `${path}/${campeonato.foto.replace(/\\/g, '/')}`
                                } else {
                                    foto = img
                                }

                                return <SwiperSlide
                                    key={index}
                                >
                                    <CardCampeonato
                                        titulo={campeonato.nome}
                                        variant={'campeonato'}
                                        width={'100%'}
                                        height={'100%'}
                                        bgImage={foto}

                                    />
                                </SwiperSlide>
                            }) : "Não existem campeonatos cadastrados"
                        }

                    </Swiper>
                )
            }


        </>
    );
}

export { SliderCampeonatos }
