<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" v-model="username" type="text" placeholder="Enter username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" v-model="password" type="password" placeholder="Enter password" required />
        </div>
        <button type="submit">Login</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    handleLogin() {
      if (this.username === 'admin' && this.password === 'admin') {
        localStorage.setItem('authToken', 'your-static-token');
        this.$router.push('/dashboard');
      } else {
        this.error = 'Invalid username or password';
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f6fa;
  box-sizing: border-box;
}

.login-card {
  background: rgb(255, 255, 255);
  padding: 40px 80px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1100px;
}

h2 {
  text-align: center;
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  margin-bottom: 16px;
  font-weight: 600;
  color: #2f3640;
  font-size: 15px;
}

input {
  width: 100%;
  padding: 20px;
  border: 1px solid #dcdde1;
  border-radius: 6px;
  font-size: 18px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #273c75;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

button:hover {
  background-color: #192a56;
}

.error {
  margin-top: 10px;
  color: red;
  text-align: center;
}
</style>
