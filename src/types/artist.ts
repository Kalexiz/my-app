export interface Artist {
  id: string
  name: string
  image: string
}

export interface ArtistResource {
  name: string
  mbid: string
  image: ImageUrl[]
}

interface ImageUrl {
  '#text': string
}
