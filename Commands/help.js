/**
 * Help Command - TunzyMD Menu
 * ✅ Displays all available commands with categories
 * ✅ TunzyMD© Signature
 */

const os = require('os');
const fs = require('fs');
const path = require('path');
const settings = require('../settings');

module.exports = async function help(sock, chatId, message, args) {
    try {
        const sender = message.key.participant || message.key.remoteJid;
        const senderName = message.pushName || sender.split('@')[0];
        
        // Get bot info
        const botName = global.botName || 'TunzyMD';
        const version = '1.0.0';
        const prefix = settings.prefix || '.';
        const platform = os.platform();
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        const uptimeStr = `${hours}h ${minutes}m ${seconds}s`;
        
        // Get owner name from config
        const ownerName = global.ownerName || 'Tunzy';
        
        // Get plugin count
        const commandsDir = path.join(__dirname);
        let pluginCount = 0;
        try {
            const files = fs.readdirSync(commandsDir);
            pluginCount = files.filter(file => file.endsWith('.js')).length;
        } catch(e) {
            pluginCount = '∞';
        }
        
        // Menu header
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
        menu += `┃✓ \`${prefix}play\` \`${prefix}play2\`\n`;
        menu += `┃✓ \`${prefix}tiktok\` \`${prefix}tiktokaudio\`\n`;
        menu += `┃✓ \`${prefix}video\` \`${prefix}image\`\n`;
        menu += `┃✓ \`${prefix}movie\`\n`;
        menu += `┃✓ \`${prefix}song\` \`${prefix}song2\`\n`;
        menu += `┃✓ \`${prefix}twitter\` \`${prefix}tw\`\n`;
        menu += `┃✓ \`${prefix}pin\` \`${prefix}apk\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // AI SECTION
        menu += `╭━━━━❮ *AI* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}ai\` \`${prefix}ask\` \`${prefix}gpt\`\n`;
        menu += `┃✓ \`${prefix}deepseek\`\n`;
        menu += `┃✓ \`${prefix}teach\`\n`;
        menu += `┃✓ \`${prefix}translate2\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // SETTINGS SECTION
        menu += `╭━━━━❮ *SETTINGS* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}anticall\` \`${prefix}anti-call\`\n`;
        menu += `┃✓ \`${prefix}antilink\`\n`;
        menu += `┃✓ \`${prefix}autorecording\`\n`;
        menu += `┃✓ \`${prefix}autoreply\` \`${prefix}ar\`\n`;
        menu += `┃✓ \`${prefix}autoseen\` \`${prefix}auto-seen\`\n`;
        menu += `┃✓ \`${prefix}autotyping\`\n`;
        menu += `┃✓ \`${prefix}autoreact\`\n`;
        menu += `┃✓ \`${prefix}afk\`\n`;
        menu += `┃✓ \`${prefix}readmessage\` \`${prefix}read-message\`\n`;
        menu += `┃✓ \`${prefix}resetwarn\`\n`;
        menu += `┃✓ \`${prefix}setprefix\`\n`;
        menu += `┃✓ \`${prefix}statusreact\`\n`;
        menu += `┃✓ \`${prefix}statusreply\`\n`;
        menu += `┃✓ \`${prefix}welcome\` \`${prefix}goodbye\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // OWNER SECTION
        menu += `╭━━━━❮ *OWNER* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}bc\` \`${prefix}broadcast\`\n`;
        menu += `┃✓ \`${prefix}vcf\`\n`;
        menu += `┃✓ \`${prefix}setsudo\` \`${prefix}delsudo\`\n`;
        menu += `┃✓ \`${prefix}forward\`\n`;
        menu += `┃✓ \`${prefix}getpp\`\n`;
        menu += `┃✓ \`${prefix}leave\` \`${prefix}join\`\n`;
        menu += `┃✓ \`${prefix}setpp\` \`${prefix}setbotimage\`\n`;
        menu += `┃✓ \`${prefix}mode\`\n`;
        menu += `┃✓ \`${prefix}update\`\n`;
        menu += `┃✓ \`${prefix}restart\` \`${prefix}shutdown\`\n`;
        menu += `┃✓ \`${prefix}block\` \`${prefix}unblock\`\n`;
        menu += `┃✓ \`${prefix}setbio\` \`${prefix}setbotname\`\n`;
        menu += `┃✓ \`${prefix}react\` \`${prefix}online\`\n`;
        menu += `┃✓ \`${prefix}tostatus\` \`${prefix}toviewonce\`\n`;
        menu += `┃✓ \`${prefix}groupid\` \`${prefix}disk\`\n`;
        menu += `┃✓ \`${prefix}autosavestatus\`\n`;
        menu += `┃✓ \`${prefix}lastseen\` \`${prefix}freezelastseen\`\n`;
        menu += `┃✓ \`${prefix}unblockall\` \`${prefix}vv2\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // TOOLS SECTION
        menu += `╭━━━━❮ *TOOLS* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}fancy\` \`${prefix}fliptext\`\n`;
        menu += `┃✓ \`${prefix}hd\` \`${prefix}remini\`\n`;
        menu += `┃✓ \`${prefix}quoted\` \`${prefix}say\`\n`;
        menu += `┃✓ \`${prefix}savecontact\`\n`;
        menu += `┃✓ \`${prefix}shazam\`\n`;
        menu += `┃✓ \`${prefix}tiktoksearch\`\n`;
        menu += `┃✓ \`${prefix}vv\` \`${prefix}viewonce\`\n`;
        menu += `┃✓ \`${prefix}removebg\`\n`;
        menu += `┃✓ \`${prefix}tinyurl\` \`${prefix}ssweb\`\n`;
        menu += `┃✓ \`${prefix}getabout\` \`${prefix}browse\`\n`;
        menu += `┃✓ \`${prefix}texttopdf\` \`${prefix}genpass\`\n`;
        menu += `┃✓ \`${prefix}tourl\` \`${prefix}wallpaper\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // GROUP SECTION
        menu += `╭━━━━❮ *GROUP* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}group\` \`${prefix}leavegroup\`\n`;
        menu += `┃✓ \`${prefix}add\` \`${prefix}kick\`\n`;
        menu += `┃✓ \`${prefix}promote\` \`${prefix}demote\`\n`;
        menu += `┃✓ \`${prefix}tagall\` \`${prefix}tag\` \`${prefix}hidetag\`\n`;
        menu += `┃✓ \`${prefix}mute\` \`${prefix}unmute\`\n`;
        menu += `┃✓ \`${prefix}lock\` \`${prefix}unlock\`\n`;
        menu += `┃✓ \`${prefix}setname\` \`${prefix}setdesc\`\n`;
        menu += `┃✓ \`${prefix}getlink\` \`${prefix}resetlink\`\n`;
        menu += `┃✓ \`${prefix}announce\` \`${prefix}invite\`\n`;
        menu += `┃✓ \`${prefix}open\` \`${prefix}close\`\n`;
        menu += `┃✓ \`${prefix}groupinfo\` \`${prefix}admins\`\n`;
        menu += `┃✓ \`${prefix}topmembers\` \`${prefix}totalmembers\`\n`;
        menu += `┃✓ \`${prefix}kickinactive\` \`${prefix}vcf\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // UTILITY SECTION
        menu += `╭━━━━❮ *UTILITY* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}jid\` \`${prefix}userid\`\n`;
        menu += `┃✓ \`${prefix}repo\`\n`;
        menu += `┃✓ \`${prefix}screenshot\` \`${prefix}ssweb\`\n`;
        menu += `┃✓ \`${prefix}time\` \`${prefix}weather\`\n`;
        menu += `┃✓ \`${prefix}calc\` \`${prefix}math\`\n`;
        menu += `┃✓ \`${prefix}qr\` \`${prefix}qrcode\`\n`;
        menu += `┃✓ \`${prefix}country\` \`${prefix}currency\`\n`;
        menu += `┃✓ \`${prefix}github\` \`${prefix}gh\`\n`;
        menu += `┃✓ \`${prefix}encode\` \`${prefix}decode\`\n`;
        menu += `┃✓ \`${prefix}reverse\` \`${prefix}upper\` \`${prefix}lower\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // MAIN SECTION
        menu += `╭━━━━❮ *MAIN* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}alive\`\n`;
        menu += `┃✓ \`${prefix}ping\` \`${prefix}ping2\`\n`;
        menu += `┃✓ \`${prefix}uptime\` \`${prefix}runtime\`\n`;
        menu += `┃✓ \`${prefix}owner\` \`${prefix}pair\`\n`;
        menu += `┃✓ \`${prefix}help\` \`${prefix}menu\` \`${prefix}list\`\n`;
        menu += `┃✓ \`${prefix}botstatus\` \`${prefix}repo\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // ADMIN SECTION
        menu += `╭━━━━❮ *ADMIN* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}demote\` \`${prefix}promote\`\n`;
        menu += `┃✓ \`${prefix}mute-user\` \`${prefix}unmute-user\`\n`;
        menu += `┃✓ \`${prefix}kick\` \`${prefix}kickall\`\n`;
        menu += `┃✓ \`${prefix}tagall\` \`${prefix}tag\`\n`;
        menu += `┃✓ \`${prefix}mute\` \`${prefix}unmute\`\n`;
        menu += `┃✓ \`${prefix}add\` \`${prefix}del\`\n`;
        menu += `┃✓ \`${prefix}acceptall\` \`${prefix}rejectall\`\n`;
        menu += `┃✓ \`${prefix}antilink\` \`${prefix}antibadword\`\n`;
        menu += `┃✓ \`${prefix}welcome\` \`${prefix}goodbye\`\n`;
        menu += `┃✓ \`${prefix}setgpp\` \`${prefix}setgname\`\n`;
        menu += `┃✓ \`${prefix}warn\` \`${prefix}clearwarn\` \`${prefix}warnings\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // ANIME SECTION
        menu += `╭━━━━❮ *ANIME* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}bite\` \`${prefix}blush\` \`${prefix}bonk\`\n`;
        menu += `┃✓ \`${prefix}bully\` \`${prefix}cringe\` \`${prefix}cry\`\n`;
        menu += `┃✓ \`${prefix}cuddle\` \`${prefix}dance\` \`${prefix}dog\`\n`;
        menu += `┃✓ \`${prefix}handhold\` \`${prefix}highfive\`\n`;
        menu += `┃✓ \`${prefix}hug\` \`${prefix}kill\` \`${prefix}kiss\`\n`;
        menu += `┃✓ \`${prefix}lick\` \`${prefix}nom\` \`${prefix}pat\`\n`;
        menu += `┃✓ \`${prefix}poke\` \`${prefix}slap\` \`${prefix}wave\`\n`;
        menu += `┃✓ \`${prefix}wink\` \`${prefix}insult\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // STICKER SECTION
        menu += `╭━━━━❮ *STICKER* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}sticker\` \`${prefix}s\`\n`;
        menu += `┃✓ \`${prefix}take\` \`${prefix}steal\`\n`;
        menu += `┃✓ \`${prefix}vsticker\` \`${prefix}toimg\`\n`;
        menu += `┃✓ \`${prefix}emojimix\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // GAME SECTION
        menu += `╭━━━━❮ *GAME* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}ttt\` \`${prefix}tttstop\`\n`;
        menu += `┃✓ \`${prefix}tod\` \`${prefix}todstop\`\n`;
        menu += `┃✓ \`${prefix}trivia\` \`${prefix}truthdetector\`\n`;
        menu += `┃✓ \`${prefix}8ball\` \`${prefix}flip\` \`${prefix}dice\`\n`;
        menu += `┃✓ \`${prefix}choose\` \`${prefix}ship\` \`${prefix}love\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // FUN SECTION
        menu += `╭━━━━❮ *FUN* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}joke\` \`${prefix}dadjoke\` \`${prefix}fact\`\n`;
        menu += `┃✓ \`${prefix}quote\` \`${prefix}motivate\` \`${prefix}roast\`\n`;
        menu += `┃✓ \`${prefix}compliment\` \`${prefix}insult\`\n`;
        menu += `┃✓ \`${prefix}truth\` \`${prefix}dare\` \`${prefix}rate\`\n`;
        menu += `┃✓ \`${prefix}zodiac\` \`${prefix}horoscope\`\n`;
        menu += `┃✓ \`${prefix}age\` \`${prefix}today\`\n`;
        menu += `┃✓ \`${prefix}memes\` \`${prefix}xxqc\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // AUDIO SECTION
        menu += `╭━━━━❮ *AUDIO* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}tomp3\` \`${prefix}toaudio\`\n`;
        menu += `┃✓ \`${prefix}tovideo\` \`${prefix}toptt\`\n`;
        menu += `┃✓ \`${prefix}bass\` \`${prefix}robot\` \`${prefix}earrape\`\n`;
        menu += `┃✓ \`${prefix}deep\` \`${prefix}blown\`\n`;
        menu += `┃✓ \`${prefix}volaudio\` \`${prefix}volvideo\`\n`;
        menu += `┃✓ \`${prefix}tts\` \`${prefix}lyrics\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // MISC SECTION
        menu += `╭━━━━❮ *MISC* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}notes\` \`${prefix}remind\`\n`;
        menu += `┃✓ \`${prefix}poll\` \`${prefix}count\`\n`;
        menu += `┃✓ \`${prefix}profile\` \`${prefix}getdp\`\n`;
        menu += `┃✓ \`${prefix}savestatus\` \`${prefix}deviceinfo\`\n`;
        menu += `┃✓ \`${prefix}define\` \`${prefix}urban\` \`${prefix}wiki\`\n`;
        menu += `┃✓ \`${prefix}news\` \`${prefix}translate\`\n`;
        menu += `┃✓ \`${prefix}imdb\` \`${prefix}yts\` \`${prefix}shazam\`\n`;
        menu += `┃✓ \`${prefix}bible\` \`${prefix}quran\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // PRIVACY SECTION
        menu += `╭━━━━❮ *PRIVACY* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}blocklist\` \`${prefix}getbio\`\n`;
        menu += `┃✓ \`${prefix}getprivacy\` \`${prefix}groupsprivacy\`\n`;
        menu += `┃✓ \`${prefix}privacy\` \`${prefix}setmyname\`\n`;
        menu += `┃✓ \`${prefix}setonline\` \`${prefix}setppall\`\n`;
        menu += `┃✓ \`${prefix}updatebio\` \`${prefix}readreceipts\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // INFO SECTION
        menu += `╭━━━━❮ *INFO* ❯━⊷\n`;
        menu += `┃✓ \`${prefix}savestatus\` \`${prefix}status\`\n`;
        menu += `┃✓ \`${prefix}runtime\` \`${prefix}botstatus\`\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        
        // FOOTER
        menu += `╭━━━━❮ *TIPS* ❯━⊷\n`;
        menu += `┃✓ *Total Commands:* ${pluginCount}+\n`;
        menu += `┃✓ *Use:* \`${prefix}help <command>\` for details\n`;
        menu += `┃✓ *Powered by:* TunzyMD©\n`;
        menu += `╰━━━━━━━━━━━━━━━━━⊷\n`;
        
        // Send menu
        await sock.sendMessage(chatId, {
            text: menu,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363304450573890@newsletter',
                    newsletterName: 'TunzyMD',
                    serverMessageId: 1
                }
            }
        }, { quoted: message });
        
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, {
            text: `❌ *Error displaying menu!*\n\n📌 *Error:* ${error.message}\n\n_TunzyMD©_`
        }, { quoted: message });
    }
};
