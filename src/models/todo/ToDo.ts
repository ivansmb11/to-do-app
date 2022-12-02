import Status from '@/models/todo/Status';
interface ToDo {
  id:          string,
  title:       string,
  description: string,
  date:        string,
  status:      Status
}
export default ToDo;
