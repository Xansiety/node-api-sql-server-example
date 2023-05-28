import app from "./app.js";

app.listen(
    app.get("port")
    , () => console.log(`Listening! on http://localhost:${app.get("port")} 🐣`));