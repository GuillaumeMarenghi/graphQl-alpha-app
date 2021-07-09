  
const { DataSource } = require('apollo-datasource');
const DataLoader = require('dataloader');
const { ApolloError } = require('apollo-server-express');

module.exports = class SellerDataSource extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {
        this.context = config.context;
        this.client = config.context.sqlClient;
    }

    async getSellers(){
        try {
            const coachs = await this.client.query('SELECT * FROM main.seller');
            return coachs.rows
        } catch (error) {
            console.error(error)
        }
    }

    async insertSeller(data){
        try {
            let sellerKeys = Object.keys(data);
            sellerKeys = [...sellerKeys, 'activ', 'start_date'];
            let index = 1;
            let values = [];
            let placeholder = [];

            for (let key of sellerKeys) {

                if(key === 'activ' || key === 'start_date') {
                    continue;
                }

                values.push(data[key]);

                placeholder.push('$'+index);
                index++
            }

            values = [...values, true, new Date()];
            placeholder = [...placeholder, '$'+(index), '$'+(index + 1)];

            const seller = await this.client.query(`INSERT INTO main.seller (${sellerKeys.join(',')}) VALUES (${placeholder.join(',')}) RETURNING id`,values);

            //console.log("*",prospect.rows[0]);
            return seller.rows[0];
        } catch (error) {
            console.error(error)
        }
    }

    async changeSellerStatus(data){
        try {
            const update = await this.client.query(`UPDATE main.seller SET activ = $1 WHERE id = $2 RETURNING id`,[ data.activ, data.id ]);
            return update.rows[0];
        } catch (error) {
            console.error(error)
        }
    }

}