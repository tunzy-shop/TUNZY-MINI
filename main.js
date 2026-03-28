/**
 * TUNZY MD MINI — Main Message Handler
 * ✓ Uses sock._ownerPhone for per-user owner check
 * ✓ Private mode blocks both DMs and groups
 * ✓ TUNZY MD MINI© Signature
 */
const fs = require('fs');
const path = require('path');
const settings = require('./settings');
const { isBanned } = require('./lib/isBanned');
const { getSender } = require('./lib/getSender');
const { makeIsOwner } = require('./lib/isOwner');
const { getMode } = require('./commands/mode');

// Temp cleanup
const tempDir = path.join(process.cwd(), 'temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
process.env.TMPDIR = tempDir;
process.env.TEMP = tempDir;
process.env.TMP = tempDir;

// ── All command imports ───────────────────────────────────────────────────

// DOWNLOADER
const fbCmd = require('./commands/fb');
const gitcloneCmd = require('./commands/gitclone');
const instagramCmd = require('./commands/instagram');
const playCmd = require('./commands/play');
const tiktokCmd = require('./commands/tiktok');
const videoCmd = require('./commands/video');
const movieCmd = require('./commands/movie');

// AI
const aiCmd = require('./commands/ai');
const deepseekCmd = require('./commands/deepseek');

// SETTINGS
const anticallCmd = require('./commands/anticall');
const antilinkCmd = require('./commands/antilink');
const autorecordingCmd = require('./commands/autorecording');
const autoreplyCmd = require('./commands/autoreply');
const autoseenCmd = require('./commands/autoseen');
const autotypingCmd = require('./commands/autotyping');
const autoreactCmd = require('./commands/autoreact');
const afkCmd = require('./commands/afk');
const readmessageCmd = require('./commands/readmessage');
const resetwarnCmd = require('./commands/resetwarn');
const setbotprefixCmd = require('./commands/setbotprefix');
const setbotpicCmd = require('./commands/setbotpic');
const setbotnameCmd = require('./commands/setbotname');
const statusreactCmd = require('./commands/statusreact');
const statusreplyCmd = require('./commands/statusreply');
const welcomeCmd = require('./commands/welcome');

// OWNER
const broadcastCmd = require('./commands/broadcast');
const vcfCmd = require('./commands/vcf');
const setsudoCmd = require('./commands/setsudo');
const delsudoCmd = require('./commands/delsudo');
const forwardCmd = require('./commands/forward');
const getppCmd = require('./commands/getpp');
const leaveCmd = require('./commands/leave');
const setppCmd = require('./commands/setpp');
const modeCmd = require('./commands/mode');
const updateCmd = require('./commands/update');

// TOOLS
const fancyCmd = require('./commands/fancy');
const hdCmd = require('./commands/hd');
const quotedCmd = require('./commands/quoted');
const savecontactCmd = require('./commands/savecontact');
const shazamCmd = require('./commands/shazam');
const tiktoksearchCmd = require('./commands/tiktoksearch');
const vvCmd = require('./commands/vv');
const removebgCmd = require('./commands/removebg');

// GROUP
const groupVcfCmd = require('./commands/vcf');
const groupLeaveCmd = require('./commands/leave');

// UTILITY
const jidCmd = require('./commands/jid');
const repoCmd = require('./commands/repo');
const screenshotCmd = require('./commands/screenshot');

// MAIN
const aliveCmd = require('./commands/alive');
const pingCmd = require('./commands/ping');
const uptimeCmd = require('./commands/uptime');

// ADMIN
const demoteCmd = require('./commands/demote');
const muteuserCmd = require('./commands/muteuser');
const unmuteuserCmd = require('./commands/unmuteuser');
const promoteCmd = require('./commands/promote');
const kickCmd = require('./commands/kick');
const tagallCmd = require('./commands/tagall');
const tagCmd = require('./commands/tag');
const muteCmd = require('./commands/mute');
const unmuteCmd = require('./commands/unmute');
const addCmd = require('./commands/add');
const acceptallCmd = require('./commands/acceptall');
const rejectallCmd = require('./commands/rejectall');
const goodbyeCmd = require('./commands/goodbye');
const setgppCmd = require('./commands/setgpp');
const setgnameCmd = require('./commands/setgname');
const warnCmd = require('./commands/warn');
const delCmd = require('./commands/del');

// ANIME
const awooCmd = require('./commands/awoo');
const biteCmd = require('./commands/bite');
const blushCmd = require('./commands/blush');
const bonkCmd = require('./commands/bonk');
const bullyCmd = require('./commands/bully');
const cringeCmd = require('./commands/cringe');
const cryCmd = require('./commands/cry');
const cuddleCmd = require('./commands/cuddle');
const danceCmd = require('./commands/dance');
const dogCmd = require('./commands/dog');
const glompCmd = require('./commands/glomp');
const hackCmd = require('./commands/hack');
const handholdCmd = require('./commands/handhold');
const highfiveCmd = require('./commands/highfive');
const hugCmd = require('./commands/hug');
const imgCmd = require('./commands/img');
const insultCmd = require('./commands/insult');
const killCmd = require('./commands/kill');
const kissCmd = require('./commands/kiss');
const lickCmd = require('./commands/lick');
const nomCmd = require('./commands/nom');
const patCmd = require('./commands/pat');
const pokeCmd = require('./commands/poke');
const slapCmd = require('./commands/slap');
const waveCmd = require('./commands/wave');
const winkCmd = require('./commands/wink');
const yeetCmd = require('./commands/yeet');

// MENU
const helpCmd = require('./commands/help');
const listCmd = require('./commands/list');

// MISC
const lyricsCmd = require('./commands/lyrics');

// PRIVACY
const blocklistCmd = require('./commands/blocklist');
const getbioCmd = require('./commands/getbio');
const getprivacyCmd = require('./commands/getprivacy');
const groupsprivacyCmd = require('./commands/groupsprivacy');
const privacyCmd = require('./commands/privacy');
const setmynameCmd = require('./commands/setmyname');
const setonlineCmd = require('./commands/setonline');
const setppallCmd = require('./commands/setppall');
const updatebioCmd = require('./commands/updatebio');

// INFO
const savestatusCmd = require('./commands/savestatus');

// STICKER
const stickerCmd = require('./commands/sticker');
const takeCmd = require('./commands/take');
const vstickerCmd = require('./commands/vsticker');

// GAME
const tttCmd = require('./commands/tictactoe');
const tttstopCmd = require('./commands/tttstop');
const todCmd = require('./commands/truthordare');
const todstopCmd = require('./commands/todstop');

// Additional required functionality
const { checkAfk, clearAfk } = require('./commands/afk');
const { handleAutoReply } = require('./commands/autoreply');
const { handleChatbot } = require('./commands/chatbot');
const { addUser } = require('./commands/broadcast');
const { inc } = require('./commands/topmembers');
const { handleLink } = require('./commands/antilink');
const { handleBadword } = require('./commands/antibadword');
const { handleSpam } = require('./commands/antispam');
const { handleJoin } = require('./commands/welcome');
const { handleLeave } = require('./commands/goodbye');

global.initAlwaysOnline = () => {};

async function handleMessages(sock, update) {
    try {
        const { messages, type } = update;
        if (type !== 'notify') return;
        const message = messages[0];
        if (!message?.message) return;
        if (Object.keys(message.message)[0] === 'ephemeralMessage')
            message.message = message.message.ephemeralMessage.message;

        const chatId = message.key.remoteJid;
        const isGroup = chatId?.endsWith('@g.us');
        const senderId = getSender(sock, message);

        if (!chatId || !senderId) return;
        if (chatId === 'status@broadcast') return;
        if (isBanned(senderId)) return;

        const isOwnerFn = makeIsOwner(sock._ownerPhone || '');

        if (getMode().mode === "private" && !message.key.fromMe && !await isOwnerFn(senderId, sock, chatId)) return;

        if (!isGroup) {
            addUser(senderId);
            await handleAutoReply(sock, message);
        }

        try {
            const afk = checkAfk(senderId);
            if (afk) {
                clearAfk(senderId);
                const mins = Math.round((Date.now() - afk.time) / 60000);
                await sock.sendMessage(chatId, {
                    text: `👋 Welcome back @${senderId.split('@')[0]}!\nYou were AFK for ${mins} min.\n\n_TUNZY MD MINI©_`,
                    mentions: [senderId]
                });
            }
        } catch (e) {}

        if (isGroup) {
            inc(chatId, senderId);
            await handleLink(sock, chatId, message);
            await handleBadword(sock, chatId, message);
            await handleSpam(sock, chatId, message, senderId);
        }

        const rawText =
            message.message?.conversation ||
            message.message?.extendedTextMessage?.text ||
            message.message?.imageMessage?.caption ||
            message.message?.videoMessage?.caption || '';

        const prefix = settings.prefix || '.';
        if (!rawText.trim().startsWith(prefix)) {
            if (rawText) await handleChatbot(sock, chatId, message, rawText);
            return;
        }

        const [cmd] = rawText.trim().slice(prefix.length).toLowerCase().split(/\s+/);
        const args = rawText.trim().slice(prefix.length).split(/\s+/).slice(1);

        switch (cmd) {
            // DOWNLOADER
            case 'fb': case 'facebook': await fbCmd(sock, chatId, message, args); break;
            case 'gitclone': await gitcloneCmd(sock, chatId, message, args); break;
            case 'instagram': case 'ig': await instagramCmd(sock, chatId, message, args); break;
            case 'play': await playCmd(sock, chatId, message, args); break;
            case 'tiktok': await tiktokCmd(sock, chatId, message, args); break;
            case 'video': await videoCmd(sock, chatId, message, args); break;
            case 'movie': await movieCmd(sock, chatId, message, args); break;
            
            // AI
            case 'ai': case 'ask': case 'gpt': await aiCmd(sock, chatId, message, args); break;
            case 'deepseek': await deepseekCmd(sock, chatId, message, args); break;
            
            // SETTINGS
            case 'anticall': case 'anti-call': await anticallCmd.anticallCommand(sock, chatId, message, args); break;
            case 'antilink': await antilinkCmd.antilinkCommand(sock, chatId, message, args); break;
            case 'autorecording': case 'auto-recording': await autorecordingCmd(sock, chatId, message, args); break;
            case 'autoreply': case 'auto-reply': await autoreplyCmd.autoReplyCommand(sock, chatId, message, args); break;
            case 'autoseen': case 'auto-seen': await autoseenCmd(sock, chatId, message, args); break;
            case 'autotyping': case 'auto-typing': await autotypingCmd(sock, chatId, message, args); break;
            case 'autoreact': await autoreactCmd(sock, chatId, message, args); break;
            case 'afk': await afkCmd.afkCommand(sock, chatId, message, args); break;
            case 'readmessage': case 'read-message': await readmessageCmd(sock, chatId, message, args); break;
            case 'resetwarn': await resetwarnCmd(sock, chatId, message); break;
            case 'setbotprefix': await setbotprefixCmd(sock, chatId, message, args); break;
            case 'setbotpic': await setbotpicCmd(sock, chatId, message, args); break;
            case 'setbotname': await setbotnameCmd(sock, chatId, message, args); break;
            case 'statusreact': case 'status-react': await statusreactCmd(sock, chatId, message, args); break;
            case 'statusreply': case 'status-reply': await statusreplyCmd(sock, chatId, message, args); break;
            case 'welcome': await welcomeCmd.welcomeCommand(sock, chatId, message, args); break;
            
            // OWNER
            case 'broadcast': case 'bc': await broadcastCmd.bcCommand(sock, chatId, message, args); break;
            case 'vcf': await vcfCmd(sock, chatId, message); break;
            case 'sudo': case 'setsudo': await setsudoCmd(sock, chatId, message, args); break;
            case 'del': case 'delsudo': await delsudoCmd(sock, chatId, message, args); break;
            case 'forward': await forwardCmd(sock, chatId, message, args); break;
            case 'getpp': await getppCmd(sock, chatId, message); break;
            case 'leave': await leaveCmd(sock, chatId, message); break;
            case 'setpp': case 'setprofilepic': await setppCmd(sock, chatId, message); break;
            case 'mode': await modeCmd.modeCommand(sock, chatId, message, args); break;
            case 'update': await updateCmd(sock, chatId, message, args); break;
            
            // TOOLS
            case 'fancy': await fancyCmd(sock, chatId, message, args); break;
            case 'hd': await hdCmd(sock, chatId, message); break;
            case 'quoted': await quotedCmd(sock, chatId, message); break;
            case 'savecontact': await savecontactCmd(sock, chatId, message, args); break;
            case 'shazam': await shazamCmd(sock, chatId, message); break;
            case 'tiktoksearch': await tiktoksearchCmd(sock, chatId, message, args); break;
            case 'vv': case 'viewonce': await vvCmd(sock, chatId, message); break;
            case 'removebg': await removebgCmd(sock, chatId, message); break;
            
            // GROUP
            case 'groupvcf': await groupVcfCmd(sock, chatId, message); break;
            case 'groupleave': await groupLeaveCmd(sock, chatId, message); break;
            
            // UTILITY
            case 'jid': await jidCmd(sock, chatId, message); break;
            case 'repo': await repoCmd(sock, chatId, message); break;
            case 'screenshot': case 'ssweb': await screenshotCmd(sock, chatId, message, args); break;
            
            // MAIN
            case 'alive': await aliveCmd(sock, chatId, message); break;
            case 'ping': await pingCmd(sock, chatId, message); break;
            case 'uptime': await uptimeCmd(sock, chatId, message); break;
            
            // ADMIN
            case 'demote': await demoteCmd(sock, chatId, message); break;
            case 'mute-user': await muteuserCmd(sock, chatId, message, args); break;
            case 'unmute-user': await unmuteuserCmd(sock, chatId, message, args); break;
            case 'promote': await promoteCmd(sock, chatId, message); break;
            case 'kick': await kickCmd(sock, chatId, message); break;
            case 'tagall': await tagallCmd(sock, chatId, message, args); break;
            case 'tag': await tagCmd(sock, chatId, message, args); break;
            case 'mute': await muteCmd(sock, chatId, message); break;
            case 'unmute': await unmuteCmd(sock, chatId, message); break;
            case 'add': await addCmd(sock, chatId, message, args); break;
            case 'acceptall': await acceptallCmd(sock, chatId, message); break;
            case 'rejectall': await rejectallCmd(sock, chatId, message); break;
            case 'goodbye': case 'bye': await goodbyeCmd.goodbyeCommand(sock, chatId, message, args); break;
            case 'setgpp': await setgppCmd(sock, chatId, message); break;
            case 'setgname': await setgnameCmd(sock, chatId, message, args); break;
            case 'warn': await warnCmd(sock, chatId, message); break;
            case 'del': await delCmd(sock, chatId, message); break;
            
            // ANIME
            case 'awoo': await awooCmd(sock, chatId, message); break;
            case 'bite': await biteCmd(sock, chatId, message); break;
            case 'blush': await blushCmd(sock, chatId, message); break;
            case 'bonk': await bonkCmd(sock, chatId, message); break;
            case 'bully': await bullyCmd(sock, chatId, message); break;
            case 'cringe': await cringeCmd(sock, chatId, message); break;
            case 'cry': await cryCmd(sock, chatId, message); break;
            case 'cuddle': await cuddleCmd(sock, chatId, message); break;
            case 'dance': await danceCmd(sock, chatId, message); break;
            case 'dog': await dogCmd(sock, chatId, message); break;
            case 'glomp': await glompCmd(sock, chatId, message); break;
            case 'hack': await hackCmd(sock, chatId, message); break;
            case 'handhold': await handholdCmd(sock, chatId, message); break;
            case 'highfive': await highfiveCmd(sock, chatId, message); break;
            case 'hug': await hugCmd(sock, chatId, message); break;
            case 'img': await imgCmd(sock, chatId, message); break;
            case 'insult': await insultCmd(sock, chatId, message); break;
            case 'kill': await killCmd(sock, chatId, message); break;
            case 'kiss': await kissCmd(sock, chatId, message); break;
            case 'lick': await lickCmd(sock, chatId, message); break;
            case 'nom': await nomCmd(sock, chatId, message); break;
            case 'pat': await patCmd(sock, chatId, message); break;
            case 'poke': await pokeCmd(sock, chatId, message); break;
            case 'slap': await slapCmd(sock, chatId, message); break;
            case 'wave': await waveCmd(sock, chatId, message); break;
            case 'wink': await winkCmd(sock, chatId, message); break;
            case 'yeet': await yeetCmd(sock, chatId, message); break;
            
            // MENU
            case 'help': case 'menu': await helpCmd(sock, chatId, message, args); break;
            case 'list': await listCmd(sock, chatId, message); break;
            
            // MISC
            case 'lyrics': case 'lyric': await lyricsCmd(sock, chatId, message, args); break;
            
            // PRIVACY
            case 'blocklist': await blocklistCmd(sock, chatId, message); break;
            case 'getbio': await getbioCmd(sock, chatId, message); break;
            case 'getprivacy': await getprivacyCmd(sock, chatId, message); break;
            case 'groupsprivacy': await groupsprivacyCmd(sock, chatId, message, args); break;
            case 'privacy': await privacyCmd(sock, chatId, message, args); break;
            case 'setmyname': await setmynameCmd(sock, chatId, message, args); break;
            case 'setonline': await setonlineCmd(sock, chatId, message, args); break;
            case 'setppall': await setppallCmd(sock, chatId, message); break;
            case 'updatebio': await updatebioCmd(sock, chatId, message, args); break;
            
            // INFO
            case 'savestatus': await savestatusCmd(sock, chatId, message); break;
            
            // STICKER
            case 'sticker': case 's': await stickerCmd(sock, chatId, message); break;
            case 'take': await takeCmd(sock, chatId, message, args); break;
            case 'vsticker': await vstickerCmd(sock, chatId, message); break;
            
            // GAME
            case 'ttt': await tttCmd(sock, chatId, message, args); break;
            case 'tttstop': await tttstopCmd(sock, chatId, message); break;
            case 'tod': await todCmd(sock, chatId, message); break;
            case 'todstop': await todstopCmd(sock, chatId, message); break;
            
            default: break;
        }
    } catch (e) {
        console.error('handleMessages error:', e.message);
    }
}

async function handleGroupParticipantUpdate(sock, update) {
    try {
        const { id, participants, action } = update;
        if (!id.endsWith('@g.us')) return;
        if (action === 'add') await handleJoin(sock, id, participants);
        if (action === 'remove') await handleLeave(sock, id, participants);
    } catch (e) {
        console.error('group update error:', e.message);
    }
}

module.exports = { handleMessages, handleGroupParticipantUpdate };