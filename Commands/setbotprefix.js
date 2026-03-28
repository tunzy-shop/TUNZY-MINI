/**
 * Set Bot Prefix Command
 * Owner only - Changes bot command prefix
 * TUNZY MD MINI©
 */

const { makeIsOwner } = require('../lib/isOwner');
const fs = require('fs');
const path = require('path');

const settingsFile = path.join(__dirname, '../settings.js');

module.exports = async function setbotprefix(sock, chatId, message, args) {
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
                text: '❌ *Please provide a prefix!*\n\n📌 *Usage:*\n```.setbotprefix !```\n```.setbotprefix .```\n\n_TUNZY MD MINI©_'
            }, { quoted: message });
            return;
        }

        const newPrefix = args[0];
        
        if (newPrefix.length > 3) {
            await sock.sendMessage(chatId, {
                text: '❌ *Prefix must be 1-3 characters!*\n\n_TUNZY MD MINI©_'
            }, { quoted: message });
            return;
        }
        
        try {
            // Update global prefix
            const settings = require('../settings');
            settings.prefix = newPrefix;
            
            // Update settings.js file
            let settingsContent = fs.readFileSync(settingsFile, 'utf8');
            settingsContent = settingsContent.replace(
                /prefix: '.*?'/,
                `prefix: '${newPrefix.replace(/'/g, "\\'")}'`
            );
            fs.writeFileSync(settingsFile, settingsContent);
            
            await sock.sendMessage(chatId, {
                text: `✓ *Bot prefix updated successfully!*\n\n📌 *New prefix:* \`${newPrefix}\`\n\n_TUNZY MD MINI©_`
            }, { quoted: message });
            
        } catch (error) {
            await sock.sendMessage(chatId, {
                text: '❌ *Failed to update bot prefix!*\n\n_TUNZY MD MINI©_'
            }, { quoted: message });
        }

    } catch (error) {
        console.error('Error in setbotprefix command:', error);
        await sock.sendMessage(chatId, {
            text: '❌ *An error occurred while processing your request!*\n\n_TUNZY MD MINI©_'
        }, { quoted: message });
    }
};