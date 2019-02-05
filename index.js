const express = require('express');
const Sequelize = require('sequelize');

const app = express();

const connectionString =
  process.env.DATABASE_URL ||
  'postgres://postgres:secret@localhost:5432/postgres';
const sequelize = new Sequelize(connectionString, {
  define: { timestamps: false }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`The server is listening to port ${PORT}`));

const Board = sequelize.define(
  'board',
  {
    0: Sequelize.ARRAY(Sequelize.INTEGER),
    1: Sequelize.ARRAY(Sequelize.INTEGER),
    2: Sequelize.ARRAY(Sequelize.INTEGER),
    3: Sequelize.ARRAY(Sequelize.INTEGER),
    4: Sequelize.ARRAY(Sequelize.INTEGER),
    5: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  {
    tableName: 'board'
  }
);

Board.sync();

app.get('/board', (req, res) => {
  Board.findAll().then(boards => res.json({ boards }));
});

app.get('/board/:id', (req, res) => {
  const id = req.params.id;
  Board.findByPk(id).then(board => res.json({ board }));
});

app.post('/board', (req, res) => {
  Board.create({
    0: [0, 0, 0, 0, 0, 0],
    1: [0, 0, 0, 0, 0, 0],
    2: [0, 0, 0, 0, 0, 0],
    3: [0, 0, 0, 0, 0, 0],
    4: [0, 0, 0, 0, 0, 0],
    5: [0, 0, 0, 0, 0, 0]
  }).then(board => res.status(201).json(board));
});

app.put('/board/:id/:col/:row', (req, res) => {
  const id = req.params.id;
  const col = req.params.col;
  const row = req.params.row;
  Board.findByPk(id)
    .then(board =>
      board.update({
        [col]: [0, 0, 0, 0, 0, 0]
      })
    )
    .then(console.log(col))
    .then(board => res.status(200).send({ board }));
});
