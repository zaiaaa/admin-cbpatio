import './Chave.css'
import { Button } from '../Button/button'
import { CardOitavasFinais } from '../CardOitavasFinais/CardOitavasFinais'
import { CardQuartasFinais } from '../CardQuartasFinais/CardQuartasFinais'
import {CardSemiFinais} from '../CardSemiFinais/CardSemiFinais'
import {CardFinais} from '../CardFinais/CardFinais'

const Chave = () => {
    return (
        <>
            <div className="chave-page">
                <div className='chaveamento'>
                    <div className="chave">
                        <div className="chave-nome">
                            chave 1
                        </div>
                        <div className="chave-fases">
                            <CardOitavasFinais className={'active-div'}/>
                            <CardQuartasFinais />
                            <CardSemiFinais/>
                        </div>
                    </div>
                    <div className="final">
                        <CardFinais/>
                    </div>
                    <div className="chave">
                        <div className="chave-nome">
                            chave 2
                        </div>
                        <div className="chave-fases">
                            <CardSemiFinais/>
                            <CardQuartasFinais />
                            <CardOitavasFinais className='active-div'/>
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
                        <Button text={'Proxima fase'} type={'button'} variant={'pink'} padding={'1rem'} width={'100%'}></Button>
                        <Button text={'Fase Anterior'} type={'button'} variant={'pink'} padding={'1rem'} width={'100%'}></Button>
                    </div>
                </div>
            </div >
        </>
    )
}

export { Chave }