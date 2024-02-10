import './Chave.css'
import { Button } from '../Button/button'
import { CardOitavasFinais } from '../CardOitavasFinais/CardOitavasFinais'
import { CardQuartasFinais } from '../CardQuartasFinais/CardQuartasFinais'
import { CardSemiFinais } from '../CardSemiFinais/CardSemiFinais'
import { CardFinais } from '../CardFinais/CardFinais'
import { useState } from 'react'

const Chave = () => {
    const [fase, setFase] = useState(1)

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
                            <CardOitavasFinais className={fase == 1 ? 'active-div' : ''} />
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
                            <CardOitavasFinais className={fase == 1 ? 'active-div' : ''} />
                        </div>
                    </div>
                </div>
                <div className="chaveamento-opcoes">
                    <div className="fase-opcoes">
                        <Button text={'Salvar'} type={'button'} variant={'green'} padding={'1rem'} width={'100%'}></Button>
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