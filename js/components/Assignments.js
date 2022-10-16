import AssignmentList from "./AssignmentList.js";
import AssignmentCreate from "./AssignmentCreate.js";

export default {
  components: { AssignmentList, AssignmentCreate },
  template: `
      <section class="flex gap-8">
        <assignment-list title="In progress" :assignments="filters.inProgress">
          <assignment-create @add="add"></assignment-create>
        </assignment-list>

        <div v-show="showCompleted">
          <assignment-list
            title="Completed"
            :assignments="filters.completed"
            can-toggle
            @toggle="showCompleted = !showCompleted">
          </assignment-list>
        </div>
      </section>

      `,

  data() {
    return {
      assignments: [],
      showCompleted: true
    };
  },

  created() {
    /* "Promises: "when you work asynchrounsly you'll eventually get a response.
     *  So, a promise is a "promise" to give you a response but doesn't have
     *  anything for you, but one day or one second you'll get it." - Jeffrey Way
     *
     * "fetch" is a native browser tool to call API endpoints
     */
    fetch("http://localhost:3001/assignments")
      .then((response) => response.json())
      .then((assignments) => {
        this.assignments = assignments;
      });
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
