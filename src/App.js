import React, { Component } from 'react';
import './App.css';
import { ApiPost } from './utilAjax.js'
import AddContact from './components/AddContact.jsx'
import EditContactForm from './components/editForm.jsx'
import ContactList from './components/listContact.jsx'

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      contact: [],
      showAdd: true,
      showEdit: false,
      dataEdit: {}
    };
}
  componentWillMount () {
    this.getContact()
  }
  editData (data) {
    if (this.state.showEdit === true){
      this.setState({showEdit: false})
    } 
    this.setState({dataEdit: data, showAdd: false, showEdit: true})
  }
  resetVal () {
    this.setState({showAdd: true, showEdit: false})
  }
  getContact () {
    ApiPost('getContact').doRequest()
     .on('done', res => {
       this.setState({contact: res.body.data})
     })
  }
  render() {
    const dataContact = this.state.contact
    const setContact = this.state.dataEdit
    return (
      <div className="App">
        {this.state.showAdd ? <AddContact  getContact={this.getContact.bind(this)}/> : null}
        {this.state.showEdit ?  <EditContactForm getContact={this.getContact.bind(this)} setContact={setContact} backValue={this.resetVal.bind(this)}/> : null}
        <div><h2>List Contact</h2></div>
        <table className="table-result">
        <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Photo Profile</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
            <ContactList contactEditData={this.editData.bind(this)} dataContact={dataContact} />
        </tbody>
        </table>
      </div>
    );
  }
}

export default App;
