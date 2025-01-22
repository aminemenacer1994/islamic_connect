<!-- resources/js/components/TinymceEditor.vue -->
<template>
  <div>
    <!-- <textarea ref="editor">{{ modelValue }}</textarea> -->
  </div>
</template>

<script defer>
import tinymce from 'tinymce/tinymce';


export default {
  props: {
    modelValue: String,
  },
  data() {
    return {
      editor: null,
    };
  },
  watch: {
    modelValue(val) {
      if (this.editor && this.editor.getContent() !== val) {
        this.editor.setContent(val);
      }
    },
  },
  mounted() {
    tinymce.init({
      target: this.$refs.editor,
      plugins: 'paste link',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
      setup: (editor) => {
        this.editor = editor;
        editor.on('init', () => {
          editor.setContent(this.modelValue || '');
        });
        editor.on('Change KeyUp', () => {
          const content = editor.getContent();
          if (content !== this.modelValue) {
            this.$emit('update:modelValue', content);
          }
        });
      },
    });
  },
  beforeUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
  },
};
</script>
