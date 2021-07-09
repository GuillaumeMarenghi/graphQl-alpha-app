const { DataSource } = require('apollo-datasource');
const DataLoader = require('dataloader');
const { ApolloError } = require('apollo-server-express');

module.exports = class SaleDataSource extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {
        this.context = config.context;
        this.client = config.context.sqlClient;
    }

    saleByCustomerLoader = new DataLoader(async (ids) => {

        const sales = await this.getsaleByBulkCustomerId(ids);
        return ids.map((id) => {
            if (sales instanceof ApolloError) {

                return undefined
            } else {
                //console.log('sales:', sales)
                return sales.find(sale => sale.customer_id === id)

            }
        })
    })

    async getsaleByBulkCustomerId(ids) {
        const result = await this.client.query('SELECT * FROM main.sale WHERE customer_id = ANY($1)', [ids])
        //console.log('result:', result)
        return result.rows
    }

    async getSaleByCustomerIdLoader(id) {
        return await this.saleByCustomerLoader.load(id)
    }

    async getSaleByCustomerId(customer_id) {
        try {
            const sale = await this.client.query('SELECT * FROM main.sale WHERE customer_id=$1', [customer_id]);
            if (sale.rowCount === 0) {
                return new ApolloError('Aucun utilisateur trouvé avec cet identifiant', 'NO_USER_FOUND')
            } else {
                return sale.rows[0];
            }
        } catch (error) {
            console.trace(error);
        }
    }

    async getSaleByProcessorCusId(processor_cus_id) {
        try {
            const sale = await this.client.query('SELECT * FROM main.sale WHERE processor_cus_id=$1', [processor_cus_id]);
            if (sale.rowCount === 0) {
                return new ApolloError('Aucun utilisateur trouvé avec cet identifiant', 'NO_USER_FOUND')
            } else {
                return sale.rows[0];
            }
        } catch (error) {
            console.trace(error);
        }
    }

    async insertSale(inseredSale) {
        try {
            console.log("datasource insertSale")
            const sale = await this.client.query('INSERT INTO main.sale (type, processor, processor_cus_id, amount_up_front, amount_total, next_term, number_of_payments, detail, current_product_start_date, customer_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id', [inseredSale.type, inseredSale.processor, inseredSale.processor_cus_id, inseredSale.amount_up_front, inseredSale.amount_total, inseredSale.next_term, inseredSale.number_of_payments, inseredSale.detail, inseredSale.current_product_start_date, inseredSale.customer_id]);
            console.log("*", sale.rows[0]);
            return sale.rows[0];

        } catch (error) {
            console.trace(error)
        }
    }

    async updateSale(data) {
        try {
            const saleKeys = Object.keys(data);
            let index = 1;
            let sets = [];
            let values = [];
            let placeholder = [];

            for (let key of saleKeys) {

                if (key === 'customer_id') {
                    continue;
                }

                values.push(data[key]);

                let prop = '"' + key + '"';
                sets.push(`${prop} = $${index}`)

                placeholder.push('$' + index);
                index++
            }

            values.push(data.customer_id);

            const sale = await this.client.query(`UPDATE main.sale SET ${sets.join(',')} WHERE customer_id = $${index} RETURNING id`, values);

            this.saleByCustomerLoader.clear(data.customer_id)
            //console.log("*",prospect.rows[0]);
            return sale.rows[0];
        } catch (error) {
            console.trace(error)
        }
    }

}