import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist/**', 'contact-api/**', 'public/**', 'caya-knowledge/**', 'node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [
      'src/content/investor/**/*.{ts,tsx}',
      'src/components/investor-v2/**/*.{ts,tsx}',
      'src/pages/InvestorsV2.tsx',
      'src/lib/featureFlags.ts',
      'src/lib/analytics.ts',
      'src/App.jsx',
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.vitest,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^[A-Z_]',
        caughtErrorsIgnorePattern: '^_',
      }],
      'no-unused-vars': 'off',
    },
  },
)
