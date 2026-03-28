/**
 * Set Bot Name Command
 * Owner only - Changes bot's display name
 * TUNZY MD MINI©
 */

const { makeIsOwner } = require('../lib/isOwner');
const fs = require('fs');
const path = require('path');

const settingsFile = path.join(__dirname, '../settings.js');

module.exports = async function setbotname(sock, chatId, message, args) {
    try {
        const senderId = message.key.participant || message.key.remoteJid;
        const isOwnerFn = makeIsOwner(sock._ownerPhone || '');
        
        if (!await isOwnerFn(senderId, sock, chatId) && !message.key.fromMe) {
            await sock.sendMessage(chatId, {
                text: '❌ *This command is only for the bot owner!*\n\n_TUNZY MD MINI©_'
            }, { quoted: message });
            return;
        }

        if (!args.length) {
            await sock.sendMessage(chatId, {
                text: '❌ *Please provide a bot name!*\n\n📌 *Usage:*\n```.setbotname My Awesome Bot```\n\n_TUNZY MD MINI©_'
            }, { quoted: message });
            return;
        }

        const newName = args.join(' ');
        
        try {
            // Update global bot name
            global.botName = newName;
            
            // Update settings.js file
            let settingsContent = fs.readFileSync(settingsFile, 'utf8');
            settingsContent = settingsContent.replace(
                /botName: '.*?'/,
                `botName: '${newName.replace(/'/g, "\\'")}'`
            );
            fs.writeFileSync(settingsFile, settingsContent);
            
            // Try to update WhatsApp business profile name
            try {
                await sock.updateProfileName(newName);
            } catch (e) {
                // Some WhatsApp accounts may not support this
                console.log('Could not update profile name:', e.message);
            }
            
            await sock.sendMessage(chatId, {
                text: `✓ *Bot name updated successfully!*\n\n📌 *New name:* ${newName}\n\n_TUNZY MD MINI©_`
            }, { quoted: message });
            
        } catch (error) {
            await sock.sendMessage(chatId, {
                text: '❌ *Failed to update bot name!*\n\n_TUNZY MD MINI©_'
            }, { quoted: message });
        }

    } catch (error) {
        console.error('Error in setbotname command:', error);
        await sock.sendMessage(chatId, {
            text: '❌ *An error occurred while processing your request!*\n\n_TUNZY MD MINI©_'
        }, { quoted: message });
    }
};