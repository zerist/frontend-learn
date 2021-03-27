<template>
  <div class="home">
    <SingleFile>{upload_button_text}</SingleFile>
  </div>
</template>

<script>
// @ is an alias to /src
import SingleFile from '../components/upload/singleFile'

export default {
  name: 'Home',
  components: {
    SingleFile
  },
  data() {
    return {
      upload_button_text: 'upload'
    }
  },
}
</script>
