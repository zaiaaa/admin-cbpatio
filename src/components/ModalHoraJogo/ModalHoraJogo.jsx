import { ModalComponent } from "../Modal/Modal"
import './ModalHoraJogo.css'
import { Input } from "../Input/input"
import { format } from "date-fns"
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const ModalHoraJogo = ({jogo, chave, fase}) => {


    const schema = yup.object({
        data_hora:
            yup.date()
                .required('Este campo não pode estar vazio!')
                .typeError('Preencha no formato correto!')

    }).required()


    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        setValue
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    })

    
    const handleOnClickSaveButton = () => {
        alert('deifinir horario')
    }


    return (
        <>
            <ModalComponent
                titulo={'Defina a data e a hora dos jogos'}
                textModalOpenBtn={'Definir horários'}
                variantTextOpenBtn={'purple'}
                handleOnClickSaveButton={handleOnClickSaveButton}
            >
                <label htmlFor="camepao">Qual a chave?</label>
                <select name="chave" id="chave" className="select-campeao">
                    <option value="">
                        Selecione a chave:
                    </option>
                    <option value={`esquerda`}>
                        Esquerda
                    </option>
                    <option value={`direita`}>
                        Direita
                    </option>
                </select>
                <label htmlFor="fase">Qual a fase?</label>
                <select name="fase" id="fase" className="select-campeao">
                    <option value="">
                        Selecione a fase:
                    </option>
                    <option value={`oitavas`}>
                        oitavas
                    </option>
                    <option value={`quartas`}>
                        quartas
                    </option>
                    <option value={`semis`}>
                        semis
                    </option>
                    <option value={`finais`}>
                        finais
                    </option>
                </select>
                <label htmlFor="jogo">Qual o jogo?</label>
                <select name="jogo" id="jogo" className="select-campeao">
                    <option value="">
                        Selecione o jogo:
                    </option>
                    <option value={`jogo 1`}>
                        jogo 1
                    </option>
                    <option value={`jogo 2`}>
                        jogo 2
                    </option>
                    <option value={`jogo 3`}>
                        jogo 3
                    </option>
                    <option value={`jogo 4`}>
                        jogo 4
                    </option>
                </select>
                <label htmlFor="data_hora">Data & Hora</label>
                <Input name={"data_hora"} control={control} type='datetime-local' defaultValue={format(new Date(), "yyyy-MM-dd HH:mm:ss") } />
                <p>{errors?.data_hora?.message}</p>

            </ModalComponent>
        </>
    )
}

export { ModalHoraJogo }