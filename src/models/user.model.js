/*
 * @Author: Tidusvn05
 * @Date: 2017-12-20 22:19:11
 * @Last Modified by: Tidusvn05
 * @Last Modified time: 2018-05-30 00:26:59
 */
import moment from 'moment-timezone';
import mongoose from 'mongoose';
import dataTables from 'mongoose-datatables';

/**
 * User Roles
 */
export const ROLES = {
  admin: 1,
  mod: 2,
  user: 3,
};

/**
 * User Schema
 * @private
 */
const schema = new mongoose.Schema({
  id: {
    type: String,
    // required: true,
    minlength: 3,
    maxlength: 128,
  },
  channelId: {
    type: String,
  },
  channelName: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },   // will remove in future
  // And using new full profile.
  profile: {
    name: String,
    address: String,
    gender: String,
    avatar: String,
    timezone: String,
    country: String,
    countryCode: String,
    relationship: Number,
  },
  gProfile: Object, // full profile from google
  channels: Object,
  messageAddress: Object,
  name: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  address: {
    type: String
  },
  oauth: {
    type: Object
  },
  age: Number,
  relationship: Number,
  lastSyncedAt: Date, // last time sync data from gogle calendar.
  // Use populate to access ref log.
  logs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserLog'
  }],
  alertsTo: Array,
  role: Number,
  countryCode: String,
  timezone: String,
  stats: Object, // store stats analytic from google calendars
  hasConfirmedInfo: {
    type: Boolean,
    default: false,
  },
  linkedToUserId: mongoose.Schema.Types.ObjectId,
  gmtOffset: {
    type: Number,
    index: true
  },
  appToken: {
    type: String, // token to access app.bizbot.io
    index: true,
  },

}, {
  timestamps: true,
  collection: 'users'
});


schema.statics = {

  ROLES,

};

/**
 * Protected Methods
 */
schema.method({
  transform() {
    const transformed = {};
    const fields = ['_id', 'profile', 'role', 'appToken'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});



schema.plugin(dataTables);
/**
 * @typedef User
 */
module.exports = mongoose.model('User', schema);
