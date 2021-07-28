const express = require('express');
const app = express();
const { eventRouter, memberRouter, attendanceRouter } = require('./routers');
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: 'text/html' }));
app.use(express.raw({ type: 'text/xml' }));
app.use(express.json());

app.use('/api/events', eventRouter);
app.use('/api/members', memberRouter);
app.use('/api/attendance', attendanceRouter);
app.use((err, req, res, next) => {
  res.status(400).send(err);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is now up listening on port ${port}`);
});
