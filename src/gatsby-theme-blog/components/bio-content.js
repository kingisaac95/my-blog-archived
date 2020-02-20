import React, { Fragment } from "react"
import { Styled } from "theme-ui"

export default () => (
  <Fragment>
    Personal blog by
    {` `}
    <Styled.a
      href="http://twitter.com/kingisaac95"
      target="_blank"
      rel="noopener noreferrer"
    >
      Kingdom Orjiewuru
    </Styled.a>
    .
    <br />I learn, and then I write.
  </Fragment>
)
