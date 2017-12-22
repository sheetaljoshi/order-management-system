export default {
    bindings: {
        modalInstance: '<'
    },
    controller: Controller,
    template: require('./customer-create.component.html'),
}

function Controller() {
    const vm = this;

    vm.$onInit = onInit;
    vm.create = create;
    vm.close = close;

    function onInit() {

    }

    function create() {
        vm.modalInstance.close(vm.customer);
    }

    function close() {
        vm.modalInstance.dismiss("modal window closed");
    }
}