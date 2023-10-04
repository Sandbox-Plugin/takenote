import noteCategoryHandler from '../handlers/noteCategory'

export function getNoteCategory(req: any, res: any, next: any) {
  noteCategoryHandler.getNoteCategory(req, res);
  }

  export function getAllNoteCategories(req: any, res: any, next: any) {
    noteCategoryHandler.getAllNoteCategories(req, res);
  }

  export function saveNoteCategory(req: any, res: any, next: any) {
    noteCategoryHandler.storeNoteCategory(req, res);
  }

  export function deleteNoteCategory(req: any, res: any, next: any) {
    noteCategoryHandler.deleteNoteCategory(req, res);
  }