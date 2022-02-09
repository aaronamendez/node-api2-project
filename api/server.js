// implement your server here
// require your posts router and connect it here
const express = require('express');
const server = express();
const postRoutes = require('./posts/posts-router');

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/api/posts', postRoutes);

server.get('/', (req, res) => {
	res.status(200).json({ msg: 'OK' });
});

module.exports = server;
