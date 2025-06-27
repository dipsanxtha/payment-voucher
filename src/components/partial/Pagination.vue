<template>
  <div class="pagination">
    <div class="pagination__info">
      Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalItems }} entries
    </div>
    
    <div class="pagination__controls">
      <button 
        @click="goToPage(currentPage - 1)" 
        :disabled="currentPage === 1"
        class="pagination__btn"
        :class="{ 'pagination__btn--disabled': currentPage === 1 }"
      >
        Previous
      </button>
      
      <div class="pagination__pages">
        <button 
          v-for="page in visiblePages" 
          :key="page"
          @click="goToPage(page)"
          class="pagination__btn pagination__page-btn"
          :class="{ 'pagination__page-btn--active': page === currentPage }"
        >
          {{ page }}
        </button>
      </div>
      
      <button 
        @click="goToPage(currentPage + 1)" 
        :disabled="currentPage === totalPages"
        class="pagination__btn"
        :class="{ 'pagination__btn--disabled': currentPage === totalPages }"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    endIndex() {
      const end = this.startIndex + this.itemsPerPage;
      return end > this.totalItems ? this.totalItems : end;
    },
    visiblePages() {
      const pages = [];
      const maxVisible = 5;
      
      if (this.totalPages <= maxVisible) {
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        let start = Math.max(1, this.currentPage - 2);
        let end = Math.min(this.totalPages, start + maxVisible - 1);
        
        if (end - start < maxVisible - 1) {
          start = Math.max(1, end - maxVisible + 1);
        }
        
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
      }
      
      return pages;
    }
  },
   methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.$emit('page-change', page);
      }
    }
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem 0;
  border-top: 1px solid #eee;
}

.pagination__info {
  color: #666;
  font-size: 14px;
}

.pagination__controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination__btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: #fff;
  color: #333;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.pagination__btn:hover:not(.pagination__btn--disabled) {
  background: #f5f5f5;
  border-color: #ccc;
}

.pagination__btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination__pages {
  display: flex;
  gap: 0.25rem;
}

.pagination__page-btn {
  min-width: 2.5rem;
  text-align: center;
}

.pagination__page-btn--active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.pagination__page-btn--active:hover {
  background: #0056b3;
  border-color: #0056b3;
}

@media (max-width: 768px) {
  .pagination {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .pagination__controls {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>