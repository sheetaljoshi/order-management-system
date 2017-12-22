export default {
    bindings: {
        modalInstance: '<'
    },
    controller: Controller,
    template: require('./shipper-update.component.html'),
}

function Controller() {
    const vm = this;

    vm.$onInit = onInit;
    vm.update = update;
    vm.close = close;

    function onInit() {
        vm.shipper = vm.modalInstance.shipper;
    }

    function update() {
        vm.modalInstance.close(vm.shipper);
    }

    function close() {
        vm.modalInstance.dismiss("modal window closed");
    }
}