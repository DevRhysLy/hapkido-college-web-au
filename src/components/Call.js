import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const Call = props => {
  const data = useStaticQuery(graphql`
    query ContactQuery {
        contactJson {
          phone
          email
          contact_button_link
        }
    }
   `);
  return (
    <div className="call">
      <div className="call-box-top">
        <strong>
          Please feel free to contact us for any enquiries
        </strong>
      </div>
      {props.showButton && (
        <div className="call-box-bottom">
          <a href={data.contactJson.contact_button_link} className="button">Contact</a>
        </div>
      )}
    </div>
  );
};

export default Call;
