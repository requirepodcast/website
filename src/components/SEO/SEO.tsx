import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import icon from "../../images/require_mark_transparent.svg"

type SEOProps = {
  description: string
  lang: string
  meta: React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>[]
  title: string
}

function SEO({ description = "", lang = "pl", meta = [], title = "" }: SEOProps) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      link={[
        { rel: "icon", href: icon },
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "RSS",
          href: "/feed.xml",
        },
      ]}
      title={title}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          name: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: "/static/logo-twitter.png",
        },
        {
          property: `og:image`,
          content: "/static/logo.png",
        },
        {
          property: "og:locale",
          content: "pl_PL",
        },
        {
          name: "google-site-verification",
          content: "I-h8BzXpQxJaJ7wuYP-Yaku4chRaDrzRSQLboutsrto",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover",
        },
        ...meta,
      ]}
    />
  )
}

export default SEO
