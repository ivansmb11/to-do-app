import axios from 'axios';
import toDoApi from '@/api/toDoApi';
import NewToDoDto from '@/models/todo/NewToDoDto';
import UpdateToDoDto from '@/models/todo/UpdateToDoDto';

export const useToDo = () => {
  
  const getToDosByUserId = async( userId: number ) => {
    try {
      const { data } = await toDoApi.get(`/${userId}`);
      return { ok: true, data };
    } catch ( error ) {
      if ( axios.isAxiosError( error ) ) {
        const { message } = error.response?.data as any || 'An error has occurred';
        return { ok: false, message };
      } else {
        return { ok: false, message: 'An error has occurred' };
      }
    }
  }

  const createToDo = async( id: string, newToDoDto: NewToDoDto ) => {
    try {
      await toDoApi.post(`/${id}`, newToDoDto);
      return { ok: true, message: 'Todo has been created' }
    } catch ( error ) {
      if ( axios.isAxiosError( error ) ) {
        const { message } = error.response?.data as any || 'An error has occurred';
        return { ok: false, message };
      } else {
        return { ok: false, message: 'An error has ocurred' };
      }
    }
  }

  const updateToDo = async( id: string, updateToDoDto: UpdateToDoDto ) => {
    try {
      await toDoApi.put(`/${id}`, updateToDoDto);
      return { ok: true, message: 'Todo has been updated' }
    } catch ( error ) {
      if ( axios.isAxiosError( error ) ) {
        const { message } = error.response?.data as any || 'An error has occurred';
        return { ok: false, message };
      } else {
        return { ok: false, message: 'An error has ocurred' };
      }
    }
  }
  
  return {
    getToDosByUserId,
    createToDo,
    updateToDo
  }
}