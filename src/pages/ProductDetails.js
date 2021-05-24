import env from 'react-dotenv'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ProductDetails = (props) =>
{
    // states
    const [product, setProduct] = useState({})

    // functions
    const getProduct = () =>
    {
        axios.get(`${env.BACKEND_URL}/products/${props.productId}`).then((res) =>
        {
            // console.log(res)
            setProduct(res.data.product)
        })
    }
    useEffect(getProduct, [])

    return (
        <div className="productDetails">
            <h1>{product.name}</h1>
            <h3>{product.description}</h3>
        </div>
    )
}

export default ProductDetails;