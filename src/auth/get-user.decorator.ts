import { createParamDecorator } from '@nestjs/common';

const GetUser = createParamDecorator((_, req) => {
  return req.user;
});
