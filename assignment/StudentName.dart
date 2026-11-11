// Full student name: REPLACE WITH YOUR NAME
// SICT235 · Session 03 · Dart Foundations and Control Flow
// Adapted tasks: Flutter and Dart Fundamentals (Dart B),
// Chapter 2 "Try It Yourself" p. 26 and Chapter 3 pp. 41–42.
// Submit this ONE StudentName.dart file to Google Classroom.
// Run locally in a terminal: dart run StudentName.dart
// NOTE: dart:io / stdin works in a local Dart console, NOT DartPad.

import 'dart:io';

void main() {
  print('=== PART A · TEMPERATURE CONVERTER ===');
  stdout.write('Celsius: ');
  String? temperatureText = stdin.readLineSync();
  double? celsius = double.tryParse(temperatureText ?? '');
  // TODO A1: If celsius is null, print a helpful error message.
  // TODO A2: Otherwise calculate Fahrenheit = (celsius * 9 / 5) + 32.
  // TODO A3: Print a readable result with string interpolation.

  print('\n=== PART B · GRADE CHECKER ===');
  // TODO B1: Use a while loop to keep reading scores until blank input.
  // TODO B2: Use int.tryParse on each score and reject invalid numbers.
  // TODO B3: Reject scores outside 0–100.
  // TODO B4: Use if / else if / else to classify valid scores:
  // >= 90 Excellent!; >= 80 Good job!; >= 70 Fair effort;
  // >= 60 You passed; otherwise You need to work harder.
  // Try: 95, 81, 72, 63, 40, -2, 101, "hello", then blank.

  print('\n=== PART C · VOWEL COUNTER ===');
  stdout.write('Enter a word: ');
  String? wordInput = stdin.readLineSync();
  String word = (wordInput ?? '').toLowerCase();
  int vowelCount = 0;
  // TODO C1: Use a for loop from index 0 to word.length - 1.
  // TODO C2: Use "aeiou".contains(word[index]) to detect vowels.
  // TODO C3: Use continue to skip consonants.
  // TODO C4: Increase vowelCount only for a vowel; print the total.
  print('Vowels counted: $vowelCount'); // Replace the unfinished logic above.
}

// Optional (not required): From Chapter 3 Enhanced Guessing Game:
// Limit attempts to 7, show remaining attempts, and allow a replay.
