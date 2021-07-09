  
const { DataSource } = require('apollo-datasource');
const DataLoader = require('dataloader');
const { ApolloError } = require('apollo-server-express');

module.exports = class CustomerDataSource extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {
        this.context = config.context;
        this.client = config.context.sqlClient;
    }

    customersLoader = new DataLoader(async (ids) => {
        const customers = await this.findCustomersByBulk(ids)
        //console.log('customers:', customers)

        return ids.map((id) => {
            return customers.find( customer => customer.id === id)
        })
    })

    async findCustomersByBulk(ids) {
        const result = await this.client.query('SELECT * FROM main.customer WHERE id = ANY($1)',[ids])
        return result.rows
    }

    async getCustomers() {
        try {
            const customers = await this.client.query('SELECT * FROM main.customer');
            return customers.rows;
        } catch (error) {
            console.log(error)
        }
    }

    async getCustomerByIdLoader(id) {
        return await this.customersLoader.load(id)
    }

    async getCustomerById(id) {
        try {
            const customer = await this.client.query('SELECT * FROM main."customer" WHERE id=$1', [id])
            if (customer.rowCount === 0) {
                return new ApolloError('Aucun utilisateur trouvé avec cet identifiant', 'NO_USER_FOUND')
            } else {
                return customer.rows[0];
            }
        } catch (error) {
            console.error(error)
        }
    }

    async getCustomerByMail(email) {
        try {
            const customer = await this.client.query('SELECT * FROM main."customer" WHERE email=$1', [email])
            if (customer.rowCount === 0) {
                return new ApolloError('Aucun utilisateur trouvé avec cet identifiant', 'NO_USER_FOUND')
            } else {
                return customer.rows[0];
            }
        } catch (error) {
            console.error(error)
        }
    }

    async getCustomersByCoachId(coachId) {
        try {
            const customers = await this.client.query('SELECT * FROM main."customer" WHERE coach_id=$1',[coachId])
            if (customers.rowCount === 0) {
                return new ApolloError('Aucun utilisateur trouvé avec associé a ce coach', 'NO_CUSTOMER_FOUND')
            } else {
                return customers.rows;
            }
        } catch (error) {
            console.error(error)
        }
    }

    async insertCustomer(inseredCustomer) {
        try {
            const customerKeys = Object.keys(inseredCustomer);
            let index = 1;
            let values = [];
            let placeholder = [];

            for (let key of customerKeys) {

                values.push(inseredCustomer[key]);

                placeholder.push('$'+index);
                index++
            }

            const customer = await this.client.query(`INSERT INTO main.customer (${customerKeys.join(',')}) VALUES (${placeholder.join(',')}) RETURNING id`,values);

            //console.log("*",prospect.rows[0]);
            return customer.rows[0];
        
        } catch (error) {
            console.log(error)
        }
    }

    async insertCoachId(data) {
        try {
            const insertion = await this.client.query('UPDATE main.customer SET coach_id=$1 WHERE email=$2 RETURNING id',[data.coach_id, data.email])
            return insertion.rows[0];

        } catch (error) {
            console.log(error)
        }
    }
    
    async updateCustomer(data) {
        try {
            const customerKeys = Object.keys(data);
            let index = 1;
            let sets = [];
            let values = [];
            let placeholder = [];

            for (let key of customerKeys) {

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

            const customer = await this.client.query(`UPDATE main.customer SET ${sets.join(',')} WHERE id = $${index} RETURNING id`,values);

            //console.log("*",prospect.rows[0]);
            return customer.rows[0];
        
        } catch (error) {
            console.log(error)
        }
    }

    //gestion Background

    async insertBackground(data) {
        try {
            const background = await this.client.query('INSERT INTO main.background (date, customer_id, product_id) VALUES ($1,$2,$3) RETURNING id', [data.date, data.customer_id, data.product_id])
            return background.rows[0];
        } catch (error) {
            console.log(error)
        }
    }

    async getBackgroundByCustomer(id) {
        try {
            const background = await this.client.query('SELECT * FROM main.background WHERE customer_id=$1', [id])
            return background.rows;
        } catch (error) {
            console.log(error)
        }
    }

}