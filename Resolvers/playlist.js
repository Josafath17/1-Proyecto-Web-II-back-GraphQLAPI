const Playlist = require("../models/playlistModel");
// const User = require("../models/userModel");

const playlist = {
  getPlaylist: async ({ id }) => {
    try {
      const playlist = await Playlist.findById(id);
      return playlist;
    } catch (error) {
      throw new Error("Internal server error");
    }
  },
  getPlaylists: async () => {
    try {
      const playlist = await Playlist.find();
      return playlist;
    } catch (error) {
      throw new Error("Internal server error");
    }
  },
  getPlaylistsUser: async ({ iduser }) => {
    try {
      const playlist = await Playlist.find({ user: iduser });
      return playlist;
    } catch (error) {
      throw new Error("Internal server error");
    }
  },
};

module.exports = playlist;
