export type Episode = Readonly<{
  frontmatter: Readonly<{
    youtubeUrl: string
    title: string
    spotifyUrl: string
    slug: string
    shortDescription: string
    publicationDate: string
    audioUrl: string
  }>
  body: string
}>
