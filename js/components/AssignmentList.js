import Assignment from "./Assignment.js";
import AssignmentTags from "./AssignmentTags.js";

export default {
  components: { Assignment, AssignmentTags },
  template: `
    <section v-if="assignments.length">
        <h2 class="font-bold mb-2"> 
          {{ title }} 
          <span> ({{ assignments.length }}) </span>
        </h2>

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

        <ul class="border border-gray-600 divide-y divide-gray-600">
          <assignment 
            v-for="assignment in filteredAssignments" 
            :key="assignment.id"
            :assignment="assignment"
            ></assignment>
        </ul>
      </section>
  `,
  props: {
    title: String,
    assignments: Array,
  },

  data() {
    return {
      currentTag: "all",
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
