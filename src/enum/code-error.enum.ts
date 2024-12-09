export enum CodeError {
  // USER ERROR 0000 TO 0099
  EMAIL_IS_USED = '0001',
  BAD_CREDENTIAL = '0002',
  // AMMUNITION ERROR 0100 TO 0199
  AMMUNITION_BODY_TYPE_NAME_USED = '0100',
  AMMUNITION_HEAD_TYPE_NAME_USED = '0101',
  AMMUNITION_IS_EXIST = '0102',
  AMMUNITION_UPDATE_FAILED = '0103',
  AMMUNITION_BODY_TYPE_UPDATE_FAILED = '0104',
  AMMUNITION_HEAD_TYPE_UPDATE_FAILED = '0105',
  // WEAPON ERROR 0200 TO 0299
  WEAPON_TYPE_NAME_USED = '0200',
  WEAPON_IS_EXIST = '0201',
  WEAPON_MAGAZINE_UPDATE_FAILED = '0202',
  WEAPON_TYPE_UPDATE_FAILED = '0203',
  WEAPON_UPDATE_FAILED = '0204',
  WEAPON_NOT_FOUND = '0205',

  // OPTIC ERROR 0300 TO 0399
  OPTIC_TYPE_UPDATE_FAILED = '0300',
  OPTIC_UPDATE_FAILED = '0301',
  // RDS ERROR 0400 TO 0499
  SOUND_NOISE_REDUCER_UPDATE_FAILED = '0400',
  // CALIBER ERROR 500 TO 599
  CALIBER_NAME_IS_USED = '0500',
  CALIBER_UPDATE_FAILED = '0501',
  // FACTORY ERROR 600 TO 699,
  FACTORY_NAME_IS_USED = '0600',
  FACTORY_UPDATE_FAILED = '0601',
  // THREAD SIZE 700 TO 799
  THREAD_SIZE_IS_USED = '0700',
  THREAD_UPDATE_FAILED = '0701',
}
