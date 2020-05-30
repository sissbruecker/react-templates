import { Block } from '../template/Block'
import { useEffect, useState } from 'react'

const orderItems = [
  {
    name: 'Hose',
    sku: '35u6359',
    quantity: 4,
  },
  {
    name: 'Hemd',
    sku: '35356345',
    quantity: 2,
  },
  {
    name: 'Hut',
    sku: '3458356',
    quantity: 10,
  },
]

export const CheckoutSuccess: React.FC = () => {
  const [deliveryTime, setDeliveryTime] = useState('?')

  useEffect(() => {
    setTimeout(() => setDeliveryTime('2-3'), 2000)
  }, [])

  return (
    <div>
      <Block blockId={'headline'}>
        <h2>Vielen Dank</h2>
      </Block>
      <Block blockId={'copy'}>
        <p>
          Wir haben Ihre Bestellung entgegegenommen. Diese wird vermutlich in{' '}
          {deliveryTime} Tagen geliefert.
        </p>
      </Block>
      <Block blockId={'order-info'}>
        <Block blockId={'order-info-title'}>
          <h2>Ihre Bestellung im Überblick:</h2>
        </Block>
        {orderItems.map((item) => (
          <Block blockId={'order-item'}>
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
        ))}
      </Block>
    </div>
  )
}
