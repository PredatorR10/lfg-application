const router = require("express").Router();
const controler = require("../controllers");

router.get("/", controler.games.idx);
router.get("/new", controler.games.newGame);
router.get("/:id", controler.games.show);
router.post("/", controler.games.create);
router.put("/:id", controler.games.update);
router.delete("/:id", controler.games.destroy);
router.get("/:id/edit", controler.games.edit);

module.exports = router;