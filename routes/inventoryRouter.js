const { Router } = require("express");
const inventoryRouter = Router();

const inventoryController = require("../controllers/inventoryController");
// Add a small search handler here so POST /search works without changing other files.
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

inventoryRouter.get("/", inventoryController.getIndex);

inventoryRouter.get("/list", inventoryController.getList);

inventoryRouter.get("/buy", inventoryController.getBuy);
inventoryRouter.post("/buy", inventoryController.postBuy);

// Accept POST /search from the existing form. This queries the DB directly
// and renders the `list` view with the results. It accepts `id`, `name`, or `query`.
inventoryRouter.post("/search", async (req, res) => {
	try {
		const nameQuery = (req.body.name || req.body.query || "").toString().trim();
		const idRaw = req.body.id ?? req.body.query ?? "";

		const or = [];
		const idNum = Number(idRaw);
		if (!Number.isNaN(idNum) && Number.isInteger(idNum)) {
			or.push({ id: idNum });
		}
		if (nameQuery) {
			or.push({ name: { contains: nameQuery, mode: "insensitive" } });
		}

		const items = or.length
			? await prisma.item.findMany({ where: { OR: or } })
			: await prisma.item.findMany();

		return res.render("list", { items });
	} catch (err) {
		console.error("search error:", err);
		return res.status(500).send("Server error");
	}
});

inventoryRouter.get("/new", inventoryController.getNew);
inventoryRouter.post("/new", inventoryController.postNew);

module.exports = inventoryRouter;
