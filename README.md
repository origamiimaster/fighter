# Fighting Game
A project to build a web based 2d fighting game

### Summary
- A 2d platform fighting game
- Two players
- Browser based

### Languages
- Typescript
- HTML
- CSS


### Classes / Objects
- Renderer: Renders the game engine state to the screen. Translates from game objects to pixels.  
- Controller: Takes inputs from the players and passes them to the game engine. 
- Game Object: A particular element of the game. Can be rendered.  
- Game Engine: Updates the current state of the game given the previous state. 
- Basic Shapes: Classes for each basic shape of gameObject. Pretty much just Triangles, Rectangles, Rotated Rectangles, Circles, and Ellipses.  
- Hitboxes: for each of the basic shapes.
- Hurtboxes: for each of the basic shapes.
- Animations: Moves a collection of hitboxes and hurtboxes in a specific manner. 
- Characters: Collections of hitboxes and hurtboxes along with animations.  
- Loader/Saver: Can load a character from a file or save a character to a file. 

