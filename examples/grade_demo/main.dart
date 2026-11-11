void main() {
  // DartPad has no stdin. Test preset inputs here.
  final rawScore = '82';
  final score = int.tryParse(rawScore);
  if (score == null || score < 0 || score > 100) {
    print('Invalid score');
  } else if (score >= 90) {
    print('Excellent!');
  } else if (score >= 80) {
    print('Good job!');
  } else if (score >= 70) {
    print('Fair effort');
  } else if (score >= 60) {
    print('You passed');
  } else {
    print('You need to work harder');
  }
  // TODO: Test 'hello', '103', '59', and '95'.
}
