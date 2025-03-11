import "./theme.css.ts"
import { useCounterStore } from './state'
import { FloatButton } from "antd"
import { AntDesignOutlined } from '@ant-design/icons'

function App() {
  const { count, increment, decrement } = useCounterStore()

  return (
    <>
      <h1>Atomic10 Create Stack</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <FloatButton
        onClick={() => alert("Ant Design Float Button Clicked")}
        shape="square"
        type="primary"
        style={{ insetInlineEnd: 24 }}
        icon={<AntDesignOutlined />}
      />
    </>
  )
}

export default App
