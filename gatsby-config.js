module.exports = {
  siteMetadata: {
    title: `The Frugal Dev`,
    author: `Clayton Orman`,
    description: `A blog discussing topics around personal finance and technology.`,
    siteUrl: `https://thefrugal.dev`,
    siteImg: "./content/assets/profile-pic.jpg",
    social: {
      twitterHandle: `thefrugaldev`,
      linkedInSuffix: `tfd`,
      githubUserName: `thefrugaldev`,
      disqusShortName: `thefrugaldev`,
    },
  },
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog-markdown`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-emoji`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: "±",
              aliases: {},
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        // your google analytics tracking id
        trackingId: `UA-145836894-1`,
        // Puts tracking script in the head instead of the body
        head: true,
        // enable ip anonymization
        anonymize: false,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The Frugal Dev`,
        short_name: `thefrugaldev`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/favicon-32x32.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
  ],
}
