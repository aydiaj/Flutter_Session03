void main() {
  var score = 84;
  if (score < 0 || score > 100) {
    print('Invalid score');
  } else if (score >= 90) {
    print('Excellent!');
  } else if (score >= 80) {
    print('Good job!');
  } else if (score >= 60) {
    print('Passed');
  } else {
    print('You need to work harder');
  }
  // TODO: Test 91, 55 and 105. Order matters!
}
