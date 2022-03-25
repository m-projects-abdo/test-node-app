const User = require('./model/user.model');
const Product = require('./model/product.model');
const Cart = require('./model/cart.model');
const CartItem = require('./model/cart-item.model');

exports.RunRelation = () => {
  //User Relation
  User.hasOne(Cart)
  User.hasMany(Product);
  
  //Product Relation
  Product.belongsTo(User, { 
    constraints: true, 
    onDelete: 'CASCADE'
  });
  Product.belongsToMany(Cart, {through: CartItem});
  
  //Cart Relation
  Cart.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
  });
  Cart.belongsToMany(Product, {through: CartItem});
}
