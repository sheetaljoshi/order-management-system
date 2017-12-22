export default {
    bindings: {
        shippers: '<'
    },
    controller: Controller,
    template: require('./shipper.component.html'),
}

function Controller(shipperService, $uibModal) {
    const vm = this;

    vm.$onInit = onInit;
    vm.create = create;
    vm.update = update;
    vm.remove = remove;
    vm.closeMessage = closeMessage;

    function onInit() {
        vm.alert = null;
        vm.currentPage = 1;
        vm.itemsPerPage = 10;
    }
    
   function create() {
       const modalInstance = $uibModal.open({
           animation: false,
           component: 'shipperCreate',
           size: 'lg'
       });

       modalInstance.result.then(
           (data) => {
               shipperService.save(data,
                   (response) => {
                       vm.alert = {
                           type: "success",
                           message: "Shipper created!"
                       };

                       vm.shippers.push(response);
                   },
                   (error) => {
                       console.log(error);
                       vm.alert = {
                           type: "danger",
                           message: error.data.message
                       }
                   }
               );
           }, (error) => {
               console.log(error);
           }
       );
   }
   
   function update(shipper) {
       const modalInstance = $uibModal.open({
           animation: false,
           component: 'shipperUpdate',
           size: 'lg'
       });
       modalInstance.shipper = angular.copy(shipper);

       modalInstance.result.then(
           (data) => {
               shipperService.update({shipperId: data.id}, data,
                   (response) => {
                       vm.alert = {
                           type: "success",
                           message: "Shipper updated!"
                       };

                       const index = vm.shippers.findIndex(item => item.id === data.id);
                       vm.shippers[index] = data;
                   },
                   (error) => {
                       console.log(error);
                       vm.alert = {
                           type: "danger",
                           message: error.data.message
                       }
                   }
               );
           }, (error) => {
               console.log(error);
           }
       );
   }

    function remove(shipper) {
        shipperService.remove({shipperId: shipper.id},
            (response) => {
                vm.alert = {
                    type: "success",
                    message: "Shipper deleted!"
                };

                vm.shippers = vm.shippers.filter(item => item.id !== shipper.id);
            },
            (error) => {
                console.log(error);
                vm.alert = {
                    type: "danger",
                    message: error.data.message
                }
            }
        );
    }
    
    function closeMessage() {
        vm.alert = null;
    }
}