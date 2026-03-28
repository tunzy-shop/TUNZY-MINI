/**
 * Help Command - TUNZY MD MINI Menu
 * Displays all available commands with categories
 * TUNZY MD MINI©
 */

const os = require('os');
const fs = require('fs');
const path = require('path');
const settings = require('../settings');

module.exports = async function help(sock, chatId, message, args) {
    try {
        const sender = message.key.participant || message.key.remoteJid;
        const senderName = message.pushName || sender.split('@')[0];
        
        const botName = global.botName || 'TUNZY MD MINI';
        const version = '1.0.0';
        const prefix = settings.prefix || '.';
        const platform = os.platform();
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        const uptimeStr = `${hours}h ${minutes}m ${seconds}s`;
        
        const ownerName = global.ownerName || 'Tunzy';
        
        const commandsDir = path.join(__dirname);
        let pluginCount = 0;
        try {
            const files = fs.readdirSync(commandsDir);
            pluginCount = files.filter(file => file.endsWith('.js')).length;
        } catch (e) {
            pluginCount = '∞';
        }
        
        let menu = `╭═════ *${botName}* ═════⊷\n`;
        menu += `✓ \`\`\`Hello : ${senderName}\`\`\`\n`;
        menu += `✓ \`\`\`Owner : ${ownerName}\`\`\`\n`;
        menu += `✓ \`\`\`Version : ${version}\`\`\`\n`;
        menu += `✓ \`\`\`Prefix : ${prefix}\`\`\`\n`;
        menu += `✓ \`\`\`Platform : ${platform}\`\`\`\n`;
        menu += `✓ \`\`\`Plugin : ${pluginCount}\`\`\`\n`;
        menu += `✓ \`\`\`Uptime : ${uptimeStr}\`\`\`\n`;
        menu += `╰═════════════════════⊷\n\n`;
        
        // DOWNLOADER SECTION
        menu += `╭━━━━❮ *DOWNLOADER* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}fb\` \`${prefix}facebook\`\n`;
        menu += `┃✓ \`${prefix}gitclone\`\n`;
        menu += `┃✓ \`${prefix}instagram\` \`${prefix}ig\`\n`;
        menu += `┃✓ \`${prefix}play\`\n`;
        menu += `┃✓ \`${prefix}tiktok\`\n`;
        menu += `┃✓ \`${prefix}video\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // AI SECTION
        menu += `╭━━━━❮ *AI* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}ai\` \`${prefix}ask\` \`${prefix}gpt\`\n`;
        menu += `┃✓ \`${prefix}deepseek\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // SETTINGS SECTION
        menu += `╭━━━━❮ *SETTINGS* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}anti-call\` \`${prefix}anticall\`\n`;
        menu += `┃✓ \`${prefix}antilink\`\n`;
        menu += `┃✓ \`${prefix}auto-recording\` \`${prefix}autorecording\`\n`;
        menu += `┃✓ \`${prefix}auto-reply\` \`${prefix}autoreply\`\n`;
        menu += `┃✓ \`${prefix}auto-seen\` \`${prefix}autoseen\`\n`;
        menu += `┃✓ \`${prefix}auto-typing\` \`${prefix}autotyping\`\n`;
        menu += `┃✓ \`${prefix}autoreact\`\n`;
        menu += `┃✓ \`${prefix}afk\`\n`;
        menu += `┃✓ \`${prefix}read-message\` \`${prefix}readmessage\`\n`;
        menu += `┃✓ \`${prefix}resetwarn\`\n`;
        menu += `┃✓ \`${prefix}setbotprefix\`\n`;
        menu += `┃✓ \`${prefix}setbotpic\`\n`;
        menu += `┃✓ \`${prefix}setbotname\`\n`;
        menu += `┃✓ \`${prefix}status-react\` \`${prefix}statusreact\`\n`;
        menu += `┃✓ \`${prefix}status-reply\` \`${prefix}statusreply\`\n`;
        menu += `┃✓ \`${prefix}welcome\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // OWNER SECTION
        menu += `╭━━━━❮ *OWNER* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}broadcast\` \`${prefix}bc\`\n`;
        menu += `┃✓ \`${prefix}vcf\`\n`;
        menu += `┃✓ \`${prefix}sudo\` \`${prefix}setsudo\`\n`;
        menu += `┃✓ \`${prefix}del\` \`${prefix}delsudo\`\n`;
        menu += `┃✓ \`${prefix}forward\`\n`;
        menu += `┃✓ \`${prefix}getpp\`\n`;
        menu += `┃✓ \`${prefix}leave\`\n`;
        menu += `┃✓ \`${prefix}setpp\` \`${prefix}setprofilepic\`\n`;
        menu += `┃✓ \`${prefix}mode\`\n`;
        menu += `┃✓ \`${prefix}update\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // TOOLS SECTION
        menu += `╭━━━━❮ *TOOLS* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}fancy\`\n`;
        menu += `┃✓ \`${prefix}hd\`\n`;
        menu += `┃✓ \`${prefix}quoted\`\n`;
        menu += `┃✓ \`${prefix}savecontact\`\n`;
        menu += `┃✓ \`${prefix}shazam\`\n`;
        menu += `┃✓ \`${prefix}tiktoksearch\`\n`;
        menu += `┃✓ \`${prefix}vv\` \`${prefix}viewonce\`\n`;
        menu += `┃✓ \`${prefix}removebg\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // GROUP SECTION
        menu += `╭━━━━❮ *GROUP* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}vcf\`\n`;
        menu += `┃✓ \`${prefix}leave\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // UTILITY SECTION
        menu += `╭━━━━❮ *UTILITY* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}jid\`\n`;
        menu += `┃✓ \`${prefix}repo\`\n`;
        menu += `┃✓ \`${prefix}screenshot\` \`${prefix}ssweb\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // MAIN SECTION
        menu += `╭━━━━❮ *MAIN* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}alive\`\n`;
        menu += `┃✓ \`${prefix}ping\`\n`;
        menu += `┃✓ \`${prefix}uptime\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // ADMIN SECTION
        menu += `╭━━━━❮ *ADMIN* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}demote\`\n`;
        menu += `┃✓ \`${prefix}mute-user\`\n`;
        menu += `┃✓ \`${prefix}unmute-user\`\n`;
        menu += `┃✓ \`${prefix}promote\`\n`;
        menu += `┃✓ \`${prefix}kick\`\n`;
        menu += `┃✓ \`${prefix}tagall\`\n`;
        menu += `┃✓ \`${prefix}tag\`\n`;
        menu += `┃✓ \`${prefix}mute\`\n`;
        menu += `┃✓ \`${prefix}unmute\`\n`;
        menu += `┃✓ \`${prefix}add\`\n`;
        menu += `┃✓ \`${prefix}acceptall\`\n`;
        menu += `┃✓ \`${prefix}rejectall\`\n`;
        menu += `┃✓ \`${prefix}antilink\`\n`;
        menu += `┃✓ \`${prefix}welcome\`\n`;
        menu += `┃✓ \`${prefix}goodbye\`\n`;
        menu += `┃✓ \`${prefix}setgpp\`\n`;
        menu += `┃✓ \`${prefix}setgname\`\n`;
        menu += `┃✓ \`${prefix}warn\`\n`;
        menu += `┃✓ \`${prefix}del\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // ANIME SECTION
        menu += `╭━━━━❮ *ANIME* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}awoo\`\n`;
        menu += `┃✓ \`${prefix}bite\`\n`;
        menu += `┃✓ \`${prefix}blush\`\n`;
        menu += `┃✓ \`${prefix}bonk\`\n`;
        menu += `┃✓ \`${prefix}bully\`\n`;
        menu += `┃✓ \`${prefix}cringe\`\n`;
        menu += `┃✓ \`${prefix}cry\`\n`;
        menu += `┃✓ \`${prefix}cuddle\`\n`;
        menu += `┃✓ \`${prefix}dance\`\n`;
        menu += `┃✓ \`${prefix}dog\`\n`;
        menu += `┃✓ \`${prefix}glomp\`\n`;
        menu += `┃✓ \`${prefix}hack\`\n`;
        menu += `┃✓ \`${prefix}handhold\`\n`;
        menu += `┃✓ \`${prefix}highfive\`\n`;
        menu += `┃✓ \`${prefix}hug\`\n`;
        menu += `┃✓ \`${prefix}img\`\n`;
        menu += `┃✓ \`${prefix}insult\`\n`;
        menu += `┃✓ \`${prefix}kill\`\n`;
        menu += `┃✓ \`${prefix}kiss\`\n`;
        menu += `┃✓ \`${prefix}lick\`\n`;
        menu += `┃✓ \`${prefix}nom\`\n`;
        menu += `┃✓ \`${prefix}pat\`\n`;
        menu += `┃✓ \`${prefix}poke\`\n`;
        menu += `┃✓ \`${prefix}slap\`\n`;
        menu += `┃✓ \`${prefix}wave\`\n`;
        menu += `┃✓ \`${prefix}wink\`\n`;
        menu += `┃✓ \`${prefix}yeet\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // MENU SECTION
        menu += `╭━━━━❮ *MENU* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}help\` \`${prefix}menu\`\n`;
        menu += `┃✓ \`${prefix}list\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // MISC SECTION
        menu += `╭━━━━❮ *MISC* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}lyrics\` \`${prefix}lyric\`\n`;
        menu += `┃✓ \`${prefix}play\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // DOWNLOAD SECTION
        menu += `╭━━━━❮ *DOWNLOAD* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}movie\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // PRIVACY SECTION
        menu += `╭━━━━❮ *PRIVACY* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}blocklist\`\n`;
        menu += `┃✓ \`${prefix}getbio\`\n`;
        menu += `┃✓ \`${prefix}getprivacy\`\n`;
        menu += `┃✓ \`${prefix}groupsprivacy\`\n`;
        menu += `┃✓ \`${prefix}privacy\`\n`;
        menu += `┃✓ \`${prefix}setmyname\`\n`;
        menu += `┃✓ \`${prefix}setonline\`\n`;
        menu += `┃✓ \`${prefix}setpp\`\n`;
        menu += `┃✓ \`${prefix}setppall\`\n`;
        menu += `┃✓ \`${prefix}updatebio\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // INFO SECTION
        menu += `╭━━━━❮ *INFO* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}savestatus\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // STICKER SECTION
        menu += `╭━━━━❮ *STICKER* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}sticker\` \`${prefix}s\`\n`;
        menu += `┃✓ \`${prefix}take\`\n`;
        menu += `┃✓ \`${prefix}vsticker\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // GAME SECTION
        menu += `╭━━━━❮ *GAME* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}ttt\`\n`;
        menu += `┃✓ \`${prefix}tttstop\`\n`;
        menu += `┃✓ \`${prefix}tod\`\n`;
        menu += `┃✓ \`${prefix}todstop\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // FOOTER
        menu += `╭━━━━❮ *TIPS* ❯━⊷\n`;
        menu += `┃✓ *Total Commands:* ${pluginCount}+\n`;
        menu += `┃✓ *Use:* \`${prefix}help <command>\` for details\n`;
        menu += `┃✓ *Powered by:* TUNZY MD MINI©\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n`;
        
        await sock.sendMessage(chatId, {
            text: menu,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: message });
        
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, {
            text: `❌ *Error displaying menu!*\n\n📌 *Error:* ${error.message}\n\n_TUNZY MD MINI©_`
        }, { quoted: message });
    }
};