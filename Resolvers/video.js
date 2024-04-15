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
  getAllVideos: async () => {
    try {
      const video = await Video.find();
      return videos;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
modulo.export = video;
