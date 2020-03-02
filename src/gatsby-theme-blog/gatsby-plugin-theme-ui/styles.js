import merge from "deepmerge"
import defaultThemeStyles from "gatsby-theme-blog/src/gatsby-plugin-theme-ui/styles"

const lightBlue = `#48afaa`

export default merge(defaultThemeStyles, {
    blockquote: {
        borderLeft: `2px solid ${lightBlue}`,
        paddingLeft: `1rem`,
        marginLeft: `0`
    },
})
