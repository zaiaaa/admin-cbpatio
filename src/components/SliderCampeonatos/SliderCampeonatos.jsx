
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

const SliderCampeonatos = ({data = []}) => {

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
                <SwiperSlide>
                    <CardCampeonato
                        titulo={data.nome}
                        variant={'campeonato'}
                        width={'100%'}
                        height={'100%'} 
                        bgImage={bgImage}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <CardCampeonato
                        titulo={'FORTNITE BOXFIGHT 2V2'}
                        variant={'preview'}
                        width={'100%'}
                        height={'100%'}
                        bgImage={bgImage}
                         />
                </SwiperSlide>
                <SwiperSlide>
                    <CardCampeonato
                        titulo={'FORTNITE BOXFIGHT 2V2'}
                        variant={'jogos'}
                        width={'100%'}
                        height={'100%'} 
                        bgImage={bgImage}
                        />
                </SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>

        </>
    );
}

export { SliderCampeonatos }
