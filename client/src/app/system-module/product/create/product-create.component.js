export default {
    bindings: {
        modalInstance: '<'
    },
    controller: Controller,
    template: require('./product-create.component.html'),
}

function Controller() {
    const vm = this;

    vm.$onInit = onInit;
    vm.create = create;
    vm.close = close;

    function onInit() {
        vm.categories = vm.modalInstance.categories;
        vm.suppliers = vm.modalInstance.suppliers;
    }

    function create() {
        vm.modalInstance.close(vm.product);
    }

    function close() {
        vm.modalInstance.dismiss("modal window closed");
    }
}