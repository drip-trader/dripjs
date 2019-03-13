import { INestApplication } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test, TestingModule } from '@nestjs/testing';

export async function createNestTestApplication(metadata: ModuleMetadata): Promise<INestApplication> {
  const testingModule = await Test.createTestingModule(metadata).compile();

  return testingModule.createNestApplication();
}
