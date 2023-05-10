import ForgeDeploy from './components/ForgeDeploy.vue'

Statamic.booting(() => {
    Statamic.$components.register('forge-deploy', ForgeDeploy)
})
