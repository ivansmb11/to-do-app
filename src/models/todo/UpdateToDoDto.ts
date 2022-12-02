import Status from '@/models/todo//Status';
interface UpdateToDoDto {
  title:       string,
  description: string,
  status:      Status
}
export default UpdateToDoDto;
