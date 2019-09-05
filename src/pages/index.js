import React from "react"
import { Helmet } from "react-helmet"
import { Link, graphql } from 'gatsby'
import Content from "../components/content"
import Background from '../components/background'

export default ( {data} ) => {
  return (
    <>
      <Background />
      <Content>
        <Helmet>
          <title>{ data.site.siteMetadata.title }</title>
        </Helmet>

        <section className="project_list"><ul>
            { data.allMarkdownRemark.edges.map( ({node}) => (
              <li key={node.id} id={node.frontmatter.title}><Link to={node.fields.slug} alt={node.excerpt}>
                {node.frontmatter.title}{" "}
              </Link></li>
            ) ) }
        </ul></section>
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
    allMarkdownRemark (
      filter: {frontmatter: {display: {eq: true}}},
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            display
            date
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
