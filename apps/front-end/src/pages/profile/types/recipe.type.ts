interface typeUser {
  foto_perfil: string
  id: string
}

export type RecipeType = {
  id: string
  titulo: string
  subtitulo: string
  descricao: string
  tempo_preparo: string
  dificuldade: string
  calorias: number
  imagem: string
  publicado: boolean
  user: typeUser
}

export type UserPayloadType = {
  userId: string
  username: string
}
