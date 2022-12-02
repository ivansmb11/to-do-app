<script setup lang="ts">
import { defineProps, defineEmits, PropType } from 'vue';
import { 
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem
} from '@ionic/vue';
import ToDo from '@/models/todo/ToDo';
defineProps({
  toDo: {
    type: Object as PropType<ToDo>,
    required: true
  }
});
const emit = defineEmits(['onClick', 'onDelete', 'onUpdate']);
</script>
<template>
  <ion-item @click="emit('onClick')">
    <ion-card class="ion-no-margin" style="width:100%;">
      <ion-card-header>
        <ion-card-subtitle>
          {{ toDo.date }}
        </ion-card-subtitle>
        <ion-card-title>{{ toDo.title }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <p>{{ toDo.description }}</p>
      </ion-card-content>
    </ion-card>
  </ion-item>
</template>