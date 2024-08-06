export const IoSetting = {
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
  cors: {
    origin: [process.env.CLIENT_URL, 'http://192.168.1.4:3000'],
    credentials: true,
  },
}
