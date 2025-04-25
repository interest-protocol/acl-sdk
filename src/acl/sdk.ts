import { SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { has } from 'ramda';

import { ObjectInput, SdkConstructorArgs, SignInArgs } from './acl.types';

export class SDK {
  #rpcUrl: string;
  otw: string;
  aclObjectId: string;
  aclInitialSharedVersion: string;
  package: string;
  client: SuiClient;

  constructor(data: SdkConstructorArgs) {
    this.#rpcUrl = data.fullNodeUrl;

    this.client = new SuiClient({ url: data.fullNodeUrl });
    this.otw = data.otw;
    this.aclObjectId = data.aclObjectId;
    this.aclInitialSharedVersion = data.aclInitialSharedVersion;
    this.package = data.package;
  }

  public rpcUrl() {
    return this.#rpcUrl;
  }

  signIn({ tx = new Transaction(), admin }: SignInArgs) {
    const authWitness = tx.moveCall({
      package: this.package,
      module: 'access_control',
      function: 'sign_in',
      arguments: [
        tx.sharedObjectRef({
          objectId: this.aclObjectId,
          initialSharedVersion: this.aclInitialSharedVersion,
          mutable: false,
        }),
        this.ownedObject(tx, admin),
      ],
    });

    return {
      tx,
      authWitness,
    };
  }

  ownedObject(tx: Transaction, obj: ObjectInput) {
    if (has('objectId', obj) && has('version', obj) && has('digest', obj)) {
      return tx.objectRef(obj);
    }

    return typeof obj === 'string' ? tx.object(obj) : obj;
  }
}
