
import './App.css'

function App() {

  return (
    <>

      <HeaderApp text="red h1 test" color="red" />
      <HeaderApp text="red h1 test" /> {/* color is optional */}

    </>
  )
}

export default App

function HeaderApp(props: { text: string, color?: string }) {
  return <h1 style={{ color: props.color }}> {props.text}</h1>
}