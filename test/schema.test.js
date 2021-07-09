const chai = require('chai');
let expect = chai.expect;
let should = chai.should();

const schema = require('../graphql/schema')

let types = [];
schema.definitions.forEach(elm => {
    types = [...types, elm.name.value]
})


describe('Test Static Schema', () => {
    
    it('schema should contain types', () => {
        expect(types).that.includes('Prospect')
        expect(types).that.includes('Traking')
        expect(types).that.includes('Product')
        expect(types).that.includes('Coach')
        expect(types).that.includes('Seller')
        expect(types).that.includes('Customer')
        expect(types).that.includes('Sale')
        expect(types).that.includes('Background')
        expect(types).that.includes('Thursday')
        expect(types).that.includes('Note')
        expect(types).that.includes('Subscription')
        expect(types).that.includes('ThursdayPdc')
        expect(types).that.includes('ThursdaySalle')
    })
})