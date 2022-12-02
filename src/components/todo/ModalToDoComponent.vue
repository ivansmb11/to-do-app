<script setup lang="ts">
import { PropType, defineProps, ref, onMounted, watch } from 'vue';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonCheckbox,
  modalController
} from '@ionic/vue';
import ToDo from '@/models/todo/ToDo';
import { useAuth } from '@/hooks/useAuth';
import { useToDo } from '@/hooks/useToDo';
import Status from '@/models/todo/Status';
const { loggedUserId } = useAuth();
const { createToDo, updateToDo } = useToDo();
const props = defineProps({
  toDo: {
    type: Object as PropType<ToDo>,
    required: false
  },
  onSave: {
    type: Function as PropType<() => void>,
    required: false
  }
});
const toDoForm = ref({
  title: '',
  description: '',
  status: Status.Pending
});

const completed = ref(false);

const closeModal = () => {
  modalController.dismiss();
};
const saveToDo = async () => {
  const { ok } = props.toDo
    ? await updateToDo(props.toDo.id, toDoForm.value)
    : await createToDo(loggedUserId.value, toDoForm.value);
  if (ok) {
    closeModal();
    props.onSave && props.onSave();
  }
};

watch(completed, () => {
  completed.value ?
    toDoForm.value.status = Status.Completed :
    toDoForm.value.status = Status.Pending;
  console.log(toDoForm.value.status);
});

onMounted(() => {
  if (props.toDo) toDoForm.value = props.toDo;
  if (props.toDo?.status === Status.Completed) completed.value = true;
});
</script>
<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="closeModal">Cancelar</ion-button>
      </ion-buttons>
      <ion-title>{{ props.toDo ? 'Actualizar' : 'Nuevo' }} to do</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="saveToDo">Guardar</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
      <ion-label position="stacked">Título</ion-label>
      <ion-input v-model="toDoForm.title" placeholder="Ingresa el título"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Descripción</ion-label>
      <ion-input v-model="toDoForm.description" placeholder="Ingresa la descripción"></ion-input>
    </ion-item>
    <ion-item v-if="props.toDo">
      <ion-checkbox v-model="completed" slot="start"></ion-checkbox>
      <ion-label>Completado</ion-label>
    </ion-item>
  </ion-content>
</template>