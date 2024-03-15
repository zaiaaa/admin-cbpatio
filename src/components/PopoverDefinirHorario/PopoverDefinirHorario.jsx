import { PopoverComponent } from "../Popover/Popover"
import { Input } from "../Input/input"
import { format } from "date-fns"
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "../Button/button"
import { Api } from "../../services/api"
import { useParams } from "react-router-dom"
import { useToast } from "@chakra-ui/react"

const PopoverDefinirHorario = ({ textDispare, popoverTitle, jogo, chave, fase, timesInscritos }) => {

    const { id } = useParams()
    const toast = useToast()

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
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    })


    const onSubmit = async (formData) => {
        const data = format(formData.data_hora, "yyyy-MM-dd HH:mm:ss")
        console.log(data)
        try {
            await Api.put(`/campeonatos/hora/jogo/${jogo}/fase/${fase}/chave/${chave}/campeonato/${id}`, {
                data_hora: data
            })
        } catch (e) {
            alert("ERRO -> ", e)
        }

        toast({
            position: 'bottom-left',
            title: "Horário definido",
            description: `jogo ${jogo} da chave ${chave} e da fase ${fase}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
        })

        // alert(`deifinir horario do jogo ${jogo} da chave ${chave} e da fase ${fase}`)
        window.location.reload()
    }


    return (
        <>
            {
                timesInscritos?.length == 0

                ?

                    <PopoverComponent
                    textDispare={textDispare}
                    popoverTitle={popoverTitle}
                    >
                    
                    Você precisa cadastrar um jogo para colocar um horario
                </PopoverComponent>

                :
            <PopoverComponent
                textDispare={textDispare}
                popoverTitle={popoverTitle}
            >
                <form >
                    <Input name={"data_hora"} control={control} type='datetime-local' defaultValue={format(new Date(), "yyyy-MM-dd HH:mm:ss")} />
                    <Button variant={'purple'}
                        text={'Salvar'}
                        margin={'1rem 0rem'}
                        onClick={handleSubmit(onSubmit)}
                    ></Button>

                </form>
            </PopoverComponent>
            }
        </>
    )

}

export { PopoverDefinirHorario }