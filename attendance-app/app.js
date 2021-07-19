const express = require('express');
const app = express();
const { eventRouter } = require('./routers');
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: 'text/html' }));
app.use(express.raw({ type: 'text/xml' }));
app.use(express.json());

app.use('/events', eventRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is now up listening on port ${port}`);
});
