export default {
    bindings: {
        modalInstance: '<'
    },
    controller: Controller,
    template: require('./product-update.component.html'),
}

function Controller() {
    const vm = this;

    vm.$onInit = onInit;
    vm.update = update;
    vm.close = close;

    function onInit() {
        vm.categories = vm.modalInstance.categories;
        vm.suppliers = vm.modalInstance.suppliers;
        vm.product = vm.modalInstance.product;
    }

    function update() {
        vm.modalInstance.close(vm.product);
    }

    function close() {
        vm.modalInstance.dismiss("modal window closed");
    }
}