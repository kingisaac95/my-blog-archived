module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-blog`,
      options: {
        contentPath: `src/posts`,
        assetPath: `content/assets`,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
      },
    },
  ],
  siteMetadata: {
    title: `Boffin`,
    author: `Kingdom Orjiewuru`,
    description: `A blog by Kingdom Orjiewuru.`,
    siteUrl: `https://boffin.netlify.com`,
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/kingisaac95`,
      },
      {
        name: `github`,
        url: `https://github.com/kingisaac95`,
      },
    ],
  },
}
