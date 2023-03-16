const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 8081;
app.use(express.json());

let Table = init();

app.listen
(
    PORT,
    console.log(`Server running on http://localhost:${PORT}`)
);

app.get("/api/:id", (req, res) => 
{
    const { id } = req.params;
    if (!Table[id]) 
    {
        res.status(404).send("Not found");
        return;
    }
    res.status(200).send(Table[id]);
});

app.post("/api/:id", (req, res) =>
{
    const { id } = req.params;
    Table [id] = req.body;
    console.log(req.body);
    fs.writeFileSync("data.json", JSON.stringify(Table));
    res.status(200).send(Table[id]);
});

function init() 
{
    if(!fs.existsSync("data.json"))
    {
        fs.writeFileSync("data.json", JSON.stringify([]));
    }
    let dataraw = fs.readFileSync("data.json");
    let data = JSON.parse(dataraw);
    console.log(data);
    return(data);
}                           