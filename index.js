/**
 * Date: 1/4/2023
 * Subject: ToDo app index.js file
 * Auth: Ismile Sardar
*/
const app = require("./app");

const PORT = process.env.PORT || 5050;

app.listen(PORT, ()=>{
    console.log(`server is counected at http://localhost:${PORT}`);
});