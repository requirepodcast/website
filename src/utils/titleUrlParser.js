export const titleUrlParser = title =>
  encodeURI(
    title
      .split(" - ")[1]
      .toLowerCase()
      .replace("ó", "o")
      .replace("ł", "l")
      .replace("ń", "n")
      .replace("ż", "z")
      .replace("ź", "z")
      .replace("ć", "c")
      .replace("ę", "e")
      .replace("ś", "s")
      .replace(/ /g, "-")
  )
