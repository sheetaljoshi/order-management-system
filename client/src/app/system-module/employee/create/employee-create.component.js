export default {
    bindings: {
        modalInstance: '<'
    },
    controller: Controller,
    template: require('./employee-create.component.html'),
}

function Controller() {
    const vm = this;

    vm.$onInit = onInit;
    vm.create = create;
    vm.close = close;
    vm.openDatepicker = openDatepicker;

    function onInit() {
        vm.isOpenPopup = false;
    }

    function create() {
        vm.modalInstance.close(vm.employee);
    }

    function close() {
        vm.modalInstance.dismiss("modal window closed");
    }

    function openDatepicker() {
        vm.isOpenPopup = true;
    }
}