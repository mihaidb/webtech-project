import { EventEmitter } from 'fbemitter'
import axios from 'axios'
const SERVER = 'http://localhost:8080'

class DocumentStore{
    constructor(){
        this.documents=[]
        this.emitter=new EventEmitter()
    }

    async getDocuments(){
        try {
            const response=await axios.get(`${SERVER}/documents`)
            this.documents=response.data
            this.emitter.emit('GET_DOCUMENTS_SUCCESS')
        } catch (error) {
            this.emitter.emit('GET_DOCUMENTS_ERROR')
        }
    }

    async addDocument(document){
        try {
            await axios.post(`${SERVER}/documents`,document)
            this.getDocuments()
        } catch (error) {
            this.emitter.emit('ADD_DOCUMENT_ERR')
        }
    }
}
export default DocumentStore