import { ObjectType } from 'typeorm';

import { MasterPairEntity, MasterSpotPairRepository } from '../../../entity';

export const allEntityTypes: ObjectType<any>[] = [MasterPairEntity];

export const allRepositoryTypes: ObjectType<any>[] = [MasterSpotPairRepository];
