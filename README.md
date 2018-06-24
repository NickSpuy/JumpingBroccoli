# JumpingBroccoli

De naam komt omdat ik eerst een platformer wilde maken, dit is uiteindelijk niet gelukt. Ik heb er een space game van gemaakt.
Als extra uitdaging heb ik een highscore systeem toegevoegd. Je score wordt opgeslagen in localstorage en blijft zo staan nadat het spel is afgesloten.

Link: http://www.nickspuy.nl/projects/JumpingBroccoli/docs/
Klassendiagram: https://github.com/NickSpuy/JumpingBroccoli/blob/master/ClassDiagram.png

# Classes
Een class is een standaard ding in OOP programmeren. Elk bestand heeft zijn eigen class met eigen constructor.

# Inheritance
Ik heb een class gameobject gemaakt die zichzelf extend aan een aantal andere classes zodat properties in deze class maar 1x aangemaakt hoeven te worden. De classes player en enemy inheriten in mijn code van de class gameobject. Een voorbeeld hierin is bevoorbeeld properties zoals xPos en yPos die ik meerdere keren nodig heb.

# Encapsulation
Properties private, protected of public geven is een benodigde in typescript. Zelf heb ik alleen public en private gebruikt sinds dat ik protected niet nodig heb gehad. In elk bestand staan veschillende properties die encapsulation gebruiken.

# Composition
Ik heb op een aantal plekken composition gebruikt. De start en eindschermen krijgen de main class mee zodat er geswitched kan worden van scherm. 

# Peer review
Afgenomen door: Dominique de Vos 0931703
Link: https://github.com/Ddvos/Programmeren-4

De game ziet er goed uit. Hij speelt goed ik heb geen bugs gevonden. Alle OOP begrippen zitten in de game.
De game staat op GitHub maar is nog niet online speelbaar. De ReadMe is nog niet compleet. En er ontbreekt nog een van de extra uitdagingen
