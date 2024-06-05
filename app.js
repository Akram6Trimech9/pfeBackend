const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;
dbConnect();

// Middleware setup
app.use(cors());
app.use(morgan('dev')); // You can specify 'dev' for more concise logs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Router setup
const authRouter = require('./routes/userRoute');
const rdvRouter = require('./routes/rdvRoute');
const contactRouter = require('./routes/contactRoute');
const categoryActualityRouter = require('./routes/categoryRoute');
const documentRouter = require('./routes/documentsRoute');
const notificationRouter = require('./routes/notificationRoute');
const actualityRoute = require('./routes/actualityRoute');

app.use('/api/user', authRouter);
app.use('/api/rdv', rdvRouter);
app.use('/api/actuality', actualityRoute);
app.use('/api/contacts', contactRouter);
app.use('/api/category-actualty', categoryActualityRouter);
app.use('/api/documents', documentRouter);
app.use('/api/notifications', notificationRouter);
app.use(notFound);
app.use(errorHandler);

 const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

 io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('rdv-confirmed', ({ clientId, notification_created }) => {
   });

  socket.on('rdv-created', (data) => {
    console.log('New appointment created:', data.notification);
    io.emit('rdv-created', data);  
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

 server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});