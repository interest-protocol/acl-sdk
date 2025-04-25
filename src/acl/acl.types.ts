import {
  ObjectRef,
  Transaction,
  TransactionObjectArgument,
} from '@mysten/sui/transactions';

export type ObjectInput = TransactionObjectArgument | string | ObjectRef;

export type U64 = string | bigint | number;

export type StructTag = {
  address: string;
  module: string;
  name: string;
  typeParams: (string | StructTag)[];
};

export interface MaybeTx {
  tx?: Transaction;
}

export interface SignInArgs extends MaybeTx {
  admin: ObjectInput;
}

export interface SdkConstructorArgs {
  fullNodeUrl: string;
  otw: string;
  aclObjectId: string;
  aclInitialSharedVersion: string;
  package: string;
}

export interface NewAdminArgs extends MaybeTx {
  superAdmin: ObjectInput;
}

export interface NewAdminAndTransferArgs extends MaybeTx {
  superAdmin: ObjectInput;
  recipient: string;
}

export interface RevokeAdminArgs extends MaybeTx {
  superAdmin: ObjectInput;
  admin: string;
}

export interface DestroyAdminArgs extends MaybeTx {
  admin: ObjectInput;
}

export interface DestroySuperAdminArgs extends MaybeTx {
  superAdmin: ObjectInput;
}

export interface StartSuperAdminTransferArgs extends MaybeTx {
  superAdmin: ObjectInput;
  recipient: string;
}

export interface FinishSuperAdminTransferArgs extends MaybeTx {
  superAdmin: ObjectInput;
}

export interface IsAdminArgs {
  admin: string;
}
