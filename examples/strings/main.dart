void main() {
  String trainee = 'Mira';
  String module = 'Dart Fundamentals';
  int tasks = 4;

  //Multiline Strings
  String address = '''
123 Main Street
Kuwait City, Kuwait
13005''';
  print(address);

  //string interpolation
  print('Hello $trainee!');
  print('Module: $module');
  print('Tasks next week: ${tasks + 2}');
  print('Course name length: ${module.length}');
  print(address);

  // TODO: Print the trainee's name in uppercase.
  // TODO: Change tasks and predict the new message.
}
