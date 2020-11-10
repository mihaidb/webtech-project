import React from 'react'

class Document extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            company: this.props.item.company,
            type: this.props.item.type,
            series: this.props.item.series,
            documentDate: this.props.item.documentDate,
        }

        this.delete=()=>{
            this.props.onDelete(this.props.item.id)
        }
    }

    render() {
        const { item } = this.props

        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.company}</td>
                <td>{item.type}</td>
                <td>{item.series}</td>
                <td>{item.documentDate}</td>
                <td><a className="btn btn-info" title="Edit"><i className="fas fa-pencil-alt"></i></a> <a className="btn btn-danger" title="Delete" onClick={this.delete}><i className="fas fa-trash-alt"></i></a> </td>
            </tr>
        )
    }
} export default Document