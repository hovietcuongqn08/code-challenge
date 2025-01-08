var sum_to_n_a = function (n) {
  return (n * (n + 1)) / 2;
};

console.log(sum_to_n_a(5));

var sum_to_n_b = function (n) {
  var sum = 0;
  for (var i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

console.log(sum_to_n_b(6));

var sum_to_n_c = function (n) {
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_c(n - 1);
};

console.log(sum_to_n_b(7));
