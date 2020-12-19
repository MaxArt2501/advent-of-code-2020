const sumMatcher = /(\d+) \+ (\d+)/;
const prodMatcher = /(\d+) \* (\d+)/;
function compute(expression) {
  let newExpression = expression;
  do {
    expression = newExpression;
    newExpression = expression.replace(sumMatcher, (_, s1, s2) => +s1 + +s2);
  } while (newExpression !== expression);
  do {
    expression = newExpression;
    newExpression = expression.replace(prodMatcher, (_, s1, s2) => s1 * s2);
  } while (newExpression !== expression);
  return newExpression;
}

const exprMatcher = /\(([^\(\)]+)\)/g;
function evaluateInner(expression) {
  return expression.replace(exprMatcher, (_, inner) => compute(inner));
}

function getResult(expression) {
  let newExpression;
  while ((newExpression = evaluateInner(expression)) !== expression) {
    expression = newExpression;
  }
  return +compute(newExpression);
}

console.log(input.trim().split('\n').reduce((sum, expression) => sum + getResult(expression), 0));
