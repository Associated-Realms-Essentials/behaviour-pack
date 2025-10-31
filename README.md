# How to use:
1. Download the latest release.
2. Install into your minecraft world, server or realm.
3. Give yourself the "admin1" tag.
4. Run ">adminui" and then close chat.
5. In the dialogue that showed up click "Pack Settings", and then click "Rename Association".
6. In the Rename Association GUI, The text you enter in the textbox determines how the addon will be referenced in commands. For example, if you type "Realm Essentials", it will appear as "Realm Essentials" in the commands. Remember to press "Submit" to save your new association.
7. Run ">adminui" again.
8. Press "Configure Features".
9. Click "Join Messages"
10. If you want to turn off join messages, you can simply uncheck "Enabled" and press "Submit".
11. If you want to customize the join message, you can replace "The Realm" in the textbox to the name of your world, server or realm and then press "Submit", You can also fully customize how the join message shows up.
12. Run ">help" in chat, you will see a list of commands.
13. Enjoy!

# Customizing chat ranks
You can give yourself the tag `arerank:{owner} §c§lOwner` witch gives you a nice looking owner chat rank, You can customize this to your liking.

You can even give yourself the tag `arerank:{major} §eSupports MajorRage3367` witch gives you a nice tag with my in-game head on it, Watch how it automatically adds these as chat ranks when you talk in the in-game chat.

You can use whatever section symbol color combination you want, it will work, all the supported {icons} are:<br>
`{operator_plain}` - Just a normal operator crown.<br>
`{owner}` - A red operator crown.<br>
`{regulations}` - A green operator crown.<br>
`{operator}` - A blue operator crown.<br>
`{smiley}` - A smiling enderman.<br>
`{major}` - MajorRage3367 (Maragi)'s in-game head, due to the addon originally being created for Clidewood Realm where Maragi is the owner.

# ">spawn" and ">home"
The spawn functionality uses the default spawn point of the world.
Go to your worlds spawn / hub area and run /setworldspawn, now when you or others run >spawn you will get teleported to your default world spawn.

The home functionality uses the players spawnpoint.
This home is set using a bed or with /spawnpoint minecraft command.

When a player runs >home in a dimension other than the overworld, it will teleport them back to the overworld and then teleport them to their spawnpoint in the overworld (most likely their bed location), when a player runs >spawn in a dimension other than the overworld, it will teleport them to the world spawn location within the dimension they are currently inside of, this is intended functionality, without it you cant mod your worlds to teleport players to a dedicated spawn setup in another dimension, simply teleport the player once they go to the default spawn point of the world using a skulk-sensor, using a skulk-sensor insures that the users player-model loads before they get teleported to another place in the dimension.

# Why "blocked1" tag?
This tag allows you to stop someone from using Associated Realms Essentials, such as if they are abusing the commands, We chose "blocked1" because it is unlikely to interfere with other addons.

# Why "admin1" tag?
This tag is for giving people the access to the administration commands that come with Associated Realms Essentials, We chose "admin1" to make sure it doesn't interfere with other addons.

# Why "adminHide1" tag?
This tag is for hiding other users command usage on your screen. We chose "adminHide1" because we believe it is most fitting for this purpose.

# Why "adminHide2" tag?
This tag is for hiding alerts on your screen, e.g. blocklog alerts and accesslog alerts, We chose "adminHide2" because we believe it is most fitting for this purpose.

# Tags
For best results, always put a set of quotes like `/tag @s add "arefunction:rtp"` around the tag so that it runs properly, if you don't understand something, create a Discussion using the tab found on the front page of the github organization.

1. `arefunction:rtp` - Randomly teleports the player to random coordinates.
2. `arefunction:rtpWithCountdown` - Randomly teleports the player to random coordinates with a countdown.
3. `arefunction:cancelKnockback` - Cancels a players knockback so they cant take knockback.
4. `areShowMessageGui:(gui title)::(gui description)::(gui button 1 text)::(gui button 2 text)::(gui button 1 command)::(gui button 2 command)` - Creates a simple message dialogue witch prompts the user to choose a option, runs the resulting command on them depending on witch button they choose to press.<br>
  {newline}, {association}, {user} and/or {q} can be used to import extra information into the gui.<br>
  {newline} - Creates new lines in the GUI.<br>
  {association} - The addons association.<br>
  {user} - The user's name who was targeted with the GUI.<br>
  {q} > A quote mark because you cant use " in a tag. e.g. tellraw @s {{q}rawtext{q}: \[{q}text{q}: {q}Hello World!{q}\]}
5. `areEvalMCCommand:say Hello::say World!||say This happened::say Instead.` - A tag that you target to a player that makes them run a bunch of minecraft commands automatically.<br>
  Interpretation of the example: (pick randomly between ("say Hello" then "say World!") and ("say This happened" then "say Instead."))<br>
  || - OR symbol<br>
  :: - AND symbol
6. `arerank:Your chat rank text` - Discussed earlier, gives you a chat rank that shows up in chat, all people without any chat rank tags get `§bMember` by default, there is no way to change this by default.
``

# Prefix
The prefix for the chat commands for Associated Realms Essentials is `>`.

# Issues
If you find any issues or errors with the addon, please use "Issues" on github to report them, this guarantees the safety and integrity of the addon is kept up to date.
