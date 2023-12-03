export interface NotesInterface {
  id?: string,
  title: string,
  description: string,
  date_created?: string,
  state?: ('pendiente'|'completada'),
  final_note?: number,
}