void main() {
  var action = 'save';
  switch (action) {
    case 'open':
      print('Opening');
    case 'save':
      print('Saving');
    case 'close':
      print('Closing');
    default:
      print('Unknown action');
  }
  // Modern Dart 3: non-empty cases do not need break.
  // TODO: Test action = 'close', then 'share'.
}
