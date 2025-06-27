<template>
    <Sidebar v-if="$route.name !== 'Login'" @toggle="handleToggleSidebar" :class="{ collapsed: sidebarWidth === '80px' }" />
    <div class="content" :style="{ marginLeft: $route.name !== 'Login' ? sidebarWidth : '0' }">
      <div class="inner-content">
        <router-view />
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

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

body {
  background-color: #f5f5f5;
}

* {
  box-sizing: border-box;
}

#app {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* Sidebar styles */
.sidebar {
  width: 240px;
  transition: width 0.3s;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  overflow: hidden;
  z-index: 1000;
}
.sidebar.collapsed {
  width: 80px;
}

/* Content area styles */
.content {
  flex-grow: 1;
  transition: margin-left 0.3s;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: 240px;
  overflow-y: auto;
  height: 100vh;
}
.sidebar.collapsed + .content {
  margin-left: 80px;
}

.inner-content {
  flex-grow: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 2rem auto 2rem;
  padding: 1.5rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

/* Responsive adjustments for the main layout */
@media (max-width: 768px) {
  .content {
    margin-left: 80px !important; 
  }
  .sidebar:not(.collapsed) + .content {
    margin-left: 80px !important;
  }
}
</style>
