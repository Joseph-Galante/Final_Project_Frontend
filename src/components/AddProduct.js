// imports
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import env from 'react-dotenv'

// contexts
import { UserContext } from '../contexts/UserContext'
import { MessageContext } from '../contexts/MessageContext'

const AddProduct = ({ updateMenu }) =>
{
    // contexts
    const { userState } = useContext(UserContext);
    const [ user ] = userState;
    const { displayMessage, clearMessage } = useContext(MessageContext)

    // states
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')

    // on component load
    useEffect(clearMessage, [])
    
    // functions
    const addProduct = (e) =>
    {
        e.preventDefault()

        axios.post(`${env.BACKEND_URL}/products`, {
            name, description, price, image
        }, { headers: { Authorization: user.id }}).then((res) =>
        {
            // console.log(res)
            setName('')
            setDescription('')
            setPrice(0)
            setImage('')
            updateMenu('products')
        }).catch(error => console.log(error.message))
    }

    return (
        <div className="add-product">
            <h1>List a New Product</h1>
            <div className="add-product-container">
                <div className="add-product-labels">
                    <div className="add-product-label">Name:</div>
                    <div className="add-product-label">Description:</div>
                    <div className="add-product-label">Price:</div>
                    <div className="add-product-label">Image:</div>
                </div>
                <form className="add-product-form" onSubmit={(e) => {addProduct(e)}}>
                    <input type="text" value={name} placeholder="Name" onChange={(e) => {setName(e.target.value)}}/>
                    <input type="text" value={description} placeholder="Description" onChange={(e) => {setDescription(e.target.value)}}/>
                    <input type="float" value={price} placeholder="Price" onChange={(e) => {setPrice(e.target.value)}}/>
                    <input type="text" value={image} placeholder="Image URL" onChange={(e) => {setImage(e.target.value)}}/>
                    <input id="add-product-submit" type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    )
}

export default AddProduct;