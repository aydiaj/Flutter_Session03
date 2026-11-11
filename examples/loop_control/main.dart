void main() {
  final word = 'Education';
  var vowels = 0;
  for (var i = 0; i < word.length; i++) {
    final letter = word[i].toLowerCase();
    if (!'aeiou'.contains(letter)) continue;
    vowels++;
  }
  print('Vowels: $vowels'); // 5

  for (var number = 1; number <= 10; number++) {
    if (number == 6) break;
    print(number); // 1, 2, 3, 4, 5
  }
  // TODO: Use 'Flutter' instead of 'Education'.
}
