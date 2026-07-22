import type { FastifyPluginCallback } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

export const createUser: FastifyPluginCallback = (app, _opts, done) => {
  app.post('/user', async (request, reply) => {
    const createUserBody = z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.email('Invalid email address'),
    });

    const { name, email } = createUserBody.parse(request.body);
    const user = await prisma.users.create({
      data: {
        name,
        email,
      },
    });

    return reply.status(201).send({ userId: user.id });
  });

  done();
};
