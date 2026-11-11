void main() {
  var role = 'teacher';
  var permission = switch (role) {
    'student' => 'View lessons',
    'teacher' => 'Edit lessons',
    'admin' => 'Manage users',
    _ => 'No access',
  };
  print(permission);

  var score = 76;
  var result = score >= 60 ? 'Pass' : 'Retry';
  print(result);
  // TODO: Set role to 'visitor' and score to 48.
}
