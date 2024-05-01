import {
    Grid,
    GridItem,
} from '@chakra-ui/react'

import { Input } from '../Input/input'
import { Button } from '../Button/button'
import './FormCadCampeonato.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Api } from '../../services/api'
import {format} from "date-fns"
import { useNavigate } from 'react-router-dom'



const schema = yup.object({
    nome:
        yup.string()
            .required('Este campo não pode estar vazio!'),

    modalidade:
        yup.string()
            .required('Este campo não pode estar vazio!')
            .max(20, 'No máximo 20 caracteres.'),
    sinopse:
        yup.string()
            .required("Este campo não pode estar vazio!"),

    valor_entrada:
        yup.number()
            .required('Este campo não pode estar vazio!')
            .test({
                name: 'formato',
                message: 'O número deve estar no formato 0.00',
                test: value => /^\d+(\.\d{1,2})?$/.test(value.toString()),
            }).typeError('Este campo deve ser preechido com um número'),
    premiacao:
        yup.number()
            .required('Este campo não pode estar vazio!')
            .test({
                name: 'formato',
                message: 'O número deve estar no formato 0.00',
                test: value => /^\d+(\.\d{1,2})?$/.test(value.toString()),
            }).typeError('Este campo deve ser preechido com um número'),

    jogadores_por_time:
        yup.number()
            .required('Este campo não pode estar vazio!')
            .test({
                name: 'interger',
                message: 'O número deve ser inteiro',
                test: value => /^\d+$/.test(value.toString()),
            })
            .typeError('Este campo deve ser preechido com um número'),
    limite:
        yup.number('Este campo deve ser preechido com um número')
            .required('Este campo não pode estar vazio!')
            .test({
                name: 'interger',
                message: 'O número deve ser inteiro',
                test: value => /^\d+$/.test(value.toString()),
            })
            .typeError('Este campo deve ser preechido com um número'),
    data_hora:
        yup.date()
            .required('Este campo não pode estar vazio!')
            .typeError('Preencha no formato correto!')


}).required()

const FormCadCampeonato = () => {
    const navigate = useNavigate()

    // falta só fazer a requisição aqui
    const handleCreateCampeonato = async (formData) => {
        try {
            formData.data_hora = format(formData.data_hora, 'yyyy-MM-dd HH:mm:ss' )
            console.log(formData.foto)

            Api.post('/campeonatos/cadastrar', {
                nome: formData.nome,
                foto: formData.foto,
                modalidade: formData.modalidade,
                sinopse: formData.sinopse,
                data: formData.data_hora,
                valor_entrada: formData.valor_entrada,
                premiacao: formData.premiacao,
                jogadores: formData.jogadores_por_time,
                limite: formData.limite
            }, 
                {
                    //NAO APAGUE ISSO AQUI, SEM ISSO NAO ENVIA FOTO.
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
        } catch (e) {
            console.log(e)
        }   
    }

    const handleCleanForm = () => {
        reset();
    }

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    })


    const onSubmit = async (formData) => {
        try {
            handleCreateCampeonato(formData)
            handleCleanForm()
            navigate('/campeonatos')
        } catch (e) {
            console.log(e)
        }
        //console.log(formData)
    }

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} className='form-campeonato' encType='multipart/form-data'>
                {/* grid com 4 linhas e 6 colunas */}
                <Grid
                    templateRows='repeat(4, 1fr)'
                    templateColumns='repeat(6, 1fr)'
                    gap={2}
                >
                    <GridItem colSpan={4}>
                        <label htmlFor="nome">Nome</label>
                        <Input name={"nome"} control={control} type={"text"} />
                        <p>{errors?.nome?.message}</p>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="modalidade">Modalidade</label>
                        <Input name={"modalidade"} control={control} type={'text'} />
                        <p>{errors?.modalidade?.message}</p>

                    </GridItem>
                    <GridItem rowSpan={1} colSpan={6}>
                        <label htmlFor="sinopse">Sinopse</label>
                        <Input
                            name={"sinopse"}
                            control={control}
                            placeholder='Digite uma breve descrição sobre o campeonato...'
                            type={'text'}
                        />
                        <p>{errors?.sinopse?.message}</p>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="valor_entrada">Valor da Entrada</label>
                        <Input name={"valor_entrada"} control={control} />
                        <p>{errors?.valor_entrada?.message}</p>

                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="premiacao">Premiação</label>
                        <Input name={"premiacao"} control={control} />
                        <p>{errors?.premiacao?.message}</p>

                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="jogadores_por_time">Jogadores por time</label>
                        <Input name={"jogadores_por_time"} control={control} type={'number'} />
                        <p>{errors?.jogadores_por_time?.message}</p>

                    </GridItem>

                    <GridItem colSpan={2}>
                        <label htmlFor="limite_de_inscrição">Limite de inscrição</label>
                        <Input name={"limite"} control={control} type={'number'} />
                        <p>{errors?.limite?.message}</p>

                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="data_hora">Data & Hora</label>
                        <Input name={"data_hora"} control={control} type='datetime-local' />
                        <p>{errors?.data_hora?.message}</p>

                    </GridItem>
                    <GridItem colSpan={2} >
                        <label htmlFor="foto">Foto</label>
                        <Input name={"foto"} control={control} type={"file"} />

                    </GridItem>

                    <GridItem colSpan={1}>
                        <Button text={"Cadastrar"} variant={"green"} type={"submit"} width={"100%"} padding={'2rem'} margin={'1.5rem 0'} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Button text={"Limpar"} variant={"yellow"} type={'button'} width={"100%"} margin={'1.5rem 0'} padding={'2rem'} onClick={handleCleanForm}/>
                    </GridItem>
                </Grid>
                {/* colocar todos os possiveis erros nesse formato */}


            </form>
        </>
    )

}

export { FormCadCampeonato }