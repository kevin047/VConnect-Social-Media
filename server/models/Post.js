import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: [true, "Must Provide First Name"],
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: [true, "Must Provide Last Name"],
      min: 2,
      max: 50,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Assuming you have a User model
            required: true,
          },
          commentText: {
            type: String,
            required: true,
          },
        },
      ]
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;
