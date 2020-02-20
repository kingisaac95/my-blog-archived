import merge from "deepmerge"
import defaultThemeColors from "gatsby-theme-blog/src/gatsby-plugin-theme-ui/colors"

const lightBlue = `#48afaa`
const blueGray = `#282c35`
const highlightColor = `#737c9933`
const white = `#FFFFFF`

export default merge(defaultThemeColors, {
  text: blueGray,
  primary: lightBlue,
  heading: blueGray,
  modes: {
    dark: {
      background: blueGray,
      primary: lightBlue,
      highlight: highlightColor,
      text: white,
    },
  },
})
