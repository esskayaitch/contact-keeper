const express = require('express'); // common js format
const connectDB = require('./config/db');

const connctDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5555;

// connect to mongoDB
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to the Contact Keeper' }));

/**
 * Define routes
 */
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
