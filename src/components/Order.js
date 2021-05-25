const Order = ({ order }) =>
{
    return (
        <div className="order">
            <h3>{order.user.name} - {order.address}</h3>
            <h5>Your Order:</h5>
            {order.cart_items.map(item =>
            {
                return (
                    <div key={item.id}>
                        {item.product.name} - {item.product.price}
                    </div>
                )
            })}
            <h5>Total: ${order.total}</h5>
        </div>
    )
}

export default Order;