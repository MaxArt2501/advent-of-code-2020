const groups = input.trim().split('\n\n');

console.log(groups.reduce((sum, group) => {
  const personAnswers = group.split('\n');
  // We can concentrate on the answers of the first person in the group - every common
  // answer *will* be contained there anyway.
  // We need to check if each answer present there is present in every list of answers
  // from the persons in the group.
  return sum + personAnswers[0].split('').filter(
    answer => personAnswers.every(answers => answers.includes(answer))
  ).length;
}, 0));
