import './Chave.css'
import { Button } from '../Button/button'
import { CardOitavasFinais } from '../CardOitavasFinais/CardOitavasFinais'
import { CardQuartasFinais } from '../CardQuartasFinais/CardQuartasFinais'
import { CardSemiFinais } from '../CardSemiFinais/CardSemiFinais'
import { CardFinais } from '../CardFinais/CardFinais'
import { useEffect, useState } from 'react'
import { Api } from '../../services/api'
import { useParams, useNavigate } from 'react-router-dom'
import { Alert } from '@chakra-ui/react'

const Chave = () => {
    const navigate = useNavigate()
    const [fase, setFase] = useState(1)
    const [dadosJogoEsquerda, setDadosJogoEsquerda] = useState([])
    const [dadosJogoDireita, setDadosJogoDireita] = useState([])
    const [faseAtual, setFaseAtual] = useState("")
    const [faseAnteriorElim, setFaseAnteriorElim] = useState("")
    const [podeIr, setPodeIr] = useState(false)


    const {id} = useParams()

    const getDadosJogoEsquerda = (data) => {
        setDadosJogoEsquerda(data)
    }

    const getDadosJogoDireita = (data) => {
        setDadosJogoDireita(data)
    }

    const findEliminado = async (jogo, faseAnterior, faseAtual, chave, chaveTarget) => {
        const timeEliminado = await Api.get(`/campeonatos/time/times/eliminados/${id}`, {
            params:{
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
            "jogo": ""
        })
    }

    useEffect(() => {
        
        if(faseAnteriorElim && faseAtual && podeIr){
            if(faseAnteriorElim == "oitavas"){
                for (let i = 1; i <= 4; i++) {
                    setTimeout(async () => {
                        await findEliminado(i, faseAnteriorElim, faseAtual, "direita", "direita")
                        await findEliminado(i, faseAnteriorElim, faseAtual, "esquerda", "esquerda")
                    }, 1500);

               }
            }else if(faseAnteriorElim == "quartas"){
                for (let i = 1; i <= 2; i++) {
                    setTimeout(async () => {
                        await findEliminado(i, faseAnteriorElim, faseAtual, "direita", "direita")
                        await findEliminado(i, faseAnteriorElim, faseAtual, "esquerda", "esquerda")
                    }, 1500);
               }
            }else if(faseAnteriorElim == "semis"){
                setTimeout(async () => {
                    await findEliminado(1, "semis", "final", "direita", "esquerda")
                    await findEliminado(1, "semis", "final", "esquerda", "esquerda")
                }, 1500);
            }
        }else{
            console.log('acabou')
        }
        setPodeIr(false)

    }, [podeIr])
 

    


    const handleSaveGames = async () => {
        console.log(dadosJogoDireita)
        console.log(dadosJogoEsquerda)

        for(const value of dadosJogoEsquerda){

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
                    await Api.put(`/campeonatos/time/alterarTime/${id_time_campeonato}`, {
                        "fase": fase,
                        "jogo": jogo,
                        "chave": chave
                    })
                    break;
                case 'quartas': 
                    console.log('fez o post na esquerda')
                    await Api.post('/campeonatos/time/novoTime', {
                        "fk_id_time": id_time,
                        "fk_id_campeonato": id_campeonato,
                        "fase": "quartas",
                        "jogo": jogo,
                        "chave": chave
                    })
                    setFaseAtual("quartas")
                    setFaseAnteriorElim("oitavas")
                    break;

                case 'quartas-start':
                    await Api.put(`/campeonatos/time/alterarTime/${id_time_campeonato}`, {
                        "fase": 'quartas',
                        "jogo": jogo,
                        "chave": chave
                    })
                    break;
                case 'semis':
                    await Api.post('/campeonatos/time/novoTime', {
                        "fk_id_time": id_time,
                        "fk_id_campeonato": id_campeonato,
                        "fase": "semis",
                        "jogo": jogo,
                        "chave": chave
                    })

                    setFaseAtual("semis")
                    setFaseAnteriorElim("quartas")
                    break;
                case 'semis-start': 
                    await Api.put(`/campeonatos/time/alterarTime/${id_time_campeonato}`, {
                        "fase": 'semis',
                        "jogo": jogo,
                        "chave": chave
                    })
                    break;
                case "final":
                    await Api.post('/campeonatos/time/novoTime', {
                        "fk_id_time": id_time,
                        "fk_id_campeonato": id_campeonato,
                        "fase": "final",
                        "jogo": jogo,
                        "chave": "esquerda"
                    })

                    setFaseAtual("final")
                    setFaseAnteriorElim("semis")
                    break;
                default:
                    break;
            }
        }

        for(const value of dadosJogoDireita){
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
                    await Api.put(`/campeonatos/time/alterarTime/${id_time_campeonato}`, {
                        "fase": fase,
                        "jogo": jogo,
                        "chave": chave
                    })
                    break;
                case 'quartas': 
                    await Api.post('/campeonatos/time/novoTime', {
                        "fk_id_time": id_time,
                        "fk_id_campeonato": id_campeonato,
                        "fase": "quartas",
                        "jogo": jogo,
                        "chave": chave
                    })

                    setFaseAtual("quartas")
                    setFaseAnteriorElim("oitavas")
                    break;
            
                case 'quartas-start':
                    await Api.put(`/campeonatos/time/alterarTime/${id_time_campeonato}`, {
                        "fase": 'quartas',
                        "jogo": jogo,
                        "chave": chave
                    })
                    break;
                case 'semis':
                    await Api.post('/campeonatos/time/novoTime', {
                        "fk_id_time": id_time,
                        "fk_id_campeonato": id_campeonato,
                        "fase": "semis",
                        "jogo": jogo,
                        "chave": chave
                    })

                    setFaseAtual("semis")
                    setFaseAnteriorElim("quartas")
                    break;
                case 'semis-start': 
                    await Api.put(`/campeonatos/time/alterarTime/${id_time_campeonato}`, {
                        "fase": 'semis',
                        "jogo": jogo,
                        "chave": chave
                    })
                    break;

                default:
                    alert('erro')
                    break;
            }
        }

        //window.location.reload()
        setPodeIr(true)
        alert('Jogos cadastrados com sucesso!')    
    }

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
            <header>
            <h2 align="center">o campeao é tal nego</h2>
            </header>
            <div className="chave-page">
                <div className='chaveamento'>
                    <div className="chave">
                        <div className="chave-nome">
                            chave 1
                        </div>
                        <div className="chave-fases">
                            <CardOitavasFinais className={fase == 1 ? 'active-div' : ''} getDadosJogo={getDadosJogoEsquerda} ladoChave={'esquerda'} />
                            <CardQuartasFinais className={fase == 2 ? 'active-div' : ''} getDadosJogo={getDadosJogoEsquerda} ladoChave={'esquerda'}/>
                            <CardSemiFinais className={fase == 3 ? 'active-div' : ''} getDadosJogo={getDadosJogoEsquerda} ladoChave={'esquerda'}/>
                        </div>
                    </div>
                    <div className="final">
                        <CardFinais className={fase == 4 ? 'active-div' : ''} getDadosJogo={getDadosJogoEsquerda}/>
                    </div>
                    <div className="chave">
                        <div className="chave-nome">
                            chave 2
                        </div>
                        <div className="chave-fases">
                            <CardSemiFinais className={fase == 3 ? 'active-div' : ''} getDadosJogo={getDadosJogoDireita} ladoChave={'direita'}/>
                            <CardQuartasFinais className={fase == 2 ? 'active-div' : ''} getDadosJogo={getDadosJogoDireita} ladoChave={'direita'}/>
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