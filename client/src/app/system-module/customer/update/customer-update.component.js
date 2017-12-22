export default {
    bindings: {
        modalInstance: '<'
    },
    controller: Controller,
    template: require('./customer-update.component.html'),
}

function Controller() {
    const vm = this;

    vm.$onInit = onInit;
    vm.update = update;
    vm.close = close;

    function onInit() {
        vm.customer = vm.modalInstance.customer;
    }

    function update() {
        vm.modalInstance.close(vm.customer);
    }

    function close() {
        vm.modalInstance.dismiss("modal window closed");
    }
}