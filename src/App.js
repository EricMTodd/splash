import Clock from './components/Clock'
import Slideshow from './components/Slideshow'
import Weather from './components/Weather'

const App = () => {

  return(
    <div id='app'>
      <Slideshow />
      <div id='data-container'>
        <Weather />
        <Clock />
      </div>
    </div>
  )
}

export default App
