void main() {
  int hours = 4;
  var trainee = 'Maya';        // inferred String
  var fee = 12.5;            // inferred double
  final course = 'Dart';     // assigned once
  const sessionsPerWeek = 3; // known at compile time
  print('$trainee: $hours hours of $course');
  print(fee.runtimeType);
  print(sessionsPerWeek);
  hours = 5; // OK: mutable variable
  // TODO: Try trainee = 'Lina'; and inspect its type.
  // PREDICT, don't run: trainee = 123; // type error
}
