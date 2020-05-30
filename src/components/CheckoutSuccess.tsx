import { Block } from '../template/Block'

const order = {
  orderId: '4345435',
  deliveryTime: '2-3',
  items: [
    {
      name: 'Hose',
      sku: '35u6359',
      quantity: 4,
      deliveryTime: '2-3',
    },
    {
      name: 'Hemd',
      sku: '35356345',
      quantity: 2,
      deliveryTime: '5-8',
    },
    {
      name: 'Hut',
      sku: '3458356',
      quantity: 10,
      deliveryTime: '1-2',
    },
  ],
}

type OrderItemData = typeof order['items'][0]

export const CheckoutSuccess: React.FC = () => {
  return (
    <div>
      <Block blockId={'checkout-success'} data={{ order }}>
        <Block blockId={'headline'}>
          <h2>Vielen Dank</h2>
        </Block>
        <Block blockId={'copy'}>
          <p>Wir haben Ihre Bestellung entgegegenommen.</p>
        </Block>
        <Block blockId={'order-info'}>
          <Block blockId={'order-info-title'}>
            <h2>Ihre Bestellung im Überblick:</h2>
          </Block>
          {order.items.map((item) => (
            <OrderItem item={item} key={item.sku} />
          ))}
        </Block>
      </Block>
    </div>
  )
}

const OrderItem: React.FC<{ item: OrderItemData }> = ({ item }) => {
  return (
    <Block blockId={'order-item'} data={{ item }}>
      <div style={{ marginBottom: '20px' }}>
        <Block blockId={'order-item-title'}>
          <span>
            <b>{item.name}</b>
          </span>
          <br />
        </Block>
        <Block blockId={'order-item-details'}>
          <span>Artikel-Nr.: {item.sku}</span>
          <br />
          <span>Anzahl: {item.quantity}</span>
          <br />
        </Block>
      </div>
    </Block>
  )
}
