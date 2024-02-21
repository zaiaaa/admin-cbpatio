import { CardValores } from "../../components/CardValores/CardValores"
const Valores = () => {
    return (
        <>
            <h1>Valores</h1>
            <CardValores titulo={'GERAL'}>
                <ul>
                    <li>VALOR ARRECADADO: <span className="valores">111.10  R$</span></li>
                    <li>VALOR EM PREMIAÇÕES: <span className="valores">1111</span></li>
                    <li>MÉDIA DE VALOR ARRECADADO <span className="valores">1111</span></li>
                </ul>
            </CardValores>
        </>
    )
}
export { Valores }