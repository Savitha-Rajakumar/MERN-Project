const expres = require("express");
const placesController = require("../controller/places-controller");
const router = expres.Router();
const { check } = require("express-validator");
router.get("/:pid", placesController.getPlaceByid);

router.get("/user/:uid", placesController.getPlaceByUser);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesController.createPlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesController.updatePlace
);

router.delete("/:pid", placesController.deletePlace);

module.exports = router;
