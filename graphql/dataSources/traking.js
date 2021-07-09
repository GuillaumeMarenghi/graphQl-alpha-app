const { DataSource } = require('apollo-datasource');
const DataLoader = require('dataloader');
const { ApolloError } = require('apollo-server-express');

module.exports = class TrakingDataSource extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {
        this.context = config.context;
        this.client = config.context.sqlClient;
    }

    trakingLoader = new DataLoader(async (ids) => {
        const trakings = await this.findTrakingByProspect(ids);

        return ids.map((id) => {
            return trakings.filter(traking => traking.prospect_id === id);
        })
    })

    async findTrakingByProspect(ids) {
        const result = await this.client.query('SELECT * FROM main.traking WHERE prospect_id = ANY($1)', [ids])
        return result.rows
    }

    async findTrakingByProspectLoader(id) {
        return await this.trakingLoader.load(id)
    }


    async getAllTraking() {
        try {
            const trakings = await this.client.query('SELECT * FROM main.traking');
            return trakings.rows;
        } catch (error) {
            console.trace(error)
        }
    }

    async getProspectTraking(prospectID) {
        try {
            const traking = await this.client.query('SELECT * FROM main.traking WHERE prospect_id=$1', [prospectID]);
            return traking.rows[0];
        } catch (error) {
            console.error(error)
        }
    }

    async getCustomerTraking(customerId) {
        try {
            const traking = await this.client.query('SELECT * FROM main.traking WHERE customer_id=$1', [customerId]);
            return traking.rows[0];
        } catch (error) {
            console.error(error)
        }
    }

    async insertTraking(inseredTraking) {
        try {
            const traking = await this.client.query('INSERT INTO main.traking (ab_origine, ab_traffic, ab_campagne, ab_contenu, ab_variation, ct_origine, ct_traffic, ct_campagne, ct_contenu, ct_variation, clic, form, split, test, split_test, prospect_id, customer_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING ID', [inseredTraking.ab_origine, inseredTraking.ab_traffic, inseredTraking.ab_campagne, inseredTraking.ab_contenu, inseredTraking.ab_variation, inseredTraking.ct_origine, inseredTraking.ct_traffic, inseredTraking.ct_campagne, inseredTraking.ct_contenu, inseredTraking.ct_variation, inseredTraking.clic, inseredTraking.form, inseredTraking.split, inseredTraking.test, inseredTraking.split_test, inseredTraking.prospect_id, inseredTraking.customer_id]);
            this.trakingLoader.clear(inseredTraking.customer_id);
            this.trakingLoader.clear(inseredTraking.prospect_id);
            return traking.rows[0];
        } catch (error) {
            console.log("datasources error", error)
        }
    }
    
    async updateTraking(newTracking) {
        try {
            const trakingKeys = Object.keys(newTracking);
            let index = 1;
            let sets = [];
            let values = [];

            for (let key of trakingKeys) {

                if(key === 'id'){
                    continue;
                }

                values.push(newTracking[key]);

                let prop = '"'+ key + '"';
                sets.push(`${prop} = $${index}`)
                index++
            }
            values.push(newTracking.id);
        
            const traking = await this.client.query(`UPDATE main.traking SET ${sets.join(',')} WHERE id = $${index} RETURNING id, date;`,values);
            this.trakingLoader.clear(newTracking.prospect_id);
            return traking.rows[0];
        }
        catch(error) {
            console.log(error)
        }
    }

    async getTrakingById(id) {
        try {
            const traking = await this.client.query('SELECT * FROM main.traking WHERE id=$1', [id]);
            if (traking.rowCount === 0) {
                return new ApolloError('Aucun utilisateur trouvé avec cet identifiant', 'NO_USER_FOUND')
            } else {
                return traking.rows[0];
            }
        } catch (error) {
            console.trace(error);
        }
    }

}