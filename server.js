const express = require('express');

const app = express();
const port = 5000

//history mode 防止刷新空白
const history = require('connect-history-api-fallback');
history({
    index: '../public'
  });
app.use(history());
app.use("/",express.static("public"))

//post body
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extende: false }));
app.use(bodyparser.json())



require("./routers/list")(app)
require("./routers/user")(app)






app.listen(port, () => {
    console.log(`Server started on ${port}`);
});