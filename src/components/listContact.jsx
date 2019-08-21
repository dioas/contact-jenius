import React from 'react';
import DeleteBtn from './delete.jsx'
import EditContact from './edit.jsx'
export default class ContactList extends React.Component {
  contactEdit (data) {
    this.props.contactEditData(data)
  }
  NumberList (data) {
    var listItems = data.map((number) =>
      <tr id={number.id} key={number.id.toString()} className="get-contact">
      <td>{number.firstName}</td>
      <td>{number.lastName}</td>
      <td>{number.age}</td>
      <td><img src={number.photo}></img></td>
      <td>
        <DeleteBtn idDelete={number.id}/>
        <EditContact contactEditId={this.contactEdit.bind(this)} idEdit={number.id} />
      </td>
      </tr>
      )
    return listItems
  }
  render() {
    const ListContact = this.NumberList(this.props.dataContact)
    return ListContact
  }
}