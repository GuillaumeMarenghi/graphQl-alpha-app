const ProspectDataSource = require('./prospect');
const TrakingDataSource = require('./traking.js');
const CustomerDataSource = require('./customer');
const SaleDataSource = require('./sale.js');
const CoachDataSource = require('./coach');
const ProductDataSource = require('./product');
const ThursdayDataSource = require('./thursday');
const NoteDataSource = require('./note');
const SellerDataSource = require('./seller');

module.exports = {
    prospect: new ProspectDataSource(),
    traking: new TrakingDataSource(),
    customer: new CustomerDataSource(),
    sale: new SaleDataSource(),
    coach: new CoachDataSource(),
    product: new ProductDataSource(),
    thursday: new ThursdayDataSource(),
    note: new NoteDataSource(),
    seller: new SellerDataSource()
}