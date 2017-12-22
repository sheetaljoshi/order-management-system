export default {
    bindings: {
        modalInstance: '<'
    },
    controller: Controller,
    template: require('./order-view.component.html'),
}

function Controller() {
    const vm = this;

    vm.$onInit = onInit;
    vm.close = close;

    function onInit() {
        vm.order = vm.modalInstance.order;
        vm.totalPrice = vm.order.orderDetails.reduce(
            (total, current) => total + current.product.price * current.quantity, 0
        );
    }

    function close() {
        vm.modalInstance.dismiss("modal window closed");
    }
}