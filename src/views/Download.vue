<template>
  <div class="home">
    Download
    <button @click="download">Download</button>
  </div>
</template>

<script>
import FileTransfer from '@/services/FileTransfer'

export default {
  name: 'Download',
  components: {
  },
  methods: {
    download () {
      FileTransfer.downloadFile({
        filename: 'run.exe',
        url: 'http://51.15.228.31:8080/api/client/patches/run.exe',
        absolutePath: '/home/user/Games/test/'
      })
    }
  }
}
</script>
