<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonFabButton,
  IonFab,
  modalController
} from '@ionic/vue';
import { add, logOutOutline } from 'ionicons/icons';
import ModalToDoComponent from '@/components/todo/ModalToDoComponent.vue';
import ToDoListComponent from '@/components/todo/ToDoListComponent.vue';
import { useAuth } from '@/hooks/useAuth';
import { useToDo } from '@/hooks/useToDo';
import { useUi } from '@/hooks/useUi';
import ToDo from '@/models/todo/ToDo';

const APP_NAME = process.env.VUE_APP_NAME;

const { loggedUserId, logout } = useAuth();
const { getToDosByUserId } = useToDo();
const router = useRouter();
const { setLoading } = useUi();

const toDos = ref<ToDo[]>([]);

const init = async() => {
  setLoading(true, 'Cargando todos...');
  await loadToDos();
  setLoading(false, '');
};

const loadToDos = async () => {
  const { ok, data } = await getToDosByUserId( loggedUserId.value );
  if ( ok ) toDos.value = data;
};

const onClick = (toDo: ToDo) => {
  openUpdateModal(toDo);
};

const onLogout = () => {
  logout();
  router.push({ name: 'log-in' })
};

const onSave = async() => {
  await loadToDos();
};

const openCreateModal = async () => {
  const modal = await modalController.create({
    component: ModalToDoComponent,
    componentProps: {
      onSave
    }
  });
  return modal.present();

};
const openUpdateModal = async ( toDo: ToDo ) => {
  const modal = await modalController.create({
    component: ModalToDoComponent,
    componentProps: {
     toDo
    }
  });
  return modal.present();
};

init();

</script>
<template>
  <ion-page id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="onLogout">
            <ion-icon :icon="logOutOutline" color="danger" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ APP_NAME }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ APP_NAME }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ToDoListComponent
        :toDos="toDos"
        @onClick="onClick"
        @onUpdate="openUpdateModal"
        @onRefresh="loadToDos"
      />
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="openCreateModal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>