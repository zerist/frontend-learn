import swal from "sweetalert";

export default {
    install: (Vue) => {
        swal.setDefaults({
            icon: 'warning',
            buttons: true
        })
        Vue.swal = swal
        Vue.prototype.$swal = swal
    }
}