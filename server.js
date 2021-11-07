const express = require('express'); // common js format
const app = express();
const PORT = process.env.PORT || 5555;

// app.get('/', (req, res) => res.json({ msg: 'JJJJJJJJJust browsin - ahhhhhhhhhhhhhh' }));

/**
 * Define routes
 */
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
