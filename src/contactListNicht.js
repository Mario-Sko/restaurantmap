import React from 'react';
//import './contactList.css';
import Contact from './contact';

class ContactList extends React.Component {
  render() {
      let contacts = [];

      for (let contact of this.props.items) {
          contacts.push(<Contact item={contact}/>);
      }

    return <div>{contacts}</div>;
  }
}

export default ContactList;
