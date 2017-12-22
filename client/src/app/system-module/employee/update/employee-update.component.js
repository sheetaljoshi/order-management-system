export default {
    bindings: {
        modalInstance: '<'
    },
    controller: Controller,
    template: require('./employee-update.component.html'),
}

function Controller() {
    const vm = this;

    vm.$onInit = onInit;
    vm.update = update;
    vm.close = close;
    vm.openDatepicker = openDatepicker;

    function onInit() {
        vm.employee = vm.modalInstance.employee;
        vm.isOpenPopup = false;
    }

    function update() {
        vm.modalInstance.close(vm.employee);
    }

    function close() {
        vm.modalInstance.dismiss("modal window closed");
    }

    function openDatepicker() {
        vm.isOpenPopup = true;
    }
}