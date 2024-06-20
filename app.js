import path from 'path'

//

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import moment from 'jalali-moment'

//--

import alertRoutes from './Routes/Alert.js'
import authRoutes from './Routes/Auth.js'
import menusRoutes from './Routes/Menu.js'
import courseRoutes from './Routes/Course.js'
import categoryRoutes from './Routes/Category.js'
import sessionRoutes from './Routes/Session.js'
import commentRoutes from './Routes/Comments.js'
import ticketRoutes from './Routes/Tickets.js'
import cooperationRoutes from './Routes/Cooperation.js'
import questionsRoutes from './Routes/Question.js'
import bansRoutes from './Routes/Bans.js'

//--
const app = express();
//--

import { fileURLToPath } from 'url';
//-
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
//--
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/courses/covers', express.static(path.join(__dirname, 'public', 'courses', 'covers')));

//--

app.use('/alerts', alertRoutes);
app.use('/auth', authRoutes);
app.use('/menus', menusRoutes);
app.use('/courses', courseRoutes);
app.use('/category', categoryRoutes);
app.use('/sessions', sessionRoutes);
app.use('/comments', commentRoutes);
app.use('/tickets', ticketRoutes);
app.use('/cooperation', cooperationRoutes);
app.use('/questions', questionsRoutes);
app.use('/bans', bansRoutes);

//--

export default app
