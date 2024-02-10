import {
    Grid,
    GridItem,
} from '@chakra-ui/react'

import { Input } from '../Input/input'
import { Button } from '../Button/button'
import './FormEditCampeonato.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Api } from '../../services/api'
import {format} from "date-fns"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formataDinheiro } from '../../services/functions'



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
    limite_de_inscrição:
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

const FormEditCampeonato = ({id}) => {
    const navigate = useNavigate()
    const [campeonato, setCampeonato] = useState({})

    useEffect(() => {
        const handleGetCampeonato = async () => {
            const {data} = await Api.get(`/campeonatos/id/${id}`)
            console.log(data[0])
            setValue('nome', data[0].nome)
            setValue('jogadores_por_time', data[0].jogadores)
            setValue('limite_de_inscrição', data[0].limite)
            setValue('data_hora', format(new Date(data[0].data), "yyyy-MM-dd HH:mm:ss"))
            setValue('modalidade', data[0].modalidade)
            setValue('sinopse', data[0].sinopse)
            setValue('valor_entrada', data[0].valor_entrada)
            setValue('premiacao', data[0].premiacao)
            setCampeonato(data)
        }
        handleGetCampeonato()
            
    }, [])

    campeonato.length > 0 ? console.log(format(campeonato[0].data, "yyyy-MM-ddTHH:mm")) : ""
    
    

    console.log(id)
    const handleAlterCampeonato = async (formData) => {
        try {
            //formData.data_hora = format(formData.data_hora, 'yyyy-MM-dd HH:mm:ss' )
            console.log(formData)

            //TODO fazer a requisição e testar
            // Api.put(`/campeonatos/atualizar/${id}`, {
            //     nome: formData.nome,
            //     foto: formData.foto,
            //     modalidade: formData.modalidade,
            //     sinopse: formData.sinopse,
            //     data: formData.data_hora,
            //     valor_entrada: formData.valor_entrada,
            //     premiacao: formData.premiacao,
            //     jogadores: formData.jogadores_por_time
            //      limite: formData.limite
            // }, 
            //     {
            //         //NAO APAGUE ISSO AQUI, SEM ISSO NAO ENVIA FOTO.
            //         headers: {
            //             "Content-Type": "multipart/form-data"
            //         }
            //     }
            // )
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
        setValue
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    })


    const onSubmit = async (formData) => {
        try {
            handleAlterCampeonato(formData)
            //handleCleanForm()
            //window.location.reload()
        } catch (e) {
            console.log(e)
        }
        //console.log(formData)
    }

    return (
        <>
            {/* BUG NO FORM, NAO PODEMOS DEIXAR OSÓ O DEFAULTVALUE, PQ SE NAO ELE NAO DEIXA ENVIAR */}
            <form onSubmit={handleSubmit(onSubmit)} className='form-campeonato' encType='multipart/form-data'>
                {/* grid com 4 linhas e 6 colunas */}
                <Grid
                    templateRows='repeat(4, 1fr)'
                    templateColumns='repeat(6, 1fr)'
                    gap={2}
                >
                    <GridItem colSpan={4}>
                        <label htmlFor="nome">Nome</label>
                        <Input name={"nome"} control={control} type={"text"} defaultValue={campeonato.length > 0 ? campeonato[0].nome : ""} />
                        <p>{errors?.nome?.message}</p>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="modalidade">Modalidade</label>
                        <Input name={"modalidade"} control={control} type={'text'} defaultValue={campeonato.length > 0 ? campeonato[0].modalidade : ""} />
                        <p>{errors?.modalidade?.message}</p>

                    </GridItem>
                    <GridItem rowSpan={1} colSpan={6}>
                        <label htmlFor="sinopse">Sinopse</label>
                        <Input
                            name={"sinopse"}
                            control={control}
                            placeholder='Digite uma breve descrição sobre o campeonato...'
                            type={'text'}
                            defaultValue={campeonato.length > 0 ? campeonato[0].sinopse : ""}
                        />
                        <p>{errors?.sinopse?.message}</p>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="valor_entrada">Valor da Entrada</label>
                        <Input name={"valor_entrada"} control={control} defaultValue={campeonato.length > 0 ? campeonato[0].valor_entrada : ""}/>
                        <p>{errors?.valor_entrada?.message}</p>

                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="premiacao">Premiação</label>
                        <Input name={"premiacao"} control={control} defaultValue={campeonato.length > 0 ? campeonato[0].premiacao : ""} />
                        <p>{errors?.premiacao?.message}</p>

                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="jogadores_por_time">Jogadores por time</label>
                        <Input name={"jogadores_por_time"} control={control} type={'number'} defaultValue={campeonato.length > 0 ? campeonato[0].jogadores : ""}/>
                        <p>{errors?.jogadores_por_time?.message}</p>

                    </GridItem>

                    <GridItem colSpan={2}>
                        <label htmlFor="limite_de_inscrição">Limite de inscrição</label>
                        <Input name={"limite_de_inscrição"} control={control} type={'number'} defaultValue={campeonato.length > 0 ? campeonato[0].limite : ""} />
                        <p>{errors?.limite_de_inscrição?.message}</p>

                    </GridItem>
                    <GridItem colSpan={2}>
                        <label htmlFor="data_hora">Data & Hora</label>
                        <Input name={"data_hora"} control={control} type='datetime-local' defaultValue={campeonato && campeonato.length > 0 ? format(new Date(campeonato[0].data), "yyyy-MM-dd HH:mm:ss") : ""}/>
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

export { FormEditCampeonato }