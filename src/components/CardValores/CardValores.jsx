import './CardValores.css'

const CardValores = ({ titulo, children }) => {
    return (
        <>
            <div className="card-valores">
                <h1 className="card-valores-titulo">
                    {titulo}
                </h1>
                {
                    children
                }
            </div>

        </>
    )
}


export { CardValores }