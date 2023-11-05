import { useState,useEffect } from 'react'
import img from './assets/verano.png'
import BotonSwitch from './components/BotonSwitch'
function App() {
  const [currentLocation,setCurrentLocation]=useState('')
  const[windSpeed,setWindSpeed]=useState("")
  const[tempLocation,setTempLocation]=useState(0)
  const[humidityLocation,setHumidityLocation]=useState("")
  const [place,setPlace]=useState("")
  const[darkMode,setDarkMode]=useState(false)
  const[image,setImage]=useState("")
  const [weatherDescription,setWeatherDescription]=useState("")
  useEffect(()=>{
    const firstCallApi=()=>{
      if(!("geolocation" in navigator)){
        console.log("la geolocalización no está disponible")
        return
      }
      navigator.geolocation.getCurrentPosition((position)=>{
        const lat = position.coords.latitude;
        const lon = position.coords.longitude
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`)
        .then(response=>response.json())
        .then(data=>{
          const cityName = data.name;
          const speed=Math.floor(data.wind.speed*3.8)
          const temperature=Math.floor(data.main.temp-273.15)
          const humlocation=Math.floor(data.main.humidity)
          const imageWeather = data.weather[0].icon
          const descriptionImg=data.weather[0].description

          setImage(imageWeather)
          setWeatherDescription(descriptionImg)
          setWindSpeed(speed)
          setCurrentLocation(cityName)
          setTempLocation(temperature)
          setHumidityLocation(humlocation)
        })
        .catch(error => {
          console.error("Error al obtener datos del clima:", error);
        })
      },(error)=>{
        console.error(error)
      })
    }
    return ()=>{firstCallApi()}
  },[])

  const handleSubmit =(e)=>{
    e.preventDefault()
    if(place==="")return
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${import.meta.env.VITE_API_KEY}`)
    .then(response=>response.json())
    .then(data=>{
      const cityName = data.name;
          const speed=Math.floor(data.wind.speed*3.6)
          const temperature=Math.floor(data.main.temp-273.15)
          const humlocation=Math.floor(data.main.humidity)
          const imageWeather = data.weather[0].icon
          const descriptionImg=data.weather[0].description
    
          setImage(imageWeather)
          setWeatherDescription(descriptionImg)
          setWindSpeed(speed)
          setCurrentLocation(cityName)
          setTempLocation(temperature)
          setHumidityLocation(humlocation)
    })
    .catch(error=>{
      console.error(error)
    })
  }
  const changeMode=(estado)=>{
    setDarkMode(estado)
  }
  // ...

const URL_IMAGE = image
? `https://openweathermap.org/img/wn/${image}.png`
: null;

return (
<main className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-slate-800' : 'bg-stone-300'} transition-colors`}>
  <div className='bg-stone-300 flex-col md:flex-row mb-5 w-3/4 md:w-1/3 lg:w-1/3 rounded-lg shadow-2xl flex items-center justify-between p-2'>
    <p className='font-bold'><span className={` ${darkMode? 'text-gray-400':'text-gray-800'}`}> 🌝 Light theme</span> : <span className={` ${darkMode? 'text-gray-800':'text-slate-400'}`}> 🌚 Dark theme</span></p>
    <BotonSwitch changeMode={changeMode}/>
  </div>
  <div className="w-3/4 md:w-1/3 lg:w-1/3 bg-stone-300 p-5 rounded-lg shadow-2xl">
    <form className="flex" onSubmit={handleSubmit}>
      <input type="text" placeholder="place" className="w-3/4 p-2 bg-slate-200" onChange={(e) => {setPlace(e.target.value)}} />
      <input 
        type="submit" value="search" 
        className="cursor-pointer w-1/4 p-2 bg-teal-600 hover:bg-teal-800 rounded-r-lg"
      />
    </form>
    <section className="flex flex-col items-center my-2 justify-center">
      {URL_IMAGE && <img className="w-1/3" src={URL_IMAGE} alt="Weather Icon" />}
      <p className='text-center font-bold text-slate-800'>{weatherDescription}</p>
      <p className='text-center font-bold text-slate-800'>{currentLocation}</p>
    </section>
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className='my-2'>
        <span className='text-slate-800 font-bold'>
          {tempLocation} C°
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span className='font-bold text-slate-800'>
          Humidity: {humidityLocation}%
        </span>
        <span className='text-slate-800 font-bold'>
          Wind: {windSpeed} km/h
        </span>
      </div>
    </div>
  </div>
</main>
);
}

export default App
