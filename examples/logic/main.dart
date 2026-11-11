void main() {
  var age = 19;
  var score = 82;
  var hasID = true;
  print(score >= 80);              // true
  print(score == 80);              // false (comparison)
  print(age >= 18 && hasID);       // both must be true
  print(score < 60 || !hasID);     // either condition
  print(!(age < 18));             // logical NOT
  // TODO: Make hasID false. Predict and then run.
}
