const ProductsModel = require('../data/migrations/products');

module.exports = class Products {
  constructor() {}

  static add(product) {
    console.log('add product...');
  }

  static async getAll() {
    try {
      const products = await ProductsModel.findAll();
      return products;
    } catch (error) {
      throw new Error(error);      
    }
  }

  static deleteAll() {
    return db.execute('truncate table products');
  }

  static getById(id) {
    let query = 'select * from products where ID = ?';
    return db.execute(query, [id]);
  }

  static deleteById(id) {
    let query = 'delete from products where ID = ?';
    return db.execute(query, [id]);
  }
}