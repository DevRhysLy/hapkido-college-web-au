import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Call from '../components/Call';

const Contact = ({ data }) => {
  const { title } = data.markdownRemark.frontmatter;
  const { html } = data.markdownRemark;
  return (
    <Layout bodyClass="page-default-single">
      <div className="container pb-6 pt-6 pt-md-10 pb-md-10">
        <div className="row justify-content-start">
          <div className="col-12 col-md-8">
            <h1 className="title">{title}</h1>
            <div className="content mt-4" dangerouslySetInnerHTML={{ __html: html }} />
            <form name="contact" method="POST" data-netlify="true">
              <p>
                <label className="form-control">Your Name: <input type="text" name="name" /></label>
              </p>
              <p>
                <label className="custom-control-label">Your Email: <input type="email" name="email" /></label>
              </p>
              <p>
                <label className="custom-control-label">Closest Studio: <select name="Closest Studio" multiple>
                  <option value="Croydon">Croydon</option>
                  <option value="Ermington West">Ermington West</option>
                  <option value="Belrose">Belrose</option>
                  <option value="West Hoxton">West Hoxton</option>
                  <option value="Yarrawarrah">Yarrawarrah</option>
                </select></label>
              </p>
              <p>
                <label>Message: <textarea name="message"></textarea></label>
              </p>
              <div data-netlify-recaptha="true">
              </div>
              <p>
                <button className="btn" type="submit">Send</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        path
      }
      fields {
        slug
      }
      html
    }
  }
`;

export default Contact;
