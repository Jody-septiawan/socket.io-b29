// import models here
const { chat, user, profile } = require('../../models');

const socketIo = (io) => {
  io.on('connection', (socket) => {
    console.log('client connect: ', socket.id);

    // code here
    socket.on('load admin contact', async () => {
      try {
        const adminContact = await user.findOne({
          where: {
            status: 'admin',
          },
          include: {
            model: profile,
            as: 'profile',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        });

        socket.emit('admin contact', adminContact);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on('load customer contact', async () => {
      try {
        const customerContact = await user.findAll({
          where: {
            status: 'customer',
          },
          include: [
            {
              model: profile,
              as: 'profile',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
            {
              model: chat,
              as: 'recipientMessage',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'idRecipient', 'idSender'],
              },
            },
            {
              model: chat,
              as: 'senderMessage',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'idRecipient', 'idSender'],
              },
            },
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        });

        socket.emit('customer contact', customerContact);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on('disconnect', () => {
      console.log('client disconnect');
    });
  });
};

module.exports = socketIo;
