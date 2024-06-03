const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const app = express();
const cors = require('cors');
app.use(cors());

const morgan = require('morgan');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
dbConnect();
app.use(morgan());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(cookieParser());
const authRouter = require('./routes/userRoute');
const rdvRouter = require('./routes/rdvRoute');
const contactRouter = require('./routes/contactRoute');
const categoryActualityRouter = require('./routes/categoryRoute');
const documentRouter = require('./routes/documentsRoute');
const actualityRoute = require('./routes/actualityRoute');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use('/api/user', authRouter);
app.use('/api/rdv', rdvRouter);
app.use('/api/actuality', actualityRoute);
app.use('/api/contacts', contactRouter);
app.use('/api/category-actualty', categoryActualityRouter);
app.use('/api/documents', documentRouter);

app.use(notFound);
app.use(errorHandler);

server.listen(PORT, () => {
     io.on('connection', (socket) => {

          socket.on('rdv-confirmed',({clientId,notification_created})=>{
                 
          })
          socket.on('rdv-created',({clientId,notification_created})=>{
                 socket.emit('rdv-created',({clientId,notification_created}) )
          })
      })
});