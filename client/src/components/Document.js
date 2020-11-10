import React from 'react'
import DocumentForm from './DocumentForm'
import DocumentStore from '../stores/DocumentStore'

class Document extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            company: this.props.item.company,
            type: this.props.item.type,
            series: this.props.item.series,
            documentDate: this.props.item.documentDate,
            isEditing: false
        }

        this.delete = () => {
            this.props.onDelete(this.props.item.id)
        }

        this.edit = () => {
            this.setState({
                isEditing: true
            })
        }

        this.editSave=(document)=>{
            this.store = new DocumentStore()
            this.store.putDocument(this.props.item.id,document)
            this.props.store.getDocuments()
            this.setState({
                isEditing:false
            })
        }

        this.hideForm=()=>{
            this.setState({
                isEditing:false
            })
        }
    }

    render() {
        const { item } = this.props

        if (this.state.isEditing) {
            return (
                <>
                    <DocumentForm onAdd={this.editSave} onHideForm={this.hideForm} item={item} />
                </>
            )
        } else {
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.company}</td>
                    <td>{item.type}</td>
                    <td>{item.series}</td>
                    <td>{item.documentDate}</td>
                    <td><a className="btn btn-info" title="Edit"><i className="fas fa-pencil-alt" onClick={this.edit}></i></a> <a className="btn btn-danger" title="Delete" onClick={this.delete}><i className="fas fa-trash-alt"></i></a> </td>
                </tr>
            )
        }
    }
} export default Document