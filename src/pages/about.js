import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from 'gatsby'
import Content from "../components/content"
import Background from '../components/background'

import nico_pic from "./npe_bw.jpg"
import nico_sty from "./npe_style.jpg"



export default ( {data} ) => {
  return (
    <>
    <Background
      cameraPositionX={-300}
      cameraPositionY={250}
      cameraPositionZ={1150}
    />
    <Content>
        <Helmet>
          <title>{ "About" }</title>
        </Helmet>

        <h1>About me</h1>

        <main>
          <p className="about_cont">Nicolás Escarpentier is a non-binary new media artivist from Santiago, Chile. Their works combine diverse emerging technologies to create audiovisual experiences that augment and create non-conventional forms of expression and activism tools.</p>

          <img src={nico_pic} className="about_cont about_pic" width="40%" alt="profile picture"></img>

          <p className="about_cont">They have performed and showcased their work at ISSUE Project Room, Pioneer Works, NYC Media Lab and the World Maker Faire NY. </p>

          <p className="about_cont">Nicolás is currently a master’s candidate at <a href="https://tisch.nyu.edu/itp">NYU’s Interactive Telecommunications Program</a> and board member at the <a href="http://unglitchthe.net/">activist co-op, Unglitch.</a> </p>

          <br/>
          <a href="https://drive.google.com/file/d/1slFtjswGtGnyAEmall3oDxSJ4afbUsaZ/view?usp=sharing">Download my CV here</a>
        </main>

      </Content>
    </>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
