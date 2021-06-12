const functions = require('firebase-functions')
const hash = require('object-hash')
const puppeteer = require('puppeteer')
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: functions.config().cloudinary.cloud_name,
  api_key: functions.config().cloudinary.api_key,
  api_secret: functions.config().cloudinary.api_secret
})

function delay (time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), time)
  })
}

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: '512MB'
}

exports.generatePreview = functions
  .runWith(runtimeOpts)
  .https.onRequest(async (request, response) => {
    const params = {
      title: request.query.title,
      authorName: request.query.authorName,
      authorImage: request.query.authorImage,
      date: request.query.date
    }
    console.log(params)
    // Get a unique id for our image based of its params
    const CLOUDINARY_FOLDER = 'og'
    const imageId = hash(params)

    // First check to see if its already uploaded to cloudinary
    try {
      const result = await cloudinary.api.resource(`${CLOUDINARY_FOLDER}/${imageId}`)
      console.log('Got existing image')
      return response.redirect(301, result.secure_url)
    } catch (e) {
    // No existing image
      console.log('No existing image')
    }

    // Spawn a new headless browser
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({
      width: 1600,
      height: 800
    })

    // Visit our peview page and generate the image
    const url = new URL('https://og-test-373ce.web.app/open-graph/')
    Object.keys(params)
      .forEach((key) => {
        if (params[key]) {
          url.searchParams.set(key, params[key])
        }
      })

    console.log(url.toString())

    await page.goto(url.toString(), { waitUntil: 'domcontentloaded' })
    await delay(1000)
    const imageBuffer = await page.screenshot()
    await browser.close()

    // Upload to cloudinary
    const image = await cloudinary.uploader.upload(
    `data:image/png;base64,${imageBuffer.toString('base64')}`,
    {
      public_id: imageId,
      folder: CLOUDINARY_FOLDER
    }
    )

    return response.redirect(301, image.secure_url)
  })
