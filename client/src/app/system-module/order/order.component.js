export default {
    bindings: {
        ordersData: '<'
    },
    controller: Controller,
    template: require('./order.component.html'),
}

function Controller(orderService, $uibModal) {
    const vm = this;

    vm.$onInit = onInit;
    vm.view = view;
    vm.changePage = changePage;

    function onInit() {
        vm.alert = null;
        vm.orders = vm.ordersData.content;
        vm.currentPage = 1;
        vm.itemsPerPage = 10;
        vm.totalItems = vm.ordersData.totalElements;
    }

    function view(order) {
        const modalInstance = $uibModal.open({
            animation: false,
            component: 'orderView',
            size: 'lg'
        });
        modalInstance.order = order;

        modalInstance.result.then(
            (data) => {

            }, (error) => {
                console.log(error);
            }
        );
    }
    
    function changePage() {
        orderService.get({page: vm.currentPage},
            (response) => {
                vm.orders = response.content;
            },
            (error) => {
                console.log(error);
            }
        );
    }
}