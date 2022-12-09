const cloudinary = require("../middleware/cloudinary");
const Journal = require("../models/Journal");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const journals = await Journal.find({ user: req.user.id });
      res.render("profile.ejs", { journals: journals, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const journals = await Journal.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { journals: journals });
    } catch (err) {
      console.log(err);
    }
  },
  getJournal: async (req, res) => {
    try {
      const journal = await Journal.findById(req.params.id);
      res.render("journal.ejs", { journal: journal, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getJournal: async (req, res) => {
    try {
      const journal = await Journal.findById(req.params.id);
      const comments = await Comment.find({journal: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("journal.ejs", { journal: journal, user: req.user, comments: comments });
    } catch (err) {
      console.log(err)
      return res.render('error/500');
    }

  },
  //show edit page
  getEdit: async (req, res) => {
    try{
      const journal = await Journal.findOne({
        _id: req.params.id,
      }).lean()
      if(!journal){
        return res.render('erroe/404')
      }
      if(journal.user != req.user.id){
        res.redirect('/feed')
      } else {
        res.render('edit.ejs', { journal: journal, user: req.user })
      }
    } catch (err) {
      console.error (err)
      return res.render ('error/500')
    }
  },

  createJournal: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Journal.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
      return res.render('error/500')
    }
  },
  
  
  
  likeJournal: async (req, res) => {
    try {
      await Journal.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/journal/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  //update Journal
  editJournal: async (req, res) => {
    
      let journal = await Journal.findById({
        _id: req.params.id,
    }).lean()

    if(!journal){
      return res.render('error/404')
    }
    if(journal.user != req.user.id){
      res.redirect('/feed')
    }else {
      journal = await Journal.findOneAndUpdate ({
        _id: req.params.id}, req.body.caption, {
        new : true,
        runValidators : true
      })
      res.direct('/feed')
    }
  },
    
  

  deleteJournal: async (req, res) => {
    try {
      // Find post by id
      let journal = await Journal.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(journal.cloudinaryId);
      // Delete post from db
      await Journal.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
