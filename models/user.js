const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true }, // {unique: true} to make sure we don't have duplicated usernames in the DB
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    username: login,
  });

  if (!user) {
    user = await this.findOne({ email: login });
  }

  return user;
};

// perform a cascade delete for all messages in relation to the user
UserSchema.pre('remove', function (next) {
  this.model('Message').deleteMany({ user: this._id }, next);
});

module.exports = mongoose.model('User', UserSchema);
