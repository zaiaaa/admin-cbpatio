import './Chave.css'
import { Button } from '../Button/button'
import { CardOitavasFinais } from '../CardOitavasFinais/CardOitavasFinais'
import { CardQuartasFinais } from '../CardQuartasFinais/CardQuartasFinais'
import { CardSemiFinais } from '../CardSemiFinais/CardSemiFinais'
import { CardFinais } from '../CardFinais/CardFinais'
import { useState } from 'react'
import { Api } from '../../services/api'
import { useParams } from 'react-router-dom'

const Chave = () => {
    const [fase, setFase] = useState(1)
    const [dadosJogoEsquerda, setDadosJogoEsquerda] = useState([])
    const [dadosJogoDireita, setDadosJogoDireita] = useState([])

    const {id} = useParams()

    const getDadosJogoEsquerda = (data) => {
        setDadosJogoEsquerda(data)
    }

    const getDadosJogoDireita = (data) => {
        setDadosJogoDireita(data)
    }

    const handleSaveGames = async () => {
        //console.log(dadosJogoDireita)
        dadosJogoEsquerda.forEach(async (value, index) => {
            const ids = value.id_time_and_time_campeonato
            const splitId = ids.split(" ")
            const id_time = splitId[0]
            const id_time_campeonato = splitId[1]

            const nomeJogo = value.name
            const split = nomeJogo.split(" ")
            const fase = split[2]
            const jogo = split[1]
            const chave = split[split.length - 1]

            await Api.put(`/campeonatos/time/alterarTime/${id_time_campeonato}`, {
                "fase": fase,
                "jogo": jogo,
                "chave": chave
            })
        })

        dadosJogoDireita.forEach(async (value, index) => {
            console.log(value.id_time)

            const ids = value.id_time_and_time_campeonato
            const splitId = ids.split(" ")
            const id_time = splitId[0]
            const id_time_campeonato = splitId[1]

            const nomeJogo = value.name
            const split = nomeJogo.split(" ")
            const fase = split[2]
            const jogo = split[1]
            const chave = split[split.length - 1]

            await Api.put(`/campeonatos/time/alterarTime/${id_time_campeonato}`, {
                "fase": fase,
                "jogo": jogo,
                "chave": chave
            })
        })
        
        // for (let i = 0; i < dadosJogoDireita.length; i++) {
        //     //console.log(id)
        //     console.log(dadosJogoDireita[i].id_time)
            
        //     const nomeCamp = dadosJogoDireita[i].name
        //     const split = nomeCamp.split(" ")
        //     const fase = split[2]
        //     const jogo = split[1]
        //     const chave = split[split.length - 1]
        //     //console.log(fase, jogo, chave)

        //     await Api.post('/campeonatos/time/novoTime', {
        //         "fk_id_time": dadosJogoDireita[i].id_time, 
        //         "fk_id_campeonato": id,
        //         "fase": fase,
        //         "jogo": jogo,
        //         "chave": chave
        //     })
        // }
    }

    // console.log(dadosJogoEsquerda)
    // console.log(dadosJogoDireita)

    const minFase = 1;
    const maxFase = 4;

    const proxFase = () => {
        if(fase < maxFase){
            setFase(fase + 1)
        }
        
    }
    const faseAnterior = () => {
        if(fase > minFase){
             setFase(fase - 1)
        }
    }
    return (
        <>
            <div className="chave-page">
                <div className='chaveamento'>
                    <div className="chave">
                        <div className="chave-nome">
                            chave 1
                        </div>
                        <div className="chave-fases">
                            <CardOitavasFinais className={fase == 1 ? 'active-div' : ''} getDadosJogo={getDadosJogoEsquerda} ladoChave={'esquerda'} />
                            <CardQuartasFinais className={fase == 2 ? 'active-div' : ''}/>
                            <CardSemiFinais className={fase == 3 ? 'active-div' : ''}/>
                        </div>
                    </div>
                    <div className="final">
                        <CardFinais className={fase == 4 ? 'active-div' : ''}/>
                    </div>
                    <div className="chave">
                        <div className="chave-nome">
                            chave 2
                        </div>
                        <div className="chave-fases">
                            <CardSemiFinais className={fase == 3 ? 'active-div' : ''}/>
                            <CardQuartasFinais className={fase == 2 ? 'active-div' : ''}/>
                            <CardOitavasFinais className={fase == 1 ? 'active-div' : ''} getDadosJogo={getDadosJogoDireita} ladoChave={'direita'}/>
                        </div>
                    </div>
                </div>
                <div className="chaveamento-opcoes">
                    <div className="fase-opcoes">
                        <Button text={'Salvar'} type={'button'} variant={'green'} padding={'1rem'} width={'100%'} onClick={handleSaveGames} ></Button>
                        <Button text={'Limpar'} type={'button'} variant={'yellow'} padding={'1rem'} width={'100%'}></Button>
                        <Button text={'Ver eliminados'} type={'button'} variant={'red'} padding={'1rem'} width={'100%'}></Button>
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

export { Chave }