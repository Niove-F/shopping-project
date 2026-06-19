<template>
  <div class="window-height window-width flex flex-center bg-dark-page text-white">
    <q-card flat bordered class="auth-card q-pa-xl bg-dark text-white">
      <div class="column items-center q-mb-lg">
        <q-avatar size="50px" font-size="36px" icon="person_outline" class="text-white q-mb-xs" />
        <h1 class="text-h5 text-weight-bold q-my-none">Registrarse</h1>
        <p class="text-caption text-grey-5 q-mt-xs text-center">
          Ingresa tus datos para crear una cuenta.
        </p>
      </div>

      <div class="column gap-sm q-mb-md">
        <q-btn outline no-caps class="full-width oauth-btn" @click="loginWithProvider('Google')">
          <svg class="q-mr-sm" width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.742 1.055 15.014 0 12 0 7.354 0 3.315 2.651 1.309 6.518l3.957 3.247z"
            />
            <path
              fill="#4285F4"
              d="M16.04 15.345c-1.012.682-2.34 1.082-4.04 1.082-2.973 0-5.491-2.01-6.391-4.718L1.652 14.95C3.659 18.818 7.698 21.464 12 21.464c2.95 0 5.682-1.01 7.745-2.745l-3.705-3.374z"
            />
            <path
              fill="#34A853"
              d="M23.523 12.273c0-.818-.073-1.609-.205-2.373H12v4.5h6.49c-.282 1.482-1.123 2.736-2.395 3.582l3.705 3.373c2.164-1.99 3.723-4.918 3.723-8.809z"
            />
            <path
              fill="#FBBC05"
              d="M5.609 11.709a7.032 7.032 0 0 1 0-2.436L1.652 6.025a11.946 11.946 0 0 0 0 9.927l3.957-3.243z"
            />
          </svg>
          Continuar con Google
        </q-btn>

        <q-btn
          outline
          no-caps
          class="full-width oauth-btn q-mt-sm"
          @click="loginWithProvider('GitHub')"
        >
          <svg class="q-mr-sm" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.34.72-4.045-1.61-4.045-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.31 24 12c0-6.37-5.37-12-12-12z"
            />
          </svg>
          Continuar con GitHub
        </q-btn>
      </div>

      <div class="row items-center q-my-lg text-grey-6">
        <q-separator dark class="col" />
        <span class="q-px-sm text-caption text-weight-bold">or</span>
        <q-separator dark class="col" />
      </div>

      <q-form @submit.prevent="onSubmit" class="q-gutter-y-sm">
        <div>
          <label class="text-caption text-weight-bold block q-mb-xs text-grey-4">
            Email <span class="text-negative">*</span>
          </label>
          <q-input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            filled
            dark
            dense
            :rules="emailRules"
            lazy-rules
            no-error-icon
          />
        </div>

        <div>
          <label class="text-caption text-weight-bold block q-mb-xs text-grey-4">
            Password <span class="text-negative">*</span>
          </label>
          <q-input
            v-model="password"
            :type="isPasswordHidden ? 'password' : 'text'"
            placeholder="Enter your password"
            filled
            dark
            dense
            :rules="passwordRules"
            lazy-rules
            no-error-icon
          >
            <template v-slot:append>
              <q-icon
                :name="isPasswordHidden ? 'visibility_off' : 'visibility'"
                class="cursor-pointer text-grey-5"
                @click="isPasswordHidden = !isPasswordHidden"
              />
            </template>
          </q-input>
        </div>

        <q-checkbox
          v-model="rememberMe"
          label="Remember me"
          dark
          color="positive"
          class="text-grey-4 text-caption text-weight-bold q-mt-xs"
        />

        <q-btn
          type="submit"
          label="Continue"
          class="full-width submit-btn text-weight-bold q-mt-lg"
          no-caps
          unevaluated
        />
        <div class="nav-container">
          <router-link to="/login" class="text-caption text-blue-5 q-mt-xs text-center">
            Ya tienes cuenta? Inicia Sesión
          </router-link>
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<style scoped>
.nav-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-container router-link {
  display: inline-block;
}

.bg-dark-page {
  background-color: #0b111e;
}

.auth-card {
  width: 100%;
  max-width: 440px;
  background-color: #0f172a !important;
  border-color: #1e293b !important;
  border-radius: 8px;
}

/* Botones de Google / Github */
.oauth-btn {
  background-color: #1e293b;
  border-color: #334155;
  color: #e2e8f0;
  border-radius: 6px;
  font-weight: 500;
}
.oauth-btn:hover {
  background-color: #243247;
}

/* Botón "Continue" (Verde brillante) */
.submit-btn {
  background-color: #00e676;
  color: #040811;
  border-radius: 6px;
  height: 40px;
}

/* Ajustes finos para asemejar los inputs a Nuxt UI */
:deep(.q-field--filled .q-field__control) {
  background: #151f32;
  border: 1px solid #22314d;
  border-radius: 6px;
}
:deep(.q-field--filled .q-field__control:before) {
  border-bottom: none !important;
}
:deep(.q-field--focused .q-field__control) {
  border-color: #00e676 !important;
}
:deep(.q-field__bottom) {
  padding: 4px 0 0 0;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isPasswordHidden = ref(true)

const emailRules = [
  (val: string) => !!val || 'El email es obligatorio',
  (val: string) => {
    const emailPattern =
      /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailPattern.test(val) || 'Por favor, ingresa un email válido'
  },
]

const passwordRules = [
  (val: string) => !!val || 'La contraseña es obligatoria',
  (val: string) => val.length >= 8 || 'Debe tener al menos 8 caracteres',
]

const loginWithProvider = (provider: 'Google' | 'GitHub') => {
  $q.notify({
    type: 'info',
    message: `Iniciando sesión con ${provider}...`,
  })
}

const onSubmit = () => {
  console.log('Submitted', {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value,
  })

  $q.notify({
    type: 'positive',
    message: '¡Login exitoso!',
  })
}
</script>
