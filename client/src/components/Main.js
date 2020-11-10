import React from "react";
import DropboxChooser from "react-dropbox-chooser";
import { Container, Row, Col, Table } from "react-bootstrap";
import DocumentStore from '../stores/DocumentStore'
import Document from './Document'

class Main extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return (
      <><nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href=""><i class="fas fa-plus"></i> Add Document</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="" title="Choose document from DropBox"><i class="fab fa-dropbox"></i> Dropbox</a>
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
                  </tr>
                </thead>
                <tbody>
                  {
                  this.state.documents.map(e=><Document key={e.id} item={e} />)
                  }
                  <tr>
                    <td>1</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        <DropboxChooser
          appKey={"4chypodz0vnq8m4"} //---> Dropbox API key
          success={(files) => this.onSuccess(files)}
          cancel={() => this.onCancel()}
          multiselect={true}
          extensions={[".pdf", ".txt"]}
        >
          <div className="dropbox-button btn">Dropbox choose</div>
        </DropboxChooser>
      </>
    );
  }
}

export default Main;