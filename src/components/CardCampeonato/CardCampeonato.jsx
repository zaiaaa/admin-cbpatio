import React from 'react'
import "./CardCampeonato.css"
import { Card } from '../Card/card'
import { Button } from '../Button/button'
import { Flex, Center } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const CardCampeonato = ({ idCamp, titulo, variant, width, height, bgImage }) => {
    // tres variantes de card de acordo com os btns
    //uma para o card da tela dos campeonatos, com somente 1 btn
    //outra para o preview de edição do campeonato
    //e a ultima para a tela dos jogos, com três botões disponiveis
    //campeonato, preview, jogos são as variants disponiveis

    return (
        <Card width={width} height={height} variant={'img'} bgImage={bgImage}>
            <h3>{titulo}</h3>
            {
                variant === 'campeonato' ? (
                    <Link to={`/campeonatos/editar/${idCamp}`}>
                        <Button text={"Ver Campeonato"} variant={"purple"} width={"100%"} />
                    </Link>


                )
                    : variant === 'preview' ? (
                        <Button text={"Inscreva-se"} variant={"purple"} width={"100%"} />
                    )
                        : variant === 'jogos' && (
                            <>
                                <div className='gap-btn'>
                                    <Link to={`/valores/${idCamp}`}>
                                        <Button text={"Ver valores"} variant={"purple"} width={"100%"} />
                                    </Link>
                                    <Link to={`/jogos/${idCamp}/chave`}>
                                        <Button text={"Montar Jogos"} variant={"purple"} width={"100%"} />
                                    </Link>
                                    <Link to={`/campeonato/${idCamp}/capitaes`}>
                                        <Button text={"Ver Capitães"} variant={"purple"} width={"100%"} />
                                    </Link>
                                </div>
                            </>
                        )
            }



        </Card >
    )
}

export { CardCampeonato }
