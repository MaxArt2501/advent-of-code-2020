function compute(expression) {
  return expression.split(/\b /).reduce((result, operation) => operation[0] === '+'
    ? +result + (+operation.slice(1))
    : result * operation.slice(2)
  );
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
