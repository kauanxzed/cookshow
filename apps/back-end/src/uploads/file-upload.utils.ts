import { extname } from 'path'

export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false)
  }
  callback(null, true)
}

export const editFileName = (req: any, file: any, callback: any) => {
  const name = file.originalname.split('.')[0]
  const fileExtName = extname(file.originalname)
  callback(null, `${name}${fileExtName}`)
}
