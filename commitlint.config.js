module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [0, 'always', [
          'upd', 'feat', 'fix', 'refactor', 'docs', 'chore', 'style', 'revert'
         ]],
        'scope-empty': [0, 'always'],
        'scope-case': [2, 'always', ['lower-case', 'camel-case',  'kebab-case']],
        'subject-full-stop': [1, 'always', '.'],
        'subject-case': [0, 'never'],
        'header-max-length': [0, 'always', 72]
      }
  }
  