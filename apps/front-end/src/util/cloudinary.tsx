import { Cloudinary } from '@cloudinary/url-gen'

const cld = new Cloudinary({ cloud: { cloudName: 'dknnb0dnz' } })
cld.setConfig({
  cloud: {
    cloudName: 'dknnb0dnz',
    apiKey: '863621582139952',
    apiSecret: 'f1Ozo067ieetflgKMYkGepALNwc',
  },
})
export { cld }
