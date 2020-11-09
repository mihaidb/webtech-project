import React from "react";
import DropboxChooser from "react-dropbox-chooser";
import { Container, Row, Col, Table } from "react-bootstrap";

class Main extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return (
      <>
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