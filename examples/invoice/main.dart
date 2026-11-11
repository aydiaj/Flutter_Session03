void main() {
  const String service = 'Phone screen inspection';
  final String customer = 'Rania';
  double hourlyRate = 24.0;
  int hours = 3;
  const double materialsFee = 8.0;

  double laborCost = hourlyRate * hours;
  double total = laborCost + materialsFee;

  print('SERVICE RECEIPT');
  print('Customer: $customer');
  print('Service: $service');
  print('Labor: $laborCost');
  print('Materials: $materialsFee');
  print('Total: $total');

  // TODO: Change hours to 4 and predict the new total.
  // TODO: Add a fixed booking fee of 5.0 to the total.
}
