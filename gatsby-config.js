module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-blog`,
      options: {
        contentPath: `src/posts`,
        assetPath: `content/assets`,
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
