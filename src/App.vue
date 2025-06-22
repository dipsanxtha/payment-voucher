<template>
  <div id="app">
    <Sidebar v-if="$route.name !== 'Login'" @toggle="handleToggleSidebar" :class="{ collapsed: sidebarWidth === '80px' }" />
    <div class="content" :style="{ marginLeft: $route.name !== 'Login' ? sidebarWidth : '0' }">
      <div class="inner-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/partial/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar
  },
  data() {
    return {
      sidebarWidth: '240px'
    };
  },
  methods: {
    handleToggleSidebar(isSidebarOpen) {
      this.sidebarWidth = isSidebarOpen ? '240px' : '80px';
    }
  }
};
</script>

<style scoped>
#app {
  display: flex;
  height: 100vh;
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.sidebar {
  width: 240px;
  transition: width 0.3s;
}

.sidebar.collapsed {
  width: 80px;
}

.content {
  flex-grow: 1;
  overflow-y: auto;
  transition: margin-left 0.3s;
  background-color: #f5f5f5;
}

.inner-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%; /* Makes sure children are vertically centered */
  width: 100%;
}
</style>
