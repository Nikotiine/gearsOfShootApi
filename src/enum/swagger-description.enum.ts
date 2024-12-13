export enum SwaggerDescription {
  FIND_ALL = 'all',
  FIND_ALL_SUMMARY = 'Liste complète',
  FIND_BY_ID = 'by/id/:id',
  ID_PARAM = 'id',
  FIND_BY_ID_SUMMARY = 'Filtré par id',
  FIND_BY_CATEGORY = 'by/category/:categoryId',
  FIND_BY_CATEGORY_PARAM = 'categoryId',
  FIND_BY_CATEGORY_SUMMARY = 'Filtré par categorie',
  FIND_BY_FACTORY = 'by/factory/:factoryId',
  FIND_BY_FACTORY_PARAM = 'factoryId',
  FIND_BY_FACTORY_SUMMARY = 'Filtré par maruqe',
  CREATE_SUMMARY = 'Creation',
  UPDATE_SUMMARY = 'Edition',
  ID = ':id',
  DELETE_SUMMARY = 'Suppresion logique',
}
