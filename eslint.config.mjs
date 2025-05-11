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
        rules: {
            '@typescript-eslint/strict-boolean-expressions': 'off',
            '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
            '@typescript-eslint/no-unnecessary-condition': 'off',
            camelcase: [
                'warn',
                {
                    allow: ['http_req_duration'],
                },
            ],
        },
    },
]
