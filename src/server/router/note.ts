import noteHandler from '../handlers/note'

export function getNote(req: any, res: any, next: any) {
    noteHandler.get(req, res);
  }

  export function getAllNotes(req: any, res: any, next: any) {
    noteHandler.getAll(req, res);
  }

  export function saveNote(req: any, res: any, next: any) {
    noteHandler.store(req, res);
  }

  export function deleteNote(req: any, res: any, next: any) {
    noteHandler.delete(req, res);
  }