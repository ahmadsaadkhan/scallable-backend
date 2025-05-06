const { commentsContainer } = require('../config/db');

// Create Comment
exports.createComment = async (req, res) => {
  try {
    const { postId, commenter, text } = req.body;
    const { resource: createdComment } = await commentsContainer.items.create({
      postId,
      commenter,
      text,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(createdComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Comment
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { resource: existingComment } = await commentsContainer.item(id, id).read();
    if (!existingComment) return res.status(404).json({ message: 'Comment not found' });

    const updatedComment = { ...existingComment, ...req.body, updatedAt: new Date() };
    await commentsContainer.item(id, id).replace(updatedComment);

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await commentsContainer.item(id, id).delete();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
