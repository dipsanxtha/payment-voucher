<template>
  <div class="login-bg">
    <div class="login-container">
      <div class="login-card">
        <div class="login-logo">
        </div>
        <h2>Login</h2>
        <form @submit.prevent="handleLogin" autocomplete="on">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="email" type="text" placeholder="Enter email" required autocomplete="email" />
          </div>
          <div class="form-group password-group">
            <label for="password">Password</label>
            <div class="password-wrapper">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter password"
                required
                autocomplete="current-password"
              />
              <button type="button" class="show-password-btn" @click="toggleShowPassword" :aria-label="showPassword ? 'Hide password' : 'Show password'">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>
          <div class="forgot-row">
            <a href="#" class="forgot-link">Forgot password?</a>
          </div>
          <button type="submit" :disabled="loading">
            <span v-if="loading"><i class="fas fa-spinner fa-spin"></i> Logging in...</span>
            <span v-else>Login</span>
          </button>
          <p v-if="error" class="error" role="alert">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { apiWithoutAuth } from '@/plugins/axios';
import { setToken } from '@/utils/token';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: '',
      showPassword: false,
      loading: false
    };
  },
  methods: {
    async handleLogin() {
      this.error = '';
      this.loading = true;

      try {
        const response = await apiWithoutAuth.post('/api/auth/login/', {
          email: this.email ,
          password: this.password
        });
        
        const token = response.data.key;
        
        if (token) {
          setToken(token); // ✅ use token.js
          this.$router.push('/dashboard');
        } else {
          this.error = 'No token received';
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed. Please try again.';
      } finally {
        this.loading = false;
      }
    },

    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>



<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.login-bg {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem 1rem;
}

.login-card {
  background: rgba(255, 255, 255, 0.85);
  padding: 40px 32px;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.25);
  transition: box-shadow 0.3s;
}
.login-card:hover {
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.22);
}

.login-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
}
.login-logo img {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  background: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 25px;
  font-size: 2rem;
  font-weight: 700;
  color: #273c75;
}

.form-group {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

label {
  margin-bottom: 8px;
  font-weight: 600;
  color: #2f3640;
  font-size: 15px;
}

input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #dcdde1;
  border-radius: 6px;
  font-size: 16px;
  background: #f9f9fb;
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}
input:focus {
  border-color: #4a90e2;
  outline: none;
  box-shadow: 0 0 0 2px #a1c4fd55;
}

.password-group {
  width: 100%;
}
.password-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}
.show-password-btn {
  background: none;
  border: none;
  color: #888;
  font-size: 18px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 0 4px;
  transition: color 0.2s;
}
.show-password-btn:hover {
  color: #273c75;
}

.forgot-row {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}
.forgot-link {
  color: #4a90e2;
  font-size: 14px;
  text-decoration: none;
  transition: text-decoration 0.2s, color 0.2s;
}
.forgot-link:hover {
  text-decoration: underline;
  color: #273c75;
}

button[type="submit"] {
  width: 100%;
  padding: 12px;
  background: linear-gradient(90deg, #4a90e2 0%, #273c75 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(39,60,117,0.10);
  transition: background 0.2s, box-shadow 0.2s, opacity 0.2s;
}
button[type="submit"]:hover:not(:disabled) {
  background: linear-gradient(90deg, #273c75 0%, #4a90e2 100%);
  box-shadow: 0 4px 16px rgba(39,60,117,0.13);
}
button[type="submit"]:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  margin-top: 14px;
  color: #e84118;
  text-align: center;
  font-weight: 600;
  background: #ffeaea;
  border-radius: 4px;
  padding: 8px 0;
  font-size: 15px;
  box-shadow: 0 1px 4px rgba(232,65,24,0.07);
  transition: background 0.2s, color 0.2s;
}

@media (max-width: 480px) {
  .login-card {
    padding: 24px 8px;
    max-width: 98vw;
  }
  h2 {
    font-size: 1.3rem;
  }
  .login-logo img {
    width: 44px;
    height: 44px;
  }
}
</style>
