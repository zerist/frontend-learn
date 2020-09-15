import Vue from 'vue'
import Message from "@/components/Message";
import Modal from "@/components/Modal";


const components = {
    Message,
    Modal
}

for (const [key, value] of Object.entries(components)) {
    Vue.component(key, value)
}