  
const { DataSource } = require('apollo-datasource');
const DataLoader = require('dataloader');
const { ApolloError } = require('apollo-server-express');

module.exports = class ProspectDataSource extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {
        this.context = config.context;
        this.client = config.context.sqlClient;
    }

     prospectLoader = new DataLoader(async (ids) => {
        const prospects = await this.getProspectById(ids);
        return ids.map((id) => {
            if (prospects instanceof ApolloError) {
                return undefined
            } else {
                return prospects.find( prospect => prospect.id === id)
            }
        })
    })

    async getProspectById(prospectId) {
        try {
            const prospect = await this.client.query('SELECT * FROM main.prospect WHERE id=$1', [prospectId]);
            if (prospect.rowCount === 0) {
                return new ApolloError('Aucun utilisateur trouvé avec cet identifiant', 'NO_USER_FOUND')
            } else {
                return prospect.rows[0];
            }
        } catch (error) {
            console.trace(error);
        }
    }

    async getProspectByMail(prospectMail) {
        try {
            const prospect = await this.client.query('SELECT * FROM main.prospect WHERE email=$1', [prospectMail]);
            if (prospect.rowCount === 0) {
                return new ApolloError('Aucun utilisateur trouvé avec cet identifiant', 'NO_USER_FOUND')
            } else {
                return prospect.rows[0];
            }
        } catch (error) {
            
        }
    }

    async getProspects() {
        try {
            const prospects = await this.client.query('SELECT * FROM main.prospect');
            return prospects.rows;
        } catch (error) {
            console.log(error)
        }
    }

    async insertProspect(inseredProspect) {
        try {

            const prospect = await this.client.query('INSERT INTO main.prospect (email, firstname, lastname, age, phonenumber, date, objectif, experience, invest, sexe, seller_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id',[inseredProspect.email, inseredProspect.firstname, inseredProspect.lastname, inseredProspect.age, inseredProspect.phonenumber, inseredProspect.date, inseredProspect.objectif, inseredProspect.experience, inseredProspect.invest, inseredProspect.sexe, inseredProspect.seller_id]);
            return prospect.rows[0];
        
        } catch (error) {
            console.trace(error)
        }
    }

    async updateProspect(data) {
        try {
            const prospectKey = Object.keys(data);
            let index = 1;
            let sets = [];
            let values = [];
            let placeholder = [];

            for (let key of prospectKey) {

                if(key === 'id'){
                    continue;
                }

                values.push(data[key]);

                let prop = '"'+ key + '"';
                sets.push(`${prop} = $${index}`)

                placeholder.push('$'+index);
                index++
            }

            values.push(data.id);

            const prospect = await this.client.query(`UPDATE main.prospect SET ${sets.join(',')} WHERE id = $${index} RETURNING id`,values);

            //console.log("*",prospect.rows[0]);
            return prospect.rows[0];
        } catch (error) {
            console.trace(error)
        }
    }

    async deleteProspect(data) {
        try {
            const deleteTraking = await this.client.query('DELETE FROM main.traking WHERE prospect_id = $1', [data.id])
            const prospect = await this.client.query('DELETE FROM main.prospect WHERE id = $1 RETURNING id', [data.id])
            return prospect.rows[0];
        } catch (error) {
            console.trace(error)
        }
    }

}