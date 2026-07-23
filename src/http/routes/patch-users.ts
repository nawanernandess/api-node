import type { FastifyPluginCallback } from 'fastify';
import z from 'zod';
import { prisma } from '../lib/prisma.js';

export const patchUsers: FastifyPluginCallback = (app, _opts, done) => {
  app.patch('/users/:id', async (request, reply) => {
    const patchUserParams = z.object({
      id: z.uuid('Invalid user id'),
    });

    const patchUserBody = z.object({
      phone: z.string().optional(),
      description: z.string().optional(),
      isUserAdmin: z.boolean().optional(),
    });

    const { id } = patchUserParams.parse(request.params);
    const { phone, description, isUserAdmin } = patchUserBody.parse(request.body);

    const user = await prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }

    await prisma.users.update({
      where: { id },
      data: {
        ...(phone !== undefined && { phone }),
        ...(description !== undefined && { description }),
        ...(isUserAdmin !== undefined && { isUserAdmin }),
      },
    });

    return reply.status(200).send();
  });

  done();
};
