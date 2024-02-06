import { useParams, Link } from "react-router-dom"
import { Api } from '../../services/api';
import { useEffect, useState } from "react";
import { Spinner, Center } from '@chakra-ui/react';
import { Button } from '../../components/Button/button';
import { PreviewCampeonato } from "../../components/PreviewCampeonato/PreviewCampeonato";
import { CardCampeonato } from '../../components/CardCampeonato/CardCampeonato'
import './EditarCampeonato.css'
import {FormEditCampeonato} from "../../components/FormEditCampeonato/FormEditCampeonato"

const path = "http://localhost:3005"
import img from '../../assets/noimage.png'
import { format } from "date-fns";

const EditarCampeonato = () => {
    const { id } = useParams()
    const [campeonatos, setCampeonatos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handleGetCampeonatos = async () => {
            try {
                const fetch = await Api.get(`/campeonatos/id/${id}`)
                setCampeonatos(fetch.data[0])
                setLoading(false)

            } catch (e) {

            }
        }
        handleGetCampeonatos()
    }, [])

    function formataData(data){
        const newDate = new Date(data)
        return format(newDate, "dd/MM/yyyy HH:mm:ss")
    }

    function formataDinheiro(valor){
        const formata = Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        return formata.format(valor)
    }

    let foto = ''
    if (campeonatos.foto) {
        foto = `${path}/${campeonatos.foto.replace(/\\/g, '/')}`
    } else {
        foto = img
    }

    return (
        <>
            {
                loading ? (
                    <Center>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            color='#fff'
                            size='xl'
                        />
                    </Center>
                ) : (
                    <>
                        <h1>{campeonatos.nome}</h1>
                        <div className="flex">
                            <div className="first-row">
                                <h2 className="h2-sublinhado">INFORMAÇÕES DO CAMPEONATO</h2>
                                <PreviewCampeonato
                                    nome={campeonatos.nome}
                                    sinopse={campeonatos.sinopse}
                                    data_hora={formataData(campeonatos.data)}
                                    modalidade={campeonatos.modalidade}
                                    valor_ingresso={formataDinheiro(campeonatos.valor_entrada)}
                                    jogadores_time={campeonatos.jogadores}
                                    premiacao={formataDinheiro(campeonatos.premiacao)}
                                    limite_inscricao={10}
                                />
                            </div>

                            <div>
                                <h3 >PREVIEW</h3>
                                <CardCampeonato
                                    idCamp={campeonatos.id_campeonato}
                                    titulo={campeonatos.nome}
                                    variant={'preview'}
                                    width={'214px'}
                                    height={'400px'}
                                    bgImage={foto}
                                />
                            </div>

                        </div>

                    </>
                )
            }
            <Link to='/campeonatos'>
                <Button text={'Voltar'} type={"button"} variant={"red"} width={"10%"} padding={".75rem 2rem"} />
            </Link>
            
            <div>
                <h2 className="h2-sublinhado">EDITAR CAMPEONATO</h2>
                <FormEditCampeonato id={id}/>
            </div>
        </>
    )
}

export { EditarCampeonato }