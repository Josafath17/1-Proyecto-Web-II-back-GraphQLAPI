const Video = require("../models/videoModel");

const video = {
  getVideo: async ({ id }) => {
    try {
      const video = await Video.findById(id);
      return video;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getVideos: async () => {
    try {
      const video = await Video.find();
      return video;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getVideosPlaylist: async ({ idplaylist }) => {
    try {
      const video = await Video.find({ playlist: idplaylist });
      return video;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
module.exports = video;
