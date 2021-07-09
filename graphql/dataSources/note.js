const { DataSource } = require('apollo-datasource');
const DataLoader = require('dataloader');
const { ApolloError } = require('apollo-server-express');

module.exports = class NoteDataSource extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {
        this.context = config.context;
        this.client = config.context.sqlClient;
    }
    
    getNotesByCustomerLoader = new DataLoader(async (ids) => {
        const notes = await this.getNotesByBulkCustomerId(ids);
        return ids.map((id) => {
            if (notes instanceof ApolloError) {
                return undefined;
            } else {
                return notes.filter( note => note.customer_id === id)
            }
        })
    })

    async getNotesByBulkCustomerId(ids) {
        const result = await this.client.query('SELECT * FROM main.note WHERE customer_id = ANY($1)',[ids])
        return result.rows
    }

    async getNotes(id) {
        return await this.getNotesByCustomerLoader.load(id)
    }

    async insertNote(inseredNote) {
        try {
            const note = await this.client.query('INSERT INTO main.note (content, coach_id, customer_id) VALUES ($1,$2,$3) RETURNING id',[inseredNote.content, inseredNote.coach_id, inseredNote.customer_id]);
            return note.rows[0];
        
        } catch (error) {
            console.trace(error)
        }
    }

}