import { Cloudinary } from '@cloudinary/url-gen'

const cld = new Cloudinary({ cloud: { cloudName: 'dknnb0dnz' } })
cld.setConfig({
  cloud: {
    cloudName: process.env.CLOU_NAME,
    apiKey: process.env.CLOU_KEY,
    apiSecret: process.env.CLOU_SECRET,
  },
})
export { cld }
