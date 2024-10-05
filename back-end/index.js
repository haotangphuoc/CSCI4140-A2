const express = require('express');
const cors = require('cors')

const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
const port = 3001;

const partsRouter = require('./routers/tableParts');
const posRouter = require('./routers/tablePos');

app.use('/api/parts', partsRouter);
app.use('/api/purchase-orders', posRouter);



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
