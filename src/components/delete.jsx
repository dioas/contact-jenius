import React from 'react';
import { ApiPost } from '../utilAjax.js'

export default class DeleteBtn extends React.Component {
  handleClick(i) {
    ApiPost('deleteContact').doRequest({params: {id: i}})
    .on('done', () => {
      document.getElementById(i).remove()
    })
  }
  render() {
    return <button onClick={() => this.handleClick(this.props.idDelete)} className="btn-delete">Delete</button>
  }
}