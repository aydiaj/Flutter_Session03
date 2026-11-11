void main() {
  var attempts = 0;
  while (attempts < 3) {
    attempts++;
    print('Attempt $attempts');
  }

  var ticket = 0;
  do {
    print('Ticket $ticket is checked at least once');
    ticket++;
  } while (ticket < 2);
  // TODO: Try attempts = 3 and compare both loops.
}
