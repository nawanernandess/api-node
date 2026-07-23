import 'dotenv/config';

import fastify from 'fastify';
import { ZodError } from 'zod';
import { createUsers } from './routes/create-users.js';
import { deleteUsers } from './routes/delete-users.js';
import { getUsers } from './routes/get-users.js';
import { patchUsers } from './routes/patch-users.js';

const server = fastify();

server.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error', issues: error.issues });
  }

  return reply.status(500).send({ message: 'Internal server error' });
});

server.register(createUsers);
server.register(getUsers);
server.register(patchUsers);
server.register(deleteUsers);

await server.listen({ port: 8080 });
