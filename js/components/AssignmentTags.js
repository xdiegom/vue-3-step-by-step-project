export default {
  template: `
  <div class="flex gap-2 my-2">
    <button 
      @click="$emit('update:modelValue', tag)"
      v-for="tag in tags"
      class="border rounded px-1 py-px text-xs"
      :class="{
        'border-blue-500 text-blue-500': tag === modelValue
      }">
      {{ tag }}
    </button>
  </div>
  `,

  props: {
    modelValue: String,
    initialTags: Array
  },

  computed: {
    tags() {
      return ["all", ...new Set(this.initialTags)];
    },
  },
};
