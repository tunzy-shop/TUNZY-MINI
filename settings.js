require('dotenv').config();
module.exports = {
    botName:            'TunzyMD',
    botOwner:           'Tunzy',
    ownerNumber:        process.env.OWNER_NUMBER || '263788114185',
    prefix:             '.',
    packname:           'TunzyMD',
    author:             '© TunzyMD',
    version:            '2.0.0',
    commandMode:        'public',
    storeWriteInterval: 10000,
    warnLimit:          3,
};
