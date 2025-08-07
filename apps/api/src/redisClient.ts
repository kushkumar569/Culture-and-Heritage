
const { createClient } = require('redis');

// Create Redis client
const redisClients = createClient({
  url: 'redis://172.26.252.247:6379', // Ensure Redis is running at this URL
});
redisClients.on('error', (err: any) => console.error('Redis Client Error', err));
(async () => {
  await redisClients.connect();
})();
module.exports = redisClients;
