<script setup lang="ts">
import { defineProps } from 'vue';
import { IonText } from '@ionic/vue';
defineProps({
  entity: {
    type: String,
    required: true
  }
});
</script>
<template>
<div class="ion-text-center">
  <ion-text color="medium">
    <h4 color="medium">No se encuentran {{ entity }} registrados</h4>
  </ion-text>
</div>    
</template>