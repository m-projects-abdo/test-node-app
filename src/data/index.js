const User = require('./model/user.model');
const Product = require('./model/product.model');
const Cart = require('./model/cart.model');
const CartItem = require('./model/cart-item.model');
const Order = require('./model/order.model');
const OrderItem = require('./model/order-item.model');

exports.RunRelation = () => {
  //User Relation
  User.hasOne(Cart);
  User.hasOne(Order);
  User.hasMany(Product);
  
  //Product Relation
  Product.belongsTo(User, { 
    constraints: true, 
    onDelete: 'CASCADE'
  });
  Product.belongsToMany(Cart, {through: CartItem});
  Product.belongsToMany(Order, {through: OrderItem});
  
  //Cart Relation
  Cart.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
  });
  Cart.belongsToMany(Product, {through: CartItem});

  //Order relation
  Order.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
  })
  Order.belongsToMany(Product, {through: OrderItem})
}
