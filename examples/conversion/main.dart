void main() {
  final rawHours = '6';      // Pretend this came from a form.
  final hours = int.tryParse(rawHours);
  final invalid = int.tryParse('six');
  final price = double.tryParse('12.50');
  print('Hours: ${hours ?? 0}');
  print('Invalid entry: ${invalid ?? 'not a number'}');
  print('Cost: $price');
  print('As text: ${42.toString()}');
  print('Two decimals: ${12.5.toStringAsFixed(2)}');
  // TODO: Replace rawHours with 'bad' and observe the safe result.
}
