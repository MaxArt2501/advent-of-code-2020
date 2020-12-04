const passports = input.trim().split('\n\n').map(
  block => block.split(/\s/).reduce((passport, keyValue) => Object.assign(passport, {
    [keyValue.slice(0, 3)]: keyValue.slice(4)
  }), {})
);

const eyeColors = 'amb blu brn gry grn hzl oth'.split(' ');

function isValid({ byr, iyr, eyr, hgt, hcl, ecl, pid }) {
  return byr >= 1920 && byr <= 2002
    && iyr >= 2010 && iyr <= 2020
    && eyr >= 2020 && eyr <= 2030
    && /^(?:59|6\d|7[0-6])in$|^(?:1[5-8]\d|19[0-3])cm$/.test(hgt)
    && /^#[\da-f]{6}$/.test(hcl)
    && eyeColors.includes(ecl)
    && /^\d{9}$/.test(pid);
}

console.log(passports.filter(isValid).length);
