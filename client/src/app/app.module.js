import style from './../style.css'

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import system from './system-module/system.module';
import config from './app.config';
import greeting from './greeting/greeting.component';

angular.module('app', [uiRouter, system])
    .config(config)
    .component('greeting', greeting);