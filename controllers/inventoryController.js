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
    } else {
        alert("Quantidade insuficiente em estoque");
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

module.exports = {
    getIndex,
    getList,
    getBuy,
    postBuy,
    getNew,
    postNew
};