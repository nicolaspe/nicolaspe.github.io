import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from 'gatsby'
import Content from "../components/content"
import Background from '../components/background'
import Footer from '../components/footer'

export default ( {data} ) => {
  const post = data.markdownRemark
  return (
    <>
      <Background
        cameraPositionX={-300}
        cameraPositionY={250}
        cameraPositionZ={1150}
      />
      <Content>
        <Helmet>
          <title>{ post.frontmatter.title }</title>
        </Helmet>

        <h1>{post.frontmatter.title}</h1>
        <main>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </main>
        <Footer />
      </Content>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
