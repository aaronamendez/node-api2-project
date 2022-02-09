// implement your posts router here
const express = require('express');
const postRouter = express.Router();
const {
	find,
	findById,
	insert,
	update,
	remove,
	findPostComments,
	findCommentById,
	insertComment,
} = require('./posts-model');

postRouter.get('/', async (req, res) => {
	try {
		find().then((data) => {
			res.status(200).json(data);
		});
	} catch (err) {
		res
			.status(500)
			.json({ message: 'The posts information could not be retrieved' });
	}
});

postRouter.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		findById(id).then((post) => {
			if (post) {
				res.status(200).json(post);
			} else {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist' });
			}
		});
	} catch (err) {
		res
			.status(500)
			.json({ message: 'The post information could not be retrieved' });
	}
});

postRouter.post('/', async (req, res) => {
	try {
		const { title, contents } = req.body;
		if (title && contents) {
			insert(req.body).then((post) => {
				findById(post.id).then((postId) => {
					res.status(201).json(postId);
				});
			});
		} else {
			res
				.status(400)
				.json({ message: 'Please provide title and contents for the post' });
		}
	} catch (err) {
		res.status(500).json({
			message: 'There was an error while saving the post to the database',
		});
	}
});

postRouter.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { title, contents } = req.body;

		if (title && contents) {
			findById(id).then((post) => {
				if (post) {
					update(post.id, req.body).then((updated) => {
						findById(updated).then((post) => {
							res.status(200).json(post);
						});
					});
				} else {
					res
						.status(404)
						.json({ message: 'The post with the specified ID does not exist' });
				}
			});
		} else {
			res
				.status(400)
				.json({ message: 'Please provide title and contents for the post' });
		}
	} catch (err) {
		res
			.status(500)
			.json({ message: 'The post information could not be modified' });
	}
});

module.exports = postRouter;
