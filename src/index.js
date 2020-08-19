
const express = require("express")
const path = require('path')
const app = express()
const hbs = require("hbs")


const publicFolder = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../views")
console.log(publicFolder);
console.log(viewsPath);
app.use(express.static(publicFolder));
app.set("view engine", "hbs");
app.set("views", viewsPath);

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(7000, () => {
    console.log("Listening On port")
})