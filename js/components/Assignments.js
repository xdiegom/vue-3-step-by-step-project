import AssignmentList from "./AssignmentList.js";
import AssignmentCreate from "./AssignmentCreate.js";

export default {
  components: { AssignmentList, AssignmentCreate },
  template: `
      <section class="space-y-6">
        <assignment-list title="In progress" :assignments="filters.inProgress"></assignment-list>
        <assignment-list title="Completed" :assignments="filters.completed"></assignment-list>

        <assignment-create @add="add"></assignment-create>
      </section>

      `,

  data() {
    return {
      assignments: [
        { name: "Learn Vue 3", tag: "math",  complete: false, id: 1 },
        { name: "Read chapter 4", tag: "science", complete: false, id: 2 },
        { name: "Turn in homework", tag: "reading", complete: false, id: 3 },
      ],
    };
  },

  computed: {
    filters() {
      return {
        inProgress: this.assignments.filter(
          (assignment) => !assignment.complete
        ),
        completed: this.assignments.filter((assignment) => assignment.complete),
      };
    },
  },

  methods: {
    add(name) {
      this.assignments.push({
        name: name,
        complete: false,
        id: this.assignments.length + 1,
      });
    },
  },
};
