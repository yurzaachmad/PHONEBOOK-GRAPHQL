var express = require("express");
var router = express.Router();
var path = require("path");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.put("/:id/avatar", async function (req, res, next) {
  try {
    const id = req.params.id;
    const picture = req.files && req.files.avatar;
    console.log(id, "ini");

    if (!picture) {
      return res.status(400).json({ error: "No avatar file provided." });
    }

    const pictureName = `${Date.now()}-${picture.name}`;
    const uploadPath = path.join(
      __dirname,
      "..",
      "public",
      "images",
      pictureName
    );

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
  } catch (e) {
    console.log(e);
    // console.log("req.avatar", picture);
    res.json({ e });
  }
});

module.exports = router;
