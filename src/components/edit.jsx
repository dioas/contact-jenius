import React from 'react';
import { ApiPost } from '../utilAjax.js'

export default class EditContact extends React.Component {
  contactData (data) {
    this.props.contactEditId(data)
  }
  handleClick(i) {
    ApiPost('editContact').doRequest({params: {id: i}})
    .on('done', (res) => {
      this.contactData(res.body.data)
    })
  }
  render() {
    return <button onClick={() => this.handleClick(this.props.idEdit)} className="btn-edit">Edit</button>
  }
}