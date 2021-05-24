import { useState } from 'react'
import { Redirect } from 'react-router-dom';

const Product = ({ product }) =>
{
    const [redirect, setRedirect] = useState('')

    return (
        <div key={product.id} className="product" onClick={() => {setRedirect(`/products/${product.id}`)}}>
            {redirect !== '' ? <Redirect to={redirect} /> : null}
            <h3>{product.name} | {product.description}</h3>
        </div>
    )
}

export default Product;