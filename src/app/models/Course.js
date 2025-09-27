const { default: mongoose } = require('mongoose');
const mongodb = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    name: { type: String, requireq: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, requireq: true },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true,
  },
);
// Add pulgin

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt: true,
});

module.exports = mongoose.model('Course', Course);
