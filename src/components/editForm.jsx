import React from 'react';
import { ApiPost } from '../utilAjax.js'

export default class EditContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        age: '',
        photo: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    if (this.props.setContact) {
      this.setState({
        firstName: this.props.setContact.firstName,
        lastName: this.props.setContact.lastName,
        age: this.props.setContact.age,
        photo: this.props.setContact.photo
      })
    }
  }

  handleChange(keyword, event) {
    const saveValue = this.state
    saveValue[keyword] = event.target.value
    this.setState({saveValue})
  }

  handleSubmit(event) {
    var _this = this
    // alert('A name was submitted: ' + this.state.value);
    ApiPost('submitEdit').doRequest({body: {firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age, photo: this.state.photo},params: {id: this.props.setContact.id}})
    .on('done', () => {
      _this.props.getContact()
      _this.props.backValue()
    })
    .on('fail', (err) => {
      alert(err.body.message)
    })
    event.preventDefault();
  }

  render() {
    return (
      <form className="form-edit" onSubmit={this.handleSubmit}>
      <h2>Edit Contact</h2>
      <table className="table">
        <tbody>
          <tr>
            <td>First Name</td>
            <td><input type="text" value={this.state.firstName} onChange={this.handleChange.bind(this,'firstName')} /></td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td><input type="text" value={this.state.lastName} onChange={this.handleChange.bind(this,'lastName')} /></td>
          </tr>
          <tr>
            <td>Age</td>
            <td><input type="number" value={this.state.age} onChange={this.handleChange.bind(this,'age')} /></td>
          </tr>
          <tr>
            <td>Photo Url</td>
            <td><input type="text" value={this.state.photo} onChange={this.handleChange.bind(this, 'photo')} /></td>
          </tr>
          <tr>
          <td></td><td><input type="submit" value="Submit" /></td>
          </tr>
        </tbody>
      </table>
      </form>
    )
  }
}