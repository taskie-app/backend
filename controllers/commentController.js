const CommentModel = require("../models/commentModel");

exports.createComment = async (req, res) => {
  const { user } = req;
  const { taskId } = req.params;
  const { content } = req.body;
  const newComment = new CommentModel({
    task: taskId,
    author: user._id,
    content,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  await newComment.save();

  CommentModel.findById(newComment._id)
    .populate({
      path: "author",
      select: "-password",
    })
    .then((comment) => res.json({ comment, error: null }))
    .catch((error) => res.json({ comment: null, error: error.message }));
};

exports.getComments = async (req, res) => {
  const { taskId } = req.params;
  if (!taskId)
    return res.json({ comments: null, error: "taskId must be provided" });

  CommentModel.find({ task: taskId })
    .populate({
      path: "author",
      select: "-password",
    })
    .exec()
    .then((comments) => res.json({ comments, error: null }))
    .catch((error) => res.json({ comments: null, error: error.message }));
};

exports.updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  CommentModel.findByIdAndUpdate(commentId, { content, updatedAt: Date.now() })
    .then((comment) => res.json({ comment, error: null }))
    .catch((error) => res.json({ comment: null, error: error.message }));
};

exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;
  CommentModel.findByIdAndDelete(commentId)
    .then(() => res.json({ error: null }))
    .catch((error) => res.json({ error: error.message }));
};
