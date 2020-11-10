import React from "react";
import DropboxChooser from "react-dropbox-chooser";
import { Container, Row, Col, Table } from "react-bootstrap";
import DocumentStore from '../stores/DocumentStore'
import Document from './Document'
import DocumentForm from './DocumentForm'

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      documents: [],
      isEditing: false
    }

    this.store = new DocumentStore()

    this.showForm = () => {
      this.setState({
        isEditing: true
      })
    }

    this.hideForm = () => {
      this.setState({
        isEditing: false
      })
    }

    this.add = (document) => {
      console.log(document)

      this.store.addDocument(document)
    }

    this.dropboxSuccess = (files) => {
      console.log(files)
    }

    this.dropboxCancel = () => {
      console.log('cancel')
    }
  }

  componentDidMount() {
    this.store.emitter.addListener('GET_DOCUMENTS_SUCCESS', () => {
      this.setState({
        documents: this.store.documents
      })
    })

    this.store.getDocuments()
  }

  render() {
    if (this.state.isEditing === false) {
      return (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" onClick={this.showForm}><i className="fas fa-plus"></i> Add Document</a>
                </li>
                <li className="nav-item">
                  <DropboxChooser
                    appKey={"0c6o77qominpwx3"}
                    success={(files) => this.dropboxSuccess(files)}
                    cancel={() => this.dropboxCancel()}
                    multiselect={true}
                    linkType="preview"
                    extensions={[".pdf"]}
                    ><div className="btn btn-info"><i className="fab fa-dropbox"></i> Dropbox</div>
                  </DropboxChooser>
                </li>
              </ul>
            </div>
          </nav>
          <br /><br />
          <Container>
            <Row>
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Company</th>
                      <th>Document</th>
                      <th>Series</th>
                      <th>Document Date</th>
                      <th><i className="fas fa-terminal"></i></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.documents.map(e => <Document key={e.id} item={e} />)
                    }
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </>
      )
    } else {
      return (
        <>
          <DocumentForm onAdd={this.add} onHideForm={this.hideForm} />
        </>
      )
    }
  }
}

export default Main;
