<script setup lang="ts">
import { defineEmits, defineProps, PropType, onUpdated } from 'vue';
import NoRecordsMessageComponent from '@/components/shared/NoRecordsMessageComponent.vue';
import ToDoComponent from '@/components/todo/ToDoComponent.vue';
import { useUi } from '@/hooks/useUi';
import ToDo from '@/models/todo/ToDo';
defineProps({
  toDos: {
    type: Array as PropType<ToDo[]>,
    required: true
  }
});
const emit = defineEmits(['onClick', 'onDelete', 'onUpdate', 'onRefresh']);
const { loading } = useUi();
onUpdated(() => {
  emit('onRefresh');
});
</script>
<template>
  <NoRecordsMessageComponent entity="to dos" v-if="(toDos.length===0)&&(!loading.show)" />
  <ToDoComponent
    v-else
    v-for="(toDo, index) in toDos"
    @onClick="emit('onClick', toDo)"
    @onDelete="emit('onDelete', toDo.id)"
    @onUpdate="emit('onUpdate', toDo)"
    :key="index"
    :toDo="toDo"
  />
</template>