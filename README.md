# How to use:
1. Download the latest release.
2. Install into your minecraft world, server or realm.
3. Give yourself the "admin1" tag.
4. Run ">adminui" and then close chat.
5. In the dialogue that showed up, click "Rename Association".
6. In the Rename Association GUI, The text you enter in the textbox determines how the addon will be referenced in commands. For example, if you type "Realm", it will appear as "Realm Essentials" in the commands. Remember to press "Submit" to save your new association.
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

# Why "admin1"?
We chose "admin1" to make sure it doesn't interfere with other addons.

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
