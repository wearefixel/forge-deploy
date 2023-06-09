<template>
  <div class="text-sm">
    <div class="pb-4 -mx-4 px-4">
      <h2>Last Deployment</h2>
      <ul>
        <li class="mt-1" v-for="(env, key) in last" v-bind:key="key">
          <strong class="titlecase">{{ key }}:</strong>
          <code>{{ env ? env.hash.slice(0, 7) : "n/a" }}</code>
          <span v-if="env">{{
            new Date(env.time * 1000).toLocaleString()
          }}</span>
        </li>
      </ul>
    </div>

    <div class="-mx-4 px-4">
      <div class="text-center pt-4 pb-4" v-if="loadingCommits">
        <loading-graphic />
      </div>

      <ul v-if="commits.length && !loadingCommits">
        <li
          class="py-4 border-t"
          v-for="commit in commits"
          v-bind:key="commit.shortHash"
        >
          <button
            type="button"
            class="w-full hover:text-blue duration-100 text-left space-x-2"
            style="outline: none !important"
            @click="selectCommit(commit.hash)"
          >
            <code :title="commit.hash">{{ commit.shortHash }}</code>
            <strong>{{ commit.author }}</strong>
            <span>{{ commit.message }}</span>
          </button>

          <div
            class="mt-4 space-y-4"
            v-if="selectedCommit && selectedCommit.hash === commit.hash"
          >
            <ul
              class="p-4 rounded text-sm font-mono bg-gray-300 text-gray-700"
              style="white-space: nowrap"
            >
              <li
                v-for="change in selectedCommit.changes"
                v-bind:key="change.name"
              >
                <code>{{ change.status.toUpperCase() }}</code> {{ change.name }}
              </li>
            </ul>

            <div class="flex gap-1">
              <button
                v-for="env in environments"
                v-bind:key="env"
                type="submit"
                class="btn"
                @click="deploy(env, commit.hash)"
              >
                Deploy to {{ env }}
              </button>
            </div>
          </div>
        </li>
      </ul>

      <div
        class="flex justify-between items-center mt-4"
        v-if="!loadingCommits"
      >
        <button type="button" class="btn" @click="prev" :disabled="page === 0">
          Prev
        </button>

        <span>Page {{ page + 1 }} of {{ maxPages + 1 }}</span>

        <button
          type="button"
          class="btn"
          @click="next"
          :disabled="page >= maxPages"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    environments: {
      type: Array,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      last: {},
      loadingCommits: true,
      commits: [],
      selectedCommit: null,
      total: 0,
      page: 0,
    };
  },

  created() {
    this.getLast();
    this.getCommits();
  },

  watch: {
    page() {
      this.getCommits();
    },
  },

  methods: {
    getLast() {
      this.$axios.get(cp_url("fixel/forge-deploy/last")).then((response) => {
        this.last = response.data;
      });
    },

    getCommits() {
      this.loadingCommits = true;

      this.$axios
        .get(cp_url("fixel/forge-deploy/commits?page=" + this.page))
        .then((response) => {
          this.loadingCommits = false;
          this.commits = response.data.commits;
          this.total = response.data.total;
        });
    },

    selectCommit(hash) {
      if (this.selectedCommit && this.selectedCommit.hash === hash) {
        this.selectedCommit = null;
        return;
      }

      this.selectedCommit = null;

      this.$axios
        .get(cp_url("fixel/forge-deploy/commits/" + hash))
        .then((response) => {
          this.selectedCommit = {
            hash: hash,
            changes: response.data,
          };
        });
    },

    deploy(environment, hash) {
      if (!confirm(`Are you sure you want to deploy to ${environment}?`)) {
        return;
      }

      this.$axios
        .post(cp_url(`fixel/forge-deploy/deploy/${environment}/${hash}`))
        .catch((error) => {
          this.$toast.error(error.response.data.message);
        })
        .then((response) => {
          this.$toast.success(response.data.message);
          this.getLast();
        });
    },

    prev() {
      this.page = Math.max(0, this.page - 1);
    },

    next() {
      this.page = Math.min(this.maxPages, this.page + 1);
    },
  },

  computed: {
    maxPages() {
      return Math.floor(this.total / this.perPage);
    },
  },
};
</script>
