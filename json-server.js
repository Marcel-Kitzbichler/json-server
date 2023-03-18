const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 8081;
app.use(express.json());
const maxJsonSize = 1000;

let Table = initTable();

let Auth = initAuth();

app.listen
(
    PORT,
    console.log(`Server running on http://localhost:${PORT}`)
);

app.get("/api/:id", (req, res) => 
{
    const { id } = req.params;
    if (id == "all")
    {
        console.log("Sent full table to"+req.socket.remoteAddress);
        res.status(200).send(Table);
        return;
    }
    if (!Table[id]) 
    {
        res.status(404).send("Not found");
        return;
    }
    console.log("Sent "+Table[id]+" from "+id+" to "+req.socket.remoteAddress);
    res.status(200).send(Table[id]);
});

app.post("/api/:id/:key", (req, res) =>
{
    const { id } = req.params;
    if(id<0 || isNaN(id) || id>maxJsonSize)
    {
        res.status(400).send("Bad request");
        return;
    }
    Table [id] = req.body;
    console.log("Saved "+req.body+" to "+id+" from "+req.socket.remoteAddress);
    fs.writeFileSync("data.json", JSON.stringify(Table));
    res.status(200).send(Table[id]);
});

function initTable() 
{
    if(!fs.existsSync("data.json"))
    {
        fs.writeFileSync("data.json", JSON.stringify([]));
    }
    let dataraw = fs.readFileSync("data.json");
    let data = JSON.parse(dataraw);
    //console.log(data);
    return(data);
}  

function initAuth()
{
    if(!fs.existsSync("auth.json"))
    {
        fs.writeFileSync("auth.json", JSON.stringify([]));
    }
    let authraw = fs.readFileSync("auth.json");
    let authreading = JSON.parse(authraw);
    return(authreading);
}  
