module.exports = {
  siteMetadata: {
    title: "nicolás escarpentier"
  },
  pathPrefix: `/js`,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-sharp`, `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        "excerpt_separator": `<!--more-->`,
        plugins: [{
          resolve: `gatsby-remark-images`,
          options: { maxWidth: 700, },
        },
        {
          resolve: "gatsby-remark-embed-video",
          options: {
            width: 800,
            ratio: 1.78, 
            related: false, 
            noIframeBorder: true 
          }
        },
        ],
      },
    },
  ]
}
