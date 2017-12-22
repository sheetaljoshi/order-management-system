export default {
    bindings: {
        modalInstance: '<'
    },
    controller: Controller,
    template: require('./supplier-update.component.html'),
}

function Controller() {
    const vm = this;

    vm.$onInit = onInit;
    vm.update = update;
    vm.close = close;

    function onInit() {
        vm.supplier = vm.modalInstance.supplier;
    }

    function update() {
        vm.modalInstance.close(vm.supplier);
    }

    function close() {
        vm.modalInstance.dismiss("modal window closed");
    }
}