const express = require('express');
const app = express();
app.use(express.json());

const seats = {};
const lockDuration = 5000;

app.post('/api/book', (req, res) => {
  const { seat } = req.body;
  const current = seats[seat];

  if (!current || current.status === 'available') {
    seats[seat] = {
      status: 'locked',
      timer: setTimeout(() => {
        if (seats[seat] && seats[seat].status === 'locked') {
          seats[seat].status = 'available';
        }
      }, lockDuration)
    };
    res.json({
      success: true,
      message: `Seat ${seat} locked successfully. Confirm within 5 seconds.`
    });
  } else {
    res.json({
      success: false,
      message: `Seat ${seat} is already locked or booked. Try another seat.`
    });
  }
});

app.post('/api/confirm', (req, res) => {
  const { seat } = req.body;
  const current = seats[seat];

  if (current && current.status === 'locked') {
    clearTimeout(current.timer);
    seats[seat].status = 'booked';
    res.json({
      success: true,
      message: `Seat ${seat} booking confirmed.`
    });
  } else {
    res.json({
      success: false,
      message: `Seat ${seat} is not locked or already booked.`
    });
  }
});

app.get('/api/seats', (req, res) => {
  const result = Object.keys(seats).map(seat => ({
    seat,
    status: seats[seat].status
  }));
  res.json(result);
});

app.listen(3000);
