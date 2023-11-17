type IngredientType = {
  id: number
  nome: string
}

type UserPayloadType = {
  userId: string
  username: string
}

type CommentsType = {
  userId: string
  username: string
  message: string
}

export { IngredientType, UserPayloadType, CommentsType }
