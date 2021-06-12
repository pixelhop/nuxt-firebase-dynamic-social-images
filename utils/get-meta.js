export default function getMeta (options) {
  const { title, description } = options
  const imageUrl = new URL('https://us-central1-og-test-373ce.cloudfunctions.net/generatePreview')
  Object.keys(options)
    .forEach((key) => {
      if (options[key]) {
        imageUrl.searchParams.set(key, options[key])
      }
    })

  return [
    {
      hid: 'description',
      name: 'description',
      content: description
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: description
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: title
    },
    {
      hid: 'twitter:site',
      name: 'twitter:site',
      content: '@pixelhopio'
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: imageUrl.toString()
    },
    {
      hid: 'twitter:creator',
      name: 'twitter:creator',
      content: '@pixelhopio'
    },
    // Open graph
    {
      hid: 'og:title',
      property: 'og:title',
      content: title
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: description
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'website'
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: imageUrl.toString()
    },
    {
      hid: 'og:image:width',
      property: 'og:image:width',
      content: '1600'
    },
    {
      hid: 'og:image:height',
      property: 'og:image:height',
      content: '800'
    }
  ]
}
