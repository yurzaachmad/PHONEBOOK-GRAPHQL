const { GraphQLUpload } = require("graphql-upload");
var path = require("path");

module.exports = {
  Upload: GraphQLUpload,
  processUpload: async (upload) => {
    const pictureName = `${Date.now()}-${picture.name}`;
    const uploadPath = path.join(__dirname, "public", "images", pictureName);
    picture.mv(uploadPath, async function (err) {
      if (err) return res.status(500).send(err);
      const user = await models.User.update(
        {
          picturePath: uploadPath,
          avatar: pictureName,
        },
        {
          where: {
            id,
          },
          returning: true,
          plain: true,
        }
      );
      res.json(user[1]);
    });
  },
};
