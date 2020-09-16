import Vue from 'vue'
import Message from "@/components/Message";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import Slider from "@/components/Slider";

const components = {
    Message,
    Modal,
    Pagination,
    Slider
}

for (const [key, value] of Object.entries(components)) {
    Vue.component(key, value)
}