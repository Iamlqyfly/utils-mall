module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-case': [0],
      'type-empty': [0],
      'type-enum': [0],
      'subject-case': [0],
      'subject-empty': [0],
      'header-check-rule': [2, 'always'],
    },
    plugins: [
      {
        rules: {
          'header-check-rule': ({ header }) => {
            if (!header)
              return [false, 'Commit message may not be empty'];
            const headerArr = header.split(':');
            const type = headerArr[0];
            const subject = headerArr[1];
            // type 以 Bug|Feature|Task- 开头，如 Bug，且只能包含英文、数字
            const validType = type.match(/^(Bug|Feature|Task)$/g);
            if (!validType)
              return [false, 'type should be Bug|Feature|Task'];
            // subject 不能为空
            if (!subject)
              return [false, `subject may not be empty`];
            // subject 要以空格开头
            if (subject[0] !== ' ')
              return [false, 'subject should start with space'];
            // subject 只能包含英文、数字、空格
            const validSubject = subject.match(/^ [a-z0-9\s]+$/g);
            return [
              validSubject,
              `subject may not be empty and can only contain lowercase digits, numbers, and spaces.`,
            ];
          },
        },
      },
    ],
  }
  