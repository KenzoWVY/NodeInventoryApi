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

async function getUpdate(req, res) {
    res.render("update");
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
    await prisma.item.deleteMany({
        where: {
            OR: [
                { id: parseInt(req.body.id) },
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
    postNew,
    getUpdate,
    postUpdate,
    getDelete,
    postDelete
};