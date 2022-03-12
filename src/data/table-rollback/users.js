const users = require('../migrations/users');
users.destroy({
  where: {},
  truncate: true
});