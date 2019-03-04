import { ObjectType } from 'typeorm';

import { MasterPairEntity, MasterPairRepository } from '../../../entity';

export const allEntityTypes: ObjectType<any>[] = [MasterPairEntity];

export const allRepositoryTypes: ObjectType<any>[] = [MasterPairRepository];
