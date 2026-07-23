import type { FastifyPluginCallback } from 'fastify';
import z from 'zod';
import { prisma } from '../lib/prisma.js';

export const deleteUsers: FastifyPluginCallback = (app, _opts, done) => {
  app.delete('/users/:id', async (request, reply) => {
    const deleteUserParams = z.object({
      id: z.uuid('Invalid user id'),
    });

    const { id } = deleteUserParams.parse(request.params);

    const user = await prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }

    await prisma.users.delete({
      where: { id },
    });

    return reply.status(204).send();
  });

  done();
};
