﻿(function () {
  'use strict';

  angular
    .module('Theater.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.Theater', {
        abstract: true,
        url: '/Theater',
        template: '<ui-view/>'
      })
      .state('admin.Theater.list', {
        url: '',
        templateUrl: '/modules/Theater/client/views/admin/list-theaters.client.view.html',
        controller: 'TheatersAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.Theaters.create', {
        url: '/create',
        templateUrl: '/modules/Theater/client/views/admin/form-theaters.client.view.html',
        controller: 'TheatersAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          theatersResolve: newTheaters
        }
      })
      .state('admin.Theaters.edit', {
        url: '/:theaterId/edit',
        templateUrl: '/modules/theaters/client/views/admin/form-theaters.client.view.html',
        controller: 'TheatersAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: '{{ theatersResolve.title }}'
        },
        resolve: {
          theatersResolve: getTheater
        }
      });
  }

  getTheater.$inject = ['$stateParams', 'TheaterService'];

  function getTheater($stateParams, TheaterService) {
    return TheaterService.get({
      theaterId: $stateParams.theaterId
    }).$promise;
  }

  newTheater.$inject = ['TheaterService'];

  function newTheater(TheaterService) {
    return new TheaterService();
  }
}());
