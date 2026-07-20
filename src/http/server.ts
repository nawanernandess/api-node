import fastify from 'fastify';

const server = fastify();

server.get('/', () => {
  return 'Hello, World!';
});

await server.listen({ port: 8080 });
