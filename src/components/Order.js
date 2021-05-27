const Order = ({ order }) =>
{
    return (
        <div className="order">
            <h2 className="order-header">{order.user.name} - {order.address}</h2>
            <h4>Your Order</h4>
            {order.cart_items.map(item =>
            {
                return (
                    <div key={item.id} className="order-product">
                        {item.product.name} - ${Math.round(item.product.price * 100) / 100}
                    </div>
                )
            })}
            <h4>Total: ${Math.round(order.total * 100) / 100}</h4>
        </div>
    )
}

export default Order;