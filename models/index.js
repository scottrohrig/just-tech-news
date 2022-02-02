// This file will become more important as we create more models, but for now it'll just be for collecting and exporting the User model data.

const User = require('./User');
const Post = require( './Post' );

User.hasMany( Post, {
    foreignKey: 'user_id'
} );
Post.belongsTo( User, {
    foreignKey: 'user_id'
} );

module.exports = { User, Post };
