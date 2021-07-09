  
const { DataSource } = require('apollo-datasource');
const DataLoader = require('dataloader');
const { ApolloError } = require('apollo-server-express');

module.exports = class CoachDataSource extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {
        this.context = config.context;
        this.client = config.context.sqlClient;
    }

    async getCoachs(){
        try {
            const coachs = await this.client.query('SELECT * FROM main.coach');
            return coachs.rows
        } catch (error) {
            console.error(error)
        }
    }

    async getCoachById(id){
        try {
            const customer = await this.client.query('SELECT * FROM main."coach" WHERE id=$1', [id])
             if (customer.rowCount === 0) {
                return new ApolloError('Aucun utilisateur trouvé avec cet identifiant', 'NO_USER_FOUND')
            } else {
                return customer.rows[0];
            }
        } catch (error) {
            console.error(error)
        }
    }

    async getCoachByMail(email) {
        try {
            const customer = await this.client.query('SELECT * FROM main."coach" WHERE email=$1', [email])
/*             if (customer.rowCount === 0) {
                return new ApolloError('Aucun utilisateur trouvé avec cet identifiant', 'NO_USER_FOUND')
            } else {
                return customer.rows[0];
            } */
            return customer.rows[0];
        } catch (error) {
            console.error(error)
        }
    }

    async updateCoachPassword(data) {
        try {
            const coach = await this.client.query('UPDATE main."coach" SET password=$1 WHERE email=$2 RETURNING id',[data.password, data.email])
            if (coach.rowCount === 0) {
                return new ApolloError('Aucun utilisateur trouvé avec cet identifiant', 'NO_USER_FOUND')
            } else {
                return coach.rows[0];
            }
        } catch (error) {
            
        }
    }

    async insertCoach(data){
        try {
            const coach = await this.client.query('INSERT INTO main.coach (firstname, lastname, email, tel, activ, start_date, end_date) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id',[data.firstname, data.lastname, data.email, data.tel, data.activ, data.start_date, data.end_date])
            return coach.rows[0];
        } catch (error) {
            console.error(error)
        }
    }

}