import { useState } from 'react'
import './App.css'
import { Simulator } from './logic/simulator'
import hitmarker from "./assets/hitmarker.png"

function App() {
  const handleHit = async () => {
    setHitVisble(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setHitVisble(false);
  }

  const [simulator, setSimulator] = useState(new Simulator(handleHit))

  const [hitVisible, setHitVisble] = useState(false);

  return (
    <>
      <h1>FPS Ping Simulator</h1>
      <div>
        <label htmlFor="ping-slider">Ping: </label>
        <input
          type="number"
          min={0}
          max={300}
          value={simulator.getPing()}
          onChange={e => setSimulator(new Simulator(handleHit, parseInt(e.target.value)))}
          style={{ width: "60px", marginRight: "8px" }}
        />
        <span>ms</span>
        <br />
        <input
          id="ping-slider"
          type="range"
          min={0}
          max={300}
          step={1}
          value={simulator.getPing()}
          onChange={e => setSimulator(new Simulator(handleHit, parseInt(e.target.value)))}
          style={{ width: "300px" }}
        />
      </div>
      <div className="card">
        <button onClick={() => simulator.Shoot()}>
          Shoot
        </button>
      </div>
      {hitVisible && <img width={20} height={20} src={hitmarker} />}
    </>
  )
}

export default App
