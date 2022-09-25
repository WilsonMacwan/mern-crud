const router = require("express").Router();
const { Post } = require("../model/Post");

// Create / Add
router.post("/add", (req, res) => {
  const post = new Post(req.body);
  post.save((error) => {
    if (error) return res.status(400).json({ success: false, error });
    return res.status(200).json({ success: true });
  });
});

// Read / Get
router.get("/", (req, res) => {
  Post.find().exec((error, posts) => {
    if (error) return res.status(400).json({ success: false, error });
    return res.status(200).json({ success: true, posts });
  });
});

// Get Deatils by ID
router.get("/details/:id", (req, res) => {
  let id = req.params.id;

  Post.findById(id, (error, post) => {
    if (error) return res.status(400).json({ success: false, error });
    return res.json({ success: true, post });
  });
});

// Update
router.put("/update/:id", (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, post) => {
      if (error) return res.status(400).json({ success: false, error });
      return res.status(200).json({ success: true });
    }
  );
});

// Delete
router.delete("/delete/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id).exec((error, deleteItem) => {
    if (error) {
      res.send(error);
    }
    return res.json(deleteItem);
  });
});

module.exports = router;
