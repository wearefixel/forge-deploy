<script setup>
import { ref, getCurrentInstance } from "vue";
import { Head } from "@statamic/cms/inertia";
import { router } from "@statamic/cms/inertia";
import {
  Badge,
  Button,
  ButtonGroup,
  Header,
  Heading,
  Listing,
  Modal,
  Subheading,
} from "@statamic/cms/ui";

const instance = getCurrentInstance();
const { $axios, $toast } = instance.appContext.config.globalProperties;

const props = defineProps({
  environments: Array,
  last: Object,
});

const selectedCommit = ref(null);
const deploying = ref(null);

function selectCommit(hash) {
  $axios.get(cp_url(`fixel/forge-deploy/commits/${hash}`)).then((r) => {
    selectedCommit.value = { hash, changes: r.data };
  });
}

function deploy(environment, hash) {
  if (!confirm(`Deploy to ${environment}?`)) {
    return;
  }

  deploying.value = `${environment}-${hash}`;

  $axios
    .post(cp_url(`fixel/forge-deploy/deploy/${environment}/${hash}`))
    .then((r) => {
      $toast.success(r.data.message);
    })
    .catch((e) => {
      $toast.error(e.response.data.message);
      deploying.value = null;
    })
    .finally(() => {
      router.reload();
    });
}
</script>

<template>
  <Head title="Forge Deploy" />

  <div class="max-w-5xl mx-auto">
    <Header title="Forge Deploy" icon="upload-cloud" />

    <Listing
      :url="cp_url('fixel/forge-deploy/commits')"
      :sortable="false"
      :allow-search="false"
      :allow-presets="false"
      :allow-customizing-columns="false"
    >
      <template #cell-shortHash="{ row, value }">
        <Heading class="flex items-center gap-2">
          <code v-text="value" class="px-0.5 rounded-sm" />

          <template v-for="env in Object.keys(last)" :key="env">
            <Badge
              v-if="last[env] && row.hash === last[env].hash"
              :text="env"
              :title="new Date(last[env].time * 1000).toLocaleString()"
              class="capitalize"
            />
          </template>
        </Heading>

        <Subheading>{{ new Date(row.date).toLocaleString() }}</Subheading>
      </template>

      <template #cell-actions="{ row }">
        <div class="flex justify-end">
          <Button icon="eye" @click="selectCommit(row.hash)" />
        </div>
      </template>
    </Listing>

    <Modal :open="selectedCommit !== null" @dismissed="selectedCommit = null">
      <Heading
        size="xl"
        :text="`${selectedCommit?.hash.slice(0, 8)} changes`"
      />

      <ul class="space-y-2 text-sm my-4">
        <li
          v-for="change in selectedCommit?.changes"
          :key="change.name"
          class="flex gap-2"
        >
          <Badge
            class="font-mono shrink-0"
            size="sm"
            :color="
              change.status === 'd'
                ? 'red'
                : change.status === 'c'
                  ? 'green'
                  : 'blue'
            "
            :text="change.status?.toUpperCase()"
          />

          <p>{{ change.name }}</p>
        </li>
      </ul>

      <ButtonGroup>
        <Button
          v-for="env in environments"
          :key="env"
          :disabled="deploying === `${env}-${selectedCommit.hash}`"
          icon="upload-cloud"
          @click="deploy(env, selectedCommit.hash)"
        >
          <span v-if="deploying === `${env}-${selectedCommit.hash}`">
            Deploying…
          </span>

          <span class="capitalize" v-else>{{ env }}</span>
        </Button>
      </ButtonGroup>
    </Modal>
  </div>
</template>
