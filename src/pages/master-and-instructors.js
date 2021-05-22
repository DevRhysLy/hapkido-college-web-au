import React from 'react';
import { Link, graphql } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Call from '../components/Call';

const Team = props => {
  const team = props.data.team.edges;
  const { intro } = props.data;
  const introImageClasses = `intro-image ${intro.frontmatter.intro_image_absolute && 'intro-image-absolute'} ${intro.frontmatter.intro_image_hide_on_mobile && 'intro-image-hide-mobile'}`;

  return (
    <Layout bodyClass="page-teams">
      <SEO title="Master and Instructors" />

      <div className="intro">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-12 col-md-7 col-lg-6 order-2 order-md-1">
              <div dangerouslySetInnerHTML={{ __html: intro.html }} />
            </div>
            {intro.frontmatter.intro_image && (
              <div className="col-12 col-md-5 col-lg-6 order-1 order-md-2 position-relative">
                <img alt={intro.frontmatter.title} className={introImageClasses} src={intro.frontmatter.intro_image} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
        {team.map(edge => (
            <div key={edge.node.id} className="col-12 col-md-6 mb-2">
              <Link to={edge.node.fields.slug}>
              <div className="team team-summary team-summary-large">
                {edge.node.frontmatter.image && (
                  <div className="team-image">
                    <img alt={`photo of ${edge.node.frontmatter.title}`} className="img-fluid mb-2" src={edge.node.frontmatter.image} />
                  </div>
                )}
                <div className="team-meta">
                  <h2 className="team-name">{edge.node.frontmatter.title}</h2>
                  <p className="team-description">{edge.node.frontmatter.jobtitle}</p>
                  {edge.node.frontmatter.linkedin && (
                    <a target="_blank" href="{{ .Params.Linkedinurl }}">LinkedIn</a>
                  )}
                </div>
                <div className="team-content">
                  <p>{edge.node.excerpt}</p>
                </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

    </Layout>
  );
};

export const query = graphql`
  query TeamQuery {
    team: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/master-and-instructors\/.*/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            promoted
            image
            jobtitle
            linkedinurl
          }
        }
      }
    }
    intro: markdownRemark(fileAbsolutePath: {regex: "/(master-and-instructors.md)/"}) {
      html
      frontmatter {
        image
        intro_image
        intro_image_absolute
        intro_image_hide_on_mobile
        title
      }
    }
  }
`;

export default Team;
