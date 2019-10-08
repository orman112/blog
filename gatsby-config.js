module.exports = {
  siteMetadata: {
    title: `The Frugal Dev`,
    author: `Clayton Orman`,
    description: `A blog discussing topics around personal finance and technology.`,
    siteUrl: `https://thefrugal.dev`,
    social: {
      twitter: `thefrugaldev`,
      linkedIn: `tfd`,
      github: `thefrugaldev`,
    },
  },
  plugins: [
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
          {
            resolve: `gatsby-transformer-remark`,
            options: {
              // In your gatsby-transformer-remark plugin array
              plugins: [
                {
                  resolve: "gatsby-remark-emojis",
                  options: {
                    // Deactivate the plugin globally (default: true)
                    active: true,
                    // Add a custom css class
                    class: "emoji-icon",
                    // Select the size (available size: 16, 24, 32, 64)
                    size: 24,
                    // Add custom styles
                    styles: {
                      display: "inline",
                      margin: "0",
                      "margin-top": "1px",
                      position: "relative",
                      top: "5px",
                      width: "25px",
                    },
                  },
                },
              ],
            },
          },
          `gatsby-remark-prismjs`,
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
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `thefrugaldev`,
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
