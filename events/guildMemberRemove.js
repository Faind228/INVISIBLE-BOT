

module.exports = (client, member) => {

  const settings = client.settings.get(member.guild.id);

  if (settings.leaveEnabled !== "true") return;

  const leaveMessage = settings.leaveMessage.replace("{{user}}", member.user.tag);

  member.guild.channels.find("name", settings.leaveChannel).send(leaveMessage).catch(console.error);
};
