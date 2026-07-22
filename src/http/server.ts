import 'dotenv/config';

import fastify from 'fastify';
import { ZodError } from 'zod';
import { createUser } from './routes/create-user.js';

const server = fastify();

server.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error', issues: error.issues });
  }

  return reply.status(500).send({ message: 'Internal server error' });
});

server.register(createUser);

await server.listen({ port: 8080 });
