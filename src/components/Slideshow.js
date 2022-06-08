import { useEffect, useState } from 'react'
import axios from 'axios'

const Slideshow = () => {
  let urls = []
  const [style, setStyle] = useState()
  const [photos, setPhotos] = useState([])
  const apiKey = '39ebf8206b5f188179bf4176fadf9407'
  const userId = '194608125%40N04'
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&user_id=${userId}&per_page=343&page=&format=json&nojsoncallback=1`
  
  useEffect(() => {
    axios.get(url)
    .then(response => {
      setPhotos(response.data.photos.photo.slice(44, response.data.photos.photo[-1]))
    })
    .catch(error => console.log(error))
  }, [])

  if (photos !== []) {
    photos.forEach(photo => {
      urls.push(`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`)
    })
  }    

  useEffect(() => {
    let timer = setInterval(() => {
      setStyle({backgroundImage: `url(${urls[Math.floor(Math.random() * urls.length)]})`})
    }, 60000)
    return () => clearInterval(timer)
  })
  


  setTimeout(() => {
    return(
      <div id='slideshow' style={style} />
    )
  }, 2000)

  return(
    <div id='slideshow' style={{backgroundImage: `url(${urls[Math.floor(Math.random() * urls.length)]})`}} />
  )
}

export default Slideshow
