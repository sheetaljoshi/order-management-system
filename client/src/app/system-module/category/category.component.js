export default {
    bindings: {
        categories: '<'
    },
    controller: Controller,
    template: require('./category.component.html'),
}

function Controller(categoryService, $uibModal) {
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
           component: 'categoryCreate',
           size: 'lg'
       });

       modalInstance.result.then(
           (data) => {
               categoryService.save(data,
                   (response) => {
                       vm.alert = {
                           type: "success",
                           message: "Category created!"
                       };

                       vm.categories.push(response);
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
   
   function update(category) {
       const modalInstance = $uibModal.open({
           animation: false,
           component: 'categoryUpdate',
           size: 'lg'
       });
       modalInstance.category = angular.copy(category);

       modalInstance.result.then(
           (data) => {
               categoryService.update({categoryId: data.id}, data,
                   (response) => {
                       vm.alert = {
                           type: "success",
                           message: "Category updated!"
                       };

                       const index = vm.categories.findIndex(item => item.id === data.id);
                       vm.categories[index] = data;
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

    function remove(category) {
        categoryService.remove({categoryId: category.id},
            (response) => {
                vm.alert = {
                    type: "success",
                    message: "Category deleted!"
                };

                vm.categories = vm.categories.filter(item => item.id !== category.id);
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