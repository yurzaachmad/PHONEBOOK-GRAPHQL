const { GraphQLUpload } = require("graphql-upload");
var path = require("path");

module.exports = {
  Upload: GraphQLUpload,
  processUpload: async (upload) => {
    // Process the uploaded file here (e.g., save to storage, update database)
    const pictureName = `${Date.now()}-${picture.name}`;
    const uploadPath = path.join(__dirname, "public", "images", pictureName);
    picture.mv(uploadPath, async function (err) {
      if (err) return res.status(500).send(err);
      // Save the file path or identifier in the database (assuming 'picturePath' is the field name)
      const user = await models.User.update(
        {
          picturePath: uploadPath,
          avatar: pictureName,
          // If using an identifier instead of file path, use something like:
          // pictureIdentifier: pictureName,
        },
        {
          where: {
            id,
          },
          returning: true,
          plain: true,
        }
      );
      // Send the picture path or identifier in the response
      res.json(user[1]); // Or 'user[1].pictureIdentifier' if using an identifier
    });
  },
};
