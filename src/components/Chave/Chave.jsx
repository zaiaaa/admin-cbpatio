import './Chave.css'
import { Button } from '../Button/button'

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
                            <div>oitavas</div>
                            <div>quartas</div>
                            <div>semis</div>
                        </div>
                    </div>
                    <div className="final">
                        final Componente
                    </div>
                    <div className="chave">
                        <div className="chave-nome">
                            chave 2
                        </div>
                        <div className="chave-fases">
                            <div className='active-div'>semis</div>
                            <div>quartas</div>
                            <div>oitavas</div>
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