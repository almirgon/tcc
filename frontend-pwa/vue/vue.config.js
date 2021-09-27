module.exports = {
  pwa: {
    manifestOptions: {
        name: "Promotion",
        short_name: "Promotion",
        theme_color: "#4DBA87",
        background_color: "#fafafa",
        description: "Um site focado na sua economia!",
        display: "standalone",
        orientation: "portrait",
        start_url: ".",
        icons: [
          {
            src: "./img/icons/android-chrome-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "./img/icons/android-chrome-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "./img/icons/apple-touch-icon-72x72.png",
            sizes: "72x72",
            type: "image/png"
          },
          {
            src: "./img/icons/apple-touch-icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "./img/icons/apple-touch-icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "./img/icons/apple-touch-icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "./img/icons/apple-touch-icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
    },
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/index.html',
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://promotionapi.herokuapp.com/api/promotion/actives'),
          handler: 'networkFirst',
          options: {
            networkTimeoutSeconds: 20,
            cacheName: 'actives',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: new RegExp('^https://promotionapi.herokuapp.com/api/promotion/*'),
          handler: 'networkFirst',
          options: {
            networkTimeoutSeconds: 20,
            cacheName: 'promotion',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  } 
}
