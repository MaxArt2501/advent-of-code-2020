const groups = input.trim().split('\n\n');
// For each group, we need to make a list of unique answers: `Set` is the perfect tool for it
console.log(groups.reduce((sum, group) => sum + new Set(group.split(/\n|/)).size, 0));
