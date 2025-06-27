<template>
  <div class="profile-container">
    <div class="profile-header">
      <h1 class="profile-title">My Profile</h1>
    </div>
    <div class="profile-content">
      <div class="profile-card">
        <div class="profile-info">
          <h2 class="profile-name">{{ fullName }}</h2>
          <p class="profile-email">{{ apiData.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/plugins/axios';


export default {

  name: 'ProfilePage',
  data() {
    return {
      apiData: {},
    };
  },
  created() {
    this.getProfile()
  },
  computed:{
    fullName(){
      return (this.apiData.first_name || '')  + ' ' + (this.apiData.last_name || '');
    }
  },
  methods: {
    async getProfile(){
      try {
          const response = await api.get('/api/auth/profile/');

          this.apiData = response.data;

      } catch (error) {
          console.error("An error occurred while fetching vouchers:", error);
          // Handle the error appropriately, e.g., show a notification or log it
      }
   },
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.profile-container {
  padding: 2rem;
  background-color: #f8f9fa;
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
}

.profile-header {
  margin-bottom: 2rem;
  text-align: center;
}

.profile-title {
  font-size: 2rem;
  font-weight: 600;
  color: #343a40;
}

.profile-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.profile-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 450px;
}

.profile-name {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.profile-username {
  font-size: 1.1rem;
  color: #007bff;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.profile-email {
  color: #6c757d;
  font-size: 1rem;
  margin-bottom: 0;
}

@media (max-width: 480px) {
  .profile-container {
    padding: 1rem;
  }
  .profile-card {
    padding: 2rem;
  }
  .profile-name {
    font-size: 1.5rem;
  }
}
</style> 