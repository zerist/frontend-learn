import Vue from 'vue';
import validator from "@/directives/validator";
import dropdown from "@/directives/dropdown";
import title from "@/directives/title";

Vue.directive('validator', validator)
Vue.directive('dropdown', dropdown)
Vue.directive('title', title)