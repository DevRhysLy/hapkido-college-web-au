import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Call from '../components/Call';

const Contact = ({ data }) => {
  const { title } = data.markdownRemark.frontmatter;
  const { html } = data.markdownRemark;

  function encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": event.target.getAttribute("name"),
        ...name
      })
    }).then(() => navigate("/thank-you/")).catch(error => alert(error))
  }
  return (
    <Layout bodyClass="page-default-single">
      <div className="container pb-6 pt-6 pt-md-10 pb-md-10">
        <div className="row justify-content-start">
          <div className="col-12 col-md-8">
            <h1 className="title">{title}</h1>
            <div className="content mt-4" dangerouslySetInnerHTML={{ __html: html }} />
            <form
              name="contact-form"
              method="post"
              data-netlify="true"
              data-netlify-recaptcha="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="contact-form" value="contact-form" />
              <label>Name: <input name="name" placeholder="John Citizen" type="text" /></label>
              <label>Email: <input name="email" placeholder="name@name.com" type="email" /></label>
              <label>Studio: 
              <select>
                <option value="Croydon">Croydon</option>
                <option value="Ermington West">Ermington West</option>
                <option selected value="Belrose">Belrose</option>
                <option value="West Hoxton">West Hoxton</option>
                <option selected value="Yarrawarrah">Yarrawarrah</option>
              </select>
              </label>
              <label>Enquiry: <textarea name="message" /></label>
              <div data-netlify-recaptcha="true"></div>
              <button>Send</button>
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
