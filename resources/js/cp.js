import Index from "./pages/Index.vue";

Statamic.booting(() => {
  Statamic.$inertia.register("forge-deploy::index", Index);
});
