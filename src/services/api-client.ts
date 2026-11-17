import { Artist, ArtistResource } from "@/types/artist"

const API_KEY= "a0b7538025b8a38c70ce8dd816798f6b"
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=${API_KEY}&format=json`

function getMusicData(): Promise<Artist[]> {
  return fetch(`${URL}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
.then(response => {
  if (!response.ok) {
    throw new Error("No se pudo cargar la música");
  }
  return response.json();
})
.then(data => {
  if (!Array.isArray(data.topartists?.artist)) {
    throw new Error("La respuesta de música no es válida");
  }
  return data.topartists.artist;
})
.then(artists => artists.map((artist: ArtistResource) => {
  return {
    id: artist.mbid || artist.name,
    name: artist.name,
    image: artist.image?.[artist.image.length - 1]?.['#text'] || ""
  }
}))
}

export { getMusicData }

