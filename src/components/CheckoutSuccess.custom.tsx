import { Extend } from '../template/Extend'
import { CheckoutSuccess } from './CheckoutSuccess'
import { Block, Parent } from '../template/Block'
import { useEffect, useState } from 'react'

export const CustomCheckoutSuccess: React.FC = () => {
  const [orderId, setOrderId] = useState('?')

  useEffect(() => {
    setTimeout(() => setOrderId('766567'), 5000)
  }, [])

  return (
    <Extend Component={CheckoutSuccess}>
      <Block blockId={'headline'}>
        <h1>Vielen Dank!</h1>
        <span style={{ color: 'blueviolet' }}>Bestellungs-Nr.: {orderId}</span>
      </Block>

      <Block blockId={'copy'}>
        <Parent />

        <p style={{ color: 'orangered' }}>
          Aufgrund der aktuellen Krise kann es zu Verzögerungen kommen!
        </p>
      </Block>

      <Block blockId={'order-info'}>
        <Parent />
        <Block blockId={'order-info-title'}>
          <Parent />
          <p>Bitte beachten Sie auch die individuellen Lieferzeiten.</p>
        </Block>
      </Block>

      <Block blockId={'order-item-details'}>
        <Parent />
        <span>Lieferzeit: 2-3 Tage</span>
        <br />
      </Block>
    </Extend>
  )
}
