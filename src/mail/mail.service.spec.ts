import { Test } from '@nestjs/testing';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailService } from './mail.service';
import got from 'got';
import * as FormData from 'form-data';
// eslint-disable-next-line @typescript-eslint/no-empty-function
jest.mock('got', () => {});
jest.mock('form-data', () => {
  return {
    append: jest.fn(),
  };
});

describe('Mailervice', () => {
  let service: MailService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: CONFIG_OPTIONS,
          useValue: {
            apiKey: 'test-apiKey',
            domail: 'test-domain',
            fromEmail: 'test-fromEmail',
          },
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('sendEmail');
  it.todo('sendVerificationEmail');
});
