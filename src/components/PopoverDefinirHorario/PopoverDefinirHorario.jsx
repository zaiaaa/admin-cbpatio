import { PopoverComponent } from "../Popover/Popover"
import { Input } from "../Input/input"
import { format } from "date-fns"
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "../Button/button"

const PopoverDefinirHorario = ({ textDispare, popoverTitle }) => {

  
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
            <PopoverComponent
                textDispare={textDispare}
                popoverTitle={popoverTitle}
            >
                <Input name={"data_hora"} control={control} type='datetime-local' defaultValue={format(new Date(), "yyyy-MM-dd HH:mm:ss")} />
                <Button variant={'purple'} text={'Salvar'} margin={'1rem 0rem'} onClick={handleOnClickSaveButton}></Button>
            </PopoverComponent>
        </>
    )

}

export { PopoverDefinirHorario }