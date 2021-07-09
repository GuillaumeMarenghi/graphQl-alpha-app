const { DataSource } = require('apollo-datasource');
const DataLoader = require('dataloader');
const { ApolloError } = require('apollo-server-express');

module.exports = class ProductDataSource extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {
        this.context = config.context;
        this.client = config.context.sqlClient;
    }

    productLoader = new DataLoader(async (ids) => {
        const products = await this.findProductByBulk(ids);

        return ids.map((id) => {
            return products.find (product => product.id === id)
        })
    })

    async findProductByBulk(ids) {
        const result = await this.client.query('SELECT * FROM main.product WHERE id = ANY($1)',[ids])
        return result.rows
    }

    async getProductByIdLoader(product_id){
        return await this.productLoader.load(product_id)
    }


    async getProductById(product_id) {
        try {
            const prospect = await this.client.query('SELECT * FROM main.product WHERE id=$1', [product_id]);
                return prospect.rows[0];
        } catch (error) {
            console.trace(error);
        }
    }

}