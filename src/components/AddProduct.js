// imports
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import env from 'react-dotenv'

// contexts
import { UserContext } from '../contexts/UserContext'
import { MessageContext } from '../contexts/MessageContext'

const AddProduct = () =>
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
            displayMessage(true, 'Your product has been listed. Go to your products tab to see your newly added product.')
        }).catch(error => console.log(error.message))
    }

    return (
        <div className="add-product" onSubmit={(e) => {addProduct(e)}}>
            <h1>List a New Product</h1>
            <form className="add-product-form">
                <input type="text" value={name} placeholder="Name" onChange={(e) => {setName(e.target.value)}}/>
                <input type="text" value={description} placeholder="Description" onChange={(e) => {setDescription(e.target.value)}}/>
                <input type="float" value={price} placeholder="Price" onChange={(e) => {setPrice(e.target.value)}}/>
                <input type="text" value={image} placeholder="Image URL" onChange={(e) => {setImage(e.target.value)}}/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default AddProduct;