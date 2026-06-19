<template>
  <div class="window-height window-width flex flex-center bg-dark-page text-white">
    <q-card flat bordered class="auth-card q-pa-xl bg-dark text-white">
      <div class="column items-center q-mb-lg">
        <q-avatar size="50px" font-size="36px" icon="login" class="text-white q-mb-xs" />
        <h1 class="text-h5 text-weight-bold q-my-none">Login</h1>
        <p class="text-caption text-grey-5 q-mt-xs text-center">
          Ingresa tus datos para acceder a tu cuenta.
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
          Iniciar Sesión con Google
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
          Iniciar Sesión con GitHub
        </q-btn>
      </div>

      <div class="row items-center q-my-lg text-grey-6">
        <q-separator dark class="col" />
        <span class="q-px-sm text-caption text-weight-bold">or</span>
        <q-separator dark class="col" />
      </div>

      <q-form class="login-form" @submit.prevent="submitLogin">
        <div>
          <label class="text-caption text-weight-bold block q-mb-xs text-grey-4">
            Correo <span class="text-negative">*</span>
          </label>
          <q-input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="Ingresa tu correo"
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
            Contraseña <span class="text-negative">*</span>
          </label>
          <q-input
            id="password"
            v-model="form.password"
            :type="isPasswordHidden ? 'password' : 'text'"
            required
            placeholder="Ingresa tu contraseña"
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
          :disabled="isSubmitting"
          label="Log In"
          class="full-width submit-btn text-weight-bold q-mt-lg"
        />
        <div v-if="errorMessage" class="text-negative text-caption q-mt-sm text-center">
          {{ errorMessage }}
        </div>
        <div class="nav-container">
          <router-link to="/register" class="text-caption text-blue-5 q-mt-xs text-center">
            Registrarse
          </router-link>
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const API_PORT = 5072
const api = axios.create({ baseURL: `http://localhost:${API_PORT}` })

const form = reactive({
  email: '',
  password: '',
})

const errorMessage = ref('')
const isSubmitting = ref(false)

function submitLogin() {
  errorMessage.value = ''
  isSubmitting.value = true

  api
    .post('/api/user/signin', {
      email: form.email,
      password: form.password,
    })
    .then((response) => {
      const token =
        response.data?.token ||
        response.data?.accessToken ||
        response.data?.jwt ||
        response.data?.data?.token

      if (token) {
        localStorage.setItem('authToken', token)
        router.push('/products')
      } else {
        errorMessage.value = 'No se recibió un token válido desde la API.'
      }
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage.value = error.response.data.message
      } else {
        errorMessage.value = 'An error occurred during login.'
      }
    })
    .finally(() => {
      isSubmitting.value = false
    })
}

const rememberMe = ref(false)
const isPasswordHidden = ref(true)

const emailRules = [
  (val) => !!val || 'El email es obligatorio',
  (val) => {
    const emailPattern =
      /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailPattern.test(val) || 'Por favor, ingresa un email válido'
  },
]

const passwordRules = [
  (val) => !!val || 'La contraseña es obligatoria',
  (val) => val.length >= 8 || 'Debe tener al menos 8 caracteres',
]

// const loginWithProvider = (provider) => {
//   $q.notify({
//     type: 'info',
//     message: `Iniciando sesión con ${provider}...`,
//   })
// }
</script>

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
