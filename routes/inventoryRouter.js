const { Router } = require("express");
const inventoryRouter = Router();

const inventoryController = require("../controllers/inventoryController");

inventoryRouter.get("/", inventoryController.getIndex);

inventoryRouter.get("/list", inventoryController.getList);

inventoryRouter.get("/buy", inventoryController.getBuy);
inventoryRouter.post("/buy", inventoryController.postBuy);

inventoryRouter.get("/new", inventoryController.getNew);
inventoryRouter.post("/new", inventoryController.postNew);

inventoryRouter.get("/search", inventoryController.getSearch);
inventoryRouter.post("/search", inventoryController.postSearch);

inventoryRouter.post("/update", inventoryController.postUpdate);

inventoryRouter.get("/delete", inventoryController.getDelete);
inventoryRouter.post("/delete", inventoryController.postDelete);

module.exports = inventoryRouter;
