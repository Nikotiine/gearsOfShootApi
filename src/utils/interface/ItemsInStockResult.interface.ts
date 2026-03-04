import { CodeError } from '../../enum/code-error.enum';

export interface ItemsInStockResult {
  isInStock: boolean;
  codeError: CodeError;
}
