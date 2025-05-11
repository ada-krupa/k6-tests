import { codemaskConfig, codemaskImportConfig, codemaskStylisticConfig } from 'eslint-config-codemask'

export default [
    ...codemaskConfig,
    ...codemaskImportConfig,
    ...codemaskStylisticConfig,
    {
        files: ['test-k6-examples/**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: './test-k6-examples/tsconfig.json',
            },
        },
    },
    {
        files: ['test-k6/**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: './test-k6/tsconfig.json',
            },
        },
        rules: {
            '@typescript-eslint/strict-boolean-expressions': 'off',
            '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
            '@typescript-eslint/no-unnecessary-condition': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            'no-console': 'off',
            camelcase: [
                'warn',
                {
                    allow: ['http_req_duration'],
                },
            ],
        },
    },
]
