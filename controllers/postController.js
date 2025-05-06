const { postsContainer } = require('../config/db');

exports.getAllPosts = async (req, res) => {
  try {
    const querySpec = {
      query: 'SELECT * FROM c ORDER BY c.createdAt DESC'
    };

    const { resources: posts } = await postsContainer.items.query(querySpec).fetchAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

// Create Post
exports.createPost = async (req, res) => {
  try {
    const { creator, mediaUrl, mediaType, title, caption, location, peoplePresent } = req.body;
    const { resource: createdPost } = await postsContainer.items.create({
      creator,
      mediaUrl,
      mediaType,
      title,
      caption,
      location,
      peoplePresent,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { resource: existingPost } = await postsContainer.item(id, id).read();
    if (!existingPost) return res.status(404).json({ message: 'Post not found' });

    const updatedPost = { ...existingPost, ...req.body, updatedAt: new Date() };
    await postsContainer.item(id, id).replace(updatedPost);

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await postsContainer.item(id, id).delete();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
