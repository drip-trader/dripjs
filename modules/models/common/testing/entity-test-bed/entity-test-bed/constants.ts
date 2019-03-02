import { MasterPairEntity, MasterSpotPairRepository } from '@dripjs/models';
import { ObjectType } from 'typeorm';

export const allEntityTypes: ObjectType<any>[] = [MasterPairEntity];

export const allRepositoryTypes: ObjectType<any>[] = [MasterSpotPairRepository];
