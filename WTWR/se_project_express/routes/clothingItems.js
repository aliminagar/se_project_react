const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const {
  getClothingItems,
  createClothingItems,
  deleteClothingItems,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.post("/", authMiddleware, createClothingItems);
router.delete("/:itemId", authMiddleware, deleteClothingItems);
router.put("/:itemId/likes", authMiddleware, likeItem);
router.delete("/:itemId/likes", authMiddleware, dislikeItem);

module.exports = router;
