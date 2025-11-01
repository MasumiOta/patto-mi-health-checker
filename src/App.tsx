import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>ぱっと見ヘルスケア</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          環境構築完了！開発を開始します。
        </p>
      </div>
    </>
  )
}

export default App
