import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { format } from "date-fns";

class DocumentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      company: this.props.item ? this.props.item.company : '',
      type: this.props.item ? this.props.item.type : "invoice",
      series: this.props.item ? this.props.item.series : '',
      documentDate: this.props.item ? this.props.item.documentDate : new Date()
    }

    this.hideForm = () => {
      this.props.onHideForm();
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value,
      })
    }

    this.add = () => {
      this.props.onAdd({
        company: this.state.company,
        type: this.state.type,
        series: this.state.series,
        documentDate: this.documentDate,
      })
    }

    this.dateChange = (e) => {
      
      this.documentDate = format(e, 'yyyy-mm-dd')
    }

  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Company name"
                  name="company"
                  onChange={this.handleChange}
                  value={this.state.company}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Document type</Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  onChange={this.handleChange}
                  value={this.state.type}
                >
                  <option>invoice</option>
                  <option>contract</option>
                  <option>other</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Document series</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Series"
                  name="series"
                  onChange={this.handleChange}
                  value={this.state.series}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Document date</Form.Label>
                <DatePicker dateFormat="yyyy-mm-dd" onChange={this.dateChange} name="documentDate" value={this.state.documentDate} />
              </Form.Group>

              <Form.Row>
                <Button variant="primary" type="submit" onClick={this.add}>
                  Save
                </Button>
                <Button variant="danger" type="button" onClick={this.hideForm}>
                  Cancel
                </Button>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default DocumentForm;