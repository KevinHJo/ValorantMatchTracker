# Welcome to Valorant Match Tracker!

## Background

Becoming skilled at Valorant means becoming skilled at outwitting opponents and constantly adapting to various situations. Valorant Match Tracker allows users to develop these skills by giving them insight into how they performed in past games. When users select their name and a specific match to view, a game-accurate map is loaded with the locations of their deaths and kill victims. The user can customize the map by selecting whether to display only kills, deaths, or kills/deaths with specific weapons. Using this information, anybody can visually recognize angles that they consistently win or lose fights at, areas of the map to avoid, and areas of their gameplay to improve.

## Functionality

* With this app, users will be able to:
    + Select a specific player or all players in the match to view their stats
    + Cycle through the rounds of a match and view a dynamically updating map containing the locations of the selected player's kill victims for that round.
    + Cycle through the rounds of a match and view a dynamically updating map containing the locations of the selected player's deaths for that round.
    + Use a selector to decide which locations to view or all.
    + Select a weapon from a list displayed to the side of the map containing the weapons used to kill during the round (could be an empty list). The map will display only deaths to that weapon or kills with that weapon.
    + View their overall combat score/economy stats for the round.

* In addition, this project will include:
    + Instructions for use
    + README.md file
    + A sample database provided by a user with access to Riot's restricted Valorant API

## Wireframe

* https://wireframe.cc/pro/pp/9c2c04d4a456458

## Project Timeline

* Monday 7/12/21
    + Create HTML skeleton for the site
    + Extract Data from sample API request for use

* Tuesday 7/13/21
    + Create Selectable list of Players
    + Link each list item to a user in the sample data
    + Include Kill and Death locations on the map depending on selected user

* Wednesday 7/14/21
    + Add weapon selection functionality
    + Create an area for K/D/A and economy info

* Thursday 7/15/21
    + CSS

## Technologies

* HTML, CSS, Javascript, Riot Games Developer API*
    + *Actual API is Inaccessible, so a file is included with sample data

## Future Implementations:

Utilize this app as the view page for a larger project in which a user selects/searches for a list of another user's match history, and then selects a single match to view in greater detail.