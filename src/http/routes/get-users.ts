import type { FastifyPluginCallback } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

export const getUsers: FastifyPluginCallback = (app, _opts, done) => {
  app.get('/users', async (_request, reply) => {
    const users = await prisma.users.findMany();
    return reply.status(200).send(users);
  });

  app.get('/users/:id', async (request, reply) => {
    const getUserParams = z.object({
      id: z.uuid('Invalid user id'),
    });

    const { id } = getUserParams.parse(request.params);
    const user = await prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }

    return reply.status(200).send(user);
  });

  done();
};
