const express = require('express');
const app = express();
app.use(express.json());

let cards = [
  { id: 1, name: 'Ace', suit: 'Spades' },
  { id: 2, name: 'King', suit: 'Hearts' }
];

app.get('/cards', (req, res) => {
  res.json(cards);
});

app.post('/cards', (req, res) => {
  const { name, suit } = req.body;
  const id = cards.length ? cards[cards.length - 1].id + 1 : 1;
  const newCard = { id, name, suit };
  cards.push(newCard);
  res.json(newCard);
});

app.put('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  const { name, suit } = req.body;
  const card = cards.find(c => c.id === cardId);
  if (card) {
    card.name = name;
    card.suit = suit;
    res.json(card);
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
});

app.delete('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  const index = cards.findIndex(c => c.id === cardId);
  if (index !== -1) {
    cards.splice(index, 1);
    res.json({ message: 'Card deleted successfully' });
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
});

app.listen(3000);
