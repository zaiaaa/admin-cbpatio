
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

import './SliderCampeonatos.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';


import { CardCampeonato } from '../CardCampeonato/CardCampeonato';
import bgImage from '../../assets/bg-admin.png'
import { useEffect, useState } from 'react';
import { Api } from '../../services/api';
const path = "http://localhost:3005"

const SliderCampeonatos = ({}) => {

    const [campeonatos, setCampeonatos] = useState([])

    useEffect(() => {
        const handleGetCampeonatos = async () => {
            try{
                const fetch = await Api.get('/campeonatos')
                setCampeonatos(fetch.data)
            }catch(e){

            }
        }
        handleGetCampeonatos()
    }, [])
    
    console.log(campeonatos)

    return (
        <>
            <Swiper
                slidesPerView={5}
                centeredSlides={false}
                spaceBetween={10}
                pagination={{
                    type: 'fraction',
                }}
                navigation={true}
                //modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                
                {
                campeonatos.length !== 0 ? campeonatos.map(campeonato => {
                    const foto = campeonato.foto.replace(/\\/g, '/');
                    return<SwiperSlide>
                    <CardCampeonato
                        titulo={campeonato.nome}
                        variant={'campeonato'}
                        width={'100%'}
                        height={'100%'} 
                        bgImage={`${path}/${foto}`}
                        //TODO UMA OPC QUE TENHA UMA FOTO DE QUE A PESSOA/CAMPEONATO NAO TEM FOTO, CASO NAO TENHA
                    />
                </SwiperSlide>}) : "Não existem campeonatos cadastrados"
                }
                
            </Swiper>

        </>
    );
}

export { SliderCampeonatos }
