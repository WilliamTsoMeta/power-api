// Require the necessary discord.js classes
const { Client, GatewayIntentBits,EmbedBuilder } = require('discord.js');
import { Msg } from '../../types'
// inside a command, event listener, etc.
export const buildMsg = (Msg:Msg) => {
    const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(Msg.title)
    .setURL('https://discord.js.org/')
    // .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
    // .setDescription('Some description here')
    // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
        { name: Msg.title, value: '' },
        { name: '\u200B', value: '\u200B' },
        // { name: 'Inline field title', value: 'Some value here', inline: true },
        // { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    // .setImage('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    // .setFooter({ text: 'Some footer text here'/* , iconURL: 'https://i.imgur.com/AfFp7pu.png'  */});
    return exampleEmbed
}

export const sendMsg = async (client: { channels: { fetch: (arg0: string) => any; }; },exampleEmbed: any,count=0)=>{
    try {
        const channel = await client.channels.fetch('1043102349431930992');
        channel.send({ embeds: [exampleEmbed] });
        // if(channel===null) throw new Error("wrong");        
        // console.log(channel)
    } catch (error) {
        count+=1
        if (count<10) {
            console.log('error', error)
            sendMsg(client,exampleEmbed,count)    
        }
        
    }
    
}

export const discord = () => {
    // Create a new client instance
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    // When the client is ready, run this code (only once)
    client.once('ready', async () => {
        console.log('discord bot Ready!');        
    });

    // Login to Discord with your client's token
    client.login('_RwNH7-zdnsjfKQ3-YcD9mo9Wibm6Eqm');
    return client
}


