const express = require('express');
const app = express();
const port = 5000




require("./routers/list")(app)









app.listen(port, () => {
    console.log(`Server started on ${port}`);
});