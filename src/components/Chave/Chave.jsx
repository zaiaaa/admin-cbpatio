import './Chave.css'
import { Button } from '../Button/button'
import { CardOitavasFinais } from '../CardOitavasFinais/CardOitavasFinais'
import { CardQuartasFinais } from '../CardQuartasFinais/CardQuartasFinais'
import { CardSemiFinais } from '../CardSemiFinais/CardSemiFinais'
import { CardFinais } from '../CardFinais/CardFinais'
import { useEffect, useState } from 'react'
import { Api } from '../../services/api'
import { useParams, useNavigate } from 'react-router-dom'

import { ModalEliminados } from '../ModalEliminados/ModalEliminados'
import { ModalCampeao } from '../ModalCampeao/ModalCampeao'
import { Center, Spinner } from '@chakra-ui/react';

const Chave = () => {
    const [loading, setLoading] = useState(false)
    const [campeao, setCampeao] = useState({})
    const [fase, setFase] = useState(1)
    const [dadosJogoEsquerda, setDadosJogoEsquerda] = useState([])
    const [dadosJogoDireita, setDadosJogoDireita] = useState([])
    const [faseAtual, setFaseAtual] = useState("")
    const [faseAnteriorElim, setFaseAnteriorElim] = useState("")
    const [podeIr, setPodeIr] = useState(false)


    const { id } = useParams()

    const getDadosJogoEsquerda = (data) => {
        setLoading(true)
        setDadosJogoEsquerda(data)
        setLoading(false)
    }

    const getDadosJogoDireita = (data) => {
        setLoading(true)
        setDadosJogoDireita(data)
        setLoading(false)
    }

    const findEliminado = async (jogo, faseAnterior, faseAtual, chave, chaveTarget) => {
        const timeEliminado = await Api.get(`/campeonatos/time/times/eliminados/${id}`, {
            params: {
                "jogo": jogo,
                "faseAnterior": faseAnterior,
                "faseAtual": faseAtual,
                "chave": chave,
                "chaveTarget": chaveTarget
            },

            headers: {
                "Content-Type": "application/json"
            }
        })

        console.log(timeEliminado)

        await Api.post(`/campeonatos/time/novoTime`, {
            "fk_id_time": timeEliminado.data[0].fk_id_time,
            "fk_id_campeonato": id,
            "fase": `eliminado ${faseAnterior}`,
            "jogo": "",
            "chave": "",
            "aconteceu": ""
        })
    }

    useEffect(() => {
        const getCampeao = async () => {
            const {data} = await Api.get(`/campeonatos/time/times/fase/campeao/${id}`)
            setCampeao(data)
        }
        getCampeao()
    }, [])

    useEffect(() => {
        const getEliminados = async () => {
            if (faseAnteriorElim && faseAtual && podeIr) {
                console.log(faseAnteriorElim)
                if (faseAnteriorElim == "oitavas") {
                    for (let i = 1; i <= 4; i++) {
                        await findEliminado(i, faseAnteriorElim, faseAtual, "direita", "direita")
                        await findEliminado(i, faseAnteriorElim, faseAtual, "esquerda", "esquerda")
                    }
                    
                    window.location.reload()
                    alert('Jogos cadastrados com sucesso!')
                } else if (faseAnteriorElim == "quartas") {
                    for (let i = 1; i <= 2; i++) {
                        await findEliminado(i, faseAnteriorElim, faseAtual, "direita", "direita")
                        await findEliminado(i, faseAnteriorElim, faseAtual, "esquerda", "esquerda")
                    } 
                    window.location.reload()
                    alert('Jogos cadastrados com sucesso!')
                } else if (faseAnteriorElim == "semis") {
                    await findEliminado(1, "semis", "final", "direita", "esquerda")
                    await findEliminado(1, "semis", "final", "esquerda", "esquerda")
                    
                    window.location.reload()
                    alert('Jogos cadastrados com sucesso!')
                }else{
                    window.location.reload()
                    alert('Jogos cadastrados com sucesso!')
                }
            }
    
            // window.location.reload()
            // alert('Jogos cadastrados com sucesso!')
            setLoading(false)
            
            setPodeIr(false)
        }

        getEliminados()
    }, [podeIr])

    const handleSaveGames = async () => {
        setLoading(true)
        console.log(dadosJogoDireita)
        console.log(dadosJogoEsquerda)

        for (const value of dadosJogoEsquerda) {

            const ids = value.id_time_and_time_campeonato
            const splitId = ids.split(" ")
            const id_time = splitId[0]
            const id_time_campeonato = splitId[1]
            const id_campeonato = splitId[2]

            const nomeJogo = value.name
            const split = nomeJogo.split(" ")
            const fase = split[2]
            const jogo = split[1]
            const chave = split[split.length - 1]

            switch (fase) {
                case 'oitavas':
                    if(dadosJogoEsquerda.length && dadosJogoDireita.length < 8){
                        alert("Erro -> chaves incompletas")
                        window.location.reload()
                        return
                    } 
                    await Api.put(`/campeonatos/time/alterarTime/${id_time_campeonato}`, {
                        "fase": fase,
                        "jogo": jogo,
                        "chave": chave,
                        "aconteceu": ""
                    })

                    setFaseAnteriorElim("n")
                    setFaseAtual("oitavas")
                    break;
                case 'quartas':
                    if(dadosJogoEsquerda.length && dadosJogoDireita.length < 4 || !dadosJogoDireita && !dadosJogoEsquerda){
                        alert("Erro -> chaves incompletas")
                        window.location.reload()
                        return
                    } 
                    await Api.post('/campeonatos/time/novoTime', {
                        "fk_id_time": id_time,
                        "fk_id_campeonato": id_campeonato,
                        "fase": "quartas",
                        "jogo": jogo,
                        "chave": chave,
                        "aconteceu": ""
                    })
                    await Api.put(`/campeonatos/time/aconteceu/fase/oitavas/${id_campeonato}`, {
                        aconteceu: 's'
                    })
                    setFaseAtual("quartas")
                    setFaseAnteriorElim("oitavas")
                    break;

                case 'quartas-start':
                    if(dadosJogoEsquerda.length && dadosJogoDireita.length < 4){
                        alert("Erro -> chaves incompletas")
                        window.location.reload()
                        return
                    } 
                    await Api.put(`/campeonatos/time/alterarTime/${id_time_campeonato}`, {
                        "fase": 'quartas',
                        "jogo": jogo,
                        "chave": chave,
                        "aconteceu": ""
                    })
                    setFaseAnteriorElim("n")
                    setFaseAtual("quartas")
                    break;
                case 'semis':
                    if(dadosJogoEsquerda.length && dadosJogoDireita.length < 2){
                        alert("Erro -> chaves incompletas")
                        window.location.reload()
                        return
                    } 
                    await Api.post('/campeonatos/time/novoTime', {
                        "fk_id_time": id_time,
                        "fk_id_campeonato": id_campeonato,
                        "fase": "semis",
                        "jogo": jogo,
                        "chave": chave,
                        "aconteceu": ""
                    })

                    await Api.put(`/campeonatos/time/aconteceu/fase/quartas/${id_campeonato}`, {
                        aconteceu: 's'
                    })

                    setFaseAtual("semis")
                    setFaseAnteriorElim("quartas")
                    break;
                case 'semis-start':
                    if(dadosJogoEsquerda.length && dadosJogoDireita.length < 2){
                        alert("Erro -> chaves incompletas")
                        window.location.reload()
                        return
                    } 
                    setFaseAnteriorElim("n")
                    await Api.put(`/campeonatos/time/alterarTime/${id_time_campeonato}`, {
                        "fase": 'semis',
                        "jogo": jogo,
                        "chave": chave,
                        "aconteceu": ""
                    })
                    setFaseAnteriorElim("n")
                    setFaseAtual("semis")
                    break;
                case "final":
                    if(dadosJogoEsquerda.length < 2){
                        alert("Erro -> chaves incompletas")
                        window.location.reload()
                        return
                    } 
                    await Api.post('/campeonatos/time/novoTime', {
                        "fk_id_time": id_time,
                        "fk_id_campeonato": id_campeonato,
                        "fase": "final",
                        "jogo": jogo,
                        "chave": "esquerda",
                        "aconteceu": ""
                    })

                    await Api.put(`/campeonatos/time/aconteceu/fase/semis/${id_campeonato}`, {
                        aconteceu: 's'
                    })

                    setFaseAtual("final")
                    setFaseAnteriorElim("semis")
                    break;
                default:
                    break;
            }
        }

        for (const value of dadosJogoDireita) {
            const ids = value.id_time_and_time_campeonato
            const splitId = ids.split(" ")
            const id_time = splitId[0]
            const id_time_campeonato = splitId[1]
            const id_campeonato = splitId[2]

            const nomeJogo = value.name
            const split = nomeJogo.split(" ")
            const fase = split[2]
            const jogo = split[1]
            const chave = split[split.length - 1]

            switch (fase) {
                case 'oitavas':
                    if(dadosJogoDireita.length && dadosJogoEsquerda.length < 8){
                        alert("Erro -> chave direita incompleta")
                        window.location.reload()
                        return
                    } 

                    await Api.put(`/campeonatos/time/alterarTime/${id_time_campeonato}`, {
                        "fase": fase,
                        "jogo": jogo,
                        "chave": chave,
                        "aconteceu": ""
                    })

                    setFaseAnteriorElim("n")
                    setFaseAtual("oitavas")

                    break;
                case 'quartas':
                    await Api.post('/campeonatos/time/novoTime', {
                        "fk_id_time": id_time,
                        "fk_id_campeonato": id_campeonato,
                        "fase": "quartas",
                        "jogo": jogo,
                        "chave": chave,
                        "aconteceu": ""
                    })

                    setFaseAtual("quartas")
                    setFaseAnteriorElim("oitavas")
                    break;

                case 'quartas-start':
                    await Api.put(`/campeonatos/time/alterarTime/${id_time_campeonato}`, {
                        "fase": 'quartas',
                        "jogo": jogo,
                        "chave": chave,
                        "aconteceu": ""
                    })

                    setFaseAnteriorElim("n")
                    setFaseAtual("quartas")

                    break;
                case 'semis':
                    await Api.post('/campeonatos/time/novoTime', {
                        "fk_id_time": id_time,
                        "fk_id_campeonato": id_campeonato,
                        "fase": "semis",
                        "jogo": jogo,
                        "chave": chave,
                        "aconteceu": ""
                    })

                    setFaseAtual("semis")
                    setFaseAnteriorElim("quartas")
                    break;
                case 'semis-start':
                    await Api.put(`/campeonatos/time/alterarTime/${id_time_campeonato}`, {
                        "fase": 'semis',
                        "jogo": jogo,
                        "chave": chave,
                        "aconteceu": ""
                    })

                    setFaseAnteriorElim("n")
                    setFaseAtual("semis")

                    break;

                default:
                    alert('erro')
                    break;
            }
        }
        setPodeIr(true)
    }

    const minFase = 1;
    const maxFase = 4;

    const proxFase = () => {
        if (fase < maxFase) {
            setFase(fase + 1)
        }

    }
    const faseAnterior = () => {
        if (fase > minFase) {
            setFase(fase - 1)
        }
    }
    return (
        <>
        {
            loading 

            ?

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
                <>
                    <header>
                    {
                        campeao && campeao.length > 0 ? (<h2 align="center">{campeao[0].nome} ganhou o campeonato de fortnite</h2>) : null
                    }
                </header>
                <div className="chave-page">
                    <div className='chaveamento'>
                        <div className="chave">
                            <div className="chave-nome">
                                chave esquerda
                            </div>
                            <div className="chave-fases">
                                <CardOitavasFinais className={fase == 1 ? 'active-div' : ''} getDadosJogo={getDadosJogoEsquerda} ladoChave={'esquerda'} />
                                <CardQuartasFinais className={fase == 2 ? 'active-div' : ''} getDadosJogo={getDadosJogoEsquerda} ladoChave={'esquerda'} />
                                <CardSemiFinais className={fase == 3 ? 'active-div' : ''} getDadosJogo={getDadosJogoEsquerda} ladoChave={'esquerda'} />
                            </div>
                        </div>
                        <div className="final">
                            <CardFinais className={fase == 4 ? 'active-div' : ''} getDadosJogo={getDadosJogoEsquerda} />
                        </div>
                        <div className="chave">
                            <div className="chave-nome">
                                chave direita
                            </div>
                            <div className="chave-fases">
                                <CardSemiFinais className={fase == 3 ? 'active-div' : ''} getDadosJogo={getDadosJogoDireita} ladoChave={'direita'} />
                                <CardQuartasFinais className={fase == 2 ? 'active-div' : ''} getDadosJogo={getDadosJogoDireita} ladoChave={'direita'} />
                                <CardOitavasFinais className={fase == 1 ? 'active-div' : ''} getDadosJogo={getDadosJogoDireita} ladoChave={'direita'} />
                            </div>
                        </div>
                    </div>
                    <div className="chaveamento-opcoes">
                        <div className="fase-opcoes">
                            <Button text={'Salvar'} type={'button'} variant={'green'} padding={'1rem'} width={'100%'} onClick={handleSaveGames} ></Button>
                            <Button
                                text={'Limpar'}
                                type={'button'}
                                variant={'yellow'}
                                padding={'1rem'}
                                width={'100%'}></Button>

                            <ModalEliminados />
                            {/* <ModalHoraJogo/> */}
                            {
                                fase === 4 && ( //somente se o usuario estiver na fase das finais que o btn vai aparecer
                                    <>
                                        <ModalCampeao />
                                    </>

                                )
                            }
                        </div>
                        <div className="mudar-fase">
                            <Button text={'Proxima fase'} type={'button'} variant={'pink'} padding={'1rem'} width={'100%'}
                                onClick={proxFase}></Button>
                            <Button text={'Fase Anterior'} type={'button'} variant={'pink'} padding={'1rem'} width={'100%'}
                                onClick={faseAnterior}
                            ></Button>
                        </div>
                    </div>
                </div >
            </>
            )
        }
        </>
    )
}

export { Chave }