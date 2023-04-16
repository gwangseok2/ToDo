export default class TodoItem {
  constructor(
    id,
    description,
    creatDttm,
    key = id,
    status = 'progress',
    completeDttm
  ) {
    this.id = id;
    this.description = description;
    this.creatDttm = creatDttm;
    this.key = key;
    this.status = status;
    this.completeDttm = completeDttm;
  }

  completeItem() {
    this.completeDttm = new Date().getTime();
    this.status = 'complete';
  }

  cancelItem() {
    this.completeDttm = null;
    this.status = 'progress';
  }
}