import Assignment from "./Assignment.js";
import AssignmentTags from "./AssignmentTags.js";
import Panel from "./Panel.js";

export default {
  components: { Assignment, AssignmentTags, Panel },
  template: `
    <Panel v-if="assignments.length">
      <template #heading>
        <div class="flex justify-between items-start">
          <div>
            {{ title }}
            <span> ({{ assignments.length }}) </span>
          </div>
          <button v-show="canToggle" @click="$emit('toggle')">&times;</button>
        </div>
      </template>

        <!-- 
          Another way to work with v-model instead of using "modelValue"
          and use our own property name, we define it like this in our
          component property:

          <assignment-tags
            v-model:currentTag="currenTag" 
            ...
          >

          Then, change the name of "modelValue" in your component to the
          name of the property that you like!.
        
        -->

        <assignment-tags
          v-model="currentTag"
          :initial-tags="assignments.map(a => a.tag)">
        </assignment-tags>

        <ul class="border border-gray-600 divide-y divide-gray-600 mb-4 w-60">
          <assignment 
            v-for="assignment in filteredAssignments" 
            :key="assignment.id"
            :assignment="assignment"
            ></assignment>
        </ul>

        <slot></slot>
      </Panel>
  `,
  props: {
    title: String,
    assignments: Array,
    canToggle: { type: Boolean, default: false },
  },

  data() {
    return {
      currentTag: "all"
    };
  },

  computed: {
    filteredAssignments() {
      if (this.currentTag === "all") {
        return this.assignments;
      }

      return this.assignments.filter((a) => a.tag === this.currentTag);
    },
  },
};
