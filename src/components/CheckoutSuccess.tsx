import { Block } from '../template/Block'

export const CheckoutSuccess: React.FC = () => {
  return (
    <div>
      <Block blockId={'headline'}>
        <h2>Vielen Dank</h2>
      </Block>
      <Block blockId={'copy'}>
        <p>Wir haben Ihre Bestellung entgegegenommen.</p>
      </Block>
    </div>
  )
}
