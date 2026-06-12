import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import pluginQuasar from '@quasar/app-vite/eslint'
import prettierSkipFormatting from '@vue/eslint-config-prettier/skip-formatting'

import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

export default [
  {
    // ignores: []
  },

  ...pluginQuasar.configs.recommended(),
  js.configs.recommended,

  // 2. Agregamos las configuraciones recomendadas de TypeScript
  ...tseslint.configs.recommended,

  ...pluginVue.configs['flat/essential'],

  {
    // 3. Aplicamos el parser correcto para archivos Vue y TypeScript
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
  },

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
        ga: 'readonly',
        cordova: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly',
        browser: 'readonly',
      },
    },

    // add your custom rules here
    rules: {
      'prefer-promise-reject-errors': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      // Opcional: Desactivar una regla molesta de TS si usas tipados simples en métodos
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  {
    files: ['src-pwa/sw/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
  },

  prettierSkipFormatting,
]
