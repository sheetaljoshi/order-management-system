export default {
    bindings: {
        modalInstance: '<'
    },
    controller: Controller,
    template: require('./category-update.component.html'),
}

function Controller() {
    const vm = this;

    vm.$onInit = onInit;
    vm.update = update;
    vm.close = close;

    function onInit() {
        vm.category = vm.modalInstance.category;
    }

    function update() {
        vm.modalInstance.close(vm.category);
    }

    function close() {
        vm.modalInstance.dismiss("modal window closed");
    }
}