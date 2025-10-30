const { PrismaClient } = require("@prisma/client");
const { get } = require("express/lib/response");

const prisma = new PrismaClient();

async function getIndex(req, res) {
    res.render("index");
}

async function getList(req, res) {
    const allItems = await prisma.item.findMany();
    res.render("list", { items: allItems })
}

async function getBuy(req, res) {
    res.render("buy");
}

async function postBuy(req, res) {
    const quantity = parseInt(req.body.quantity);
    const item = await prisma.item.findUnique(
        {
            where: {
                id: parseInt(req.body.id)
            }
        }
    )
    if (item.quantity - quantity > 0) {
        await prisma.item.update({
            where: { id: item.id },
            data: {
                quantity: { decrement: quantity }
            }
        });
    }
    res.redirect("/");
}

async function getNew(req, res) {
    res.render("new");
}

async function postNew(req, res) {
    await prisma.item.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
            quantity: parseInt(req.body.quantity)
        },
    });
    res.redirect("/");
}

async function getSearch(req, res) {
    res.render("search");
}

async function postSearch(req, res) {
    let idSearch = parseInt(req.body.id);
    if (isNaN(idSearch)) idSearch = 0;
    const foundItems = await prisma.item.findMany({
        where: {
            OR: [
                { id: idSearch },
                { name: req.body.name }
            ]
        }
    });
    if (foundItems.length === 0) {
        res.render("index");
    } else {
        res.render("update", { item: foundItems[0] });
    }
}

async function postUpdate(req, res) {
    await prisma.item.update({
        where: { id: parseInt(req.body.id) },
        data: {
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
            quantity: parseInt(req.body.quantity)
        },
    });
    res.redirect("/");
}

async function getDelete(req, res) {
    res.render("delete");
}

async function postDelete(req, res) {
    let idSearch = parseInt(req.body.id);
    if (isNaN(idSearch)) idSearch = 0;
    await prisma.item.deleteMany({
        where: {
            OR: [
                { id: idSearch },
                { name: req.body.name }
            ]
        }
    });
    res.redirect("/");
}

module.exports = {
    getIndex,
    getList,
    getBuy,
    postBuy,
    getNew,
    getSearch,
    postSearch,
    postNew,
    postUpdate,
    getDelete,
    postDelete
};