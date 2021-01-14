# Rock Paper Scissors
## Initial Objective
Make a simple console version of the game in Javascript.

## Initial Review:
Slightly deviated from prompt so a "match" is BEST of five, rather than five.
Winner calculation might be slightly unintuitive, but seemed better to me than a bunch of nested ifs. I can extend this pattern for expanded-rps ("rock, paper, scissors, lizard, spock," for that 2009-era coolness), but that will make it less legible. If I want to make true space-bending infinite-rps, then I need to figure out a way to mathematically state the pattern.

# RPS Revisited

## Expandable RPS
>If I want to make true space-bending infinite-rps, then I need to figure out a way to mathematically state the pattern.

...So, I made an effort, and it works, but it's not particularly intuitive. This is the code:
```javascript
len = Math.floor(hands.length / 2)
for (let i = 0; i < len; i++) {
  if (comparedHand == (1 + (i * 2)) % hands.length) {
    return true; // thisHand wins!
  }
}
```
It's honestly not THAT unintuitive though! Assign indices to Rock, Paper, and Scissors. How would you define the relationship between [0:Rock, 1:Paper, 2:Scissors]. 

**i always loses against (i + 1) % 3**

Easy! ...Now take this graph:

![](https://content.instructables.com/ORIG/F0V/TGM7/I7Q0THHT/F0VTGM7I7Q0THHT.jpg?frame=1)

Now you have [0:Rock, 1:Paper, 2:Scissors, 3:Spock, 4:Lizard]

The initial pattern still holds: Paper still beats Rock, Scissors still beat Paper, Spock beats Scissors, Lizard beats Spock, and Rock beats Lizard. But now there's another pattern: i ALSO always loses against (i + 3) % 5. And if we had 7 hand indices, there would be 3 relationships: (i + 1) (i + 3) (i + 5).

So... that's the pattern you see in the code. I'm sure there's a much simpler way to express it, but I don't know nuthin' about math and I've already wasted too much time on this, so that's the function for n-sized Rock-Paper-Scissors.

## Verbs
Since we can think of the rules as a directed graph, we can also think of it as a map, where loser i: [(i + 1), (i + 3)] etc. Now, I was too lazy to put the actual win-lose relationships in a map, but we might as well use that knowledge to lazily assign verbs. Ie, "Lizard":["Eats","Poisons"].

In the code I'm a little inconsistent about whether I'm thinking of i as the loser against i + 1, or i as the winner against i - 1. This is solely because I'm a maths coward, and trying to take the modulo of an expression that might be negative scares me. Sure, it **seems** like you just have to add the length before taking modulo, but you never know what trickery it might have up its sleeve. If I were to refactor it, I'd be sure to keep it consistent and just use i - 1, but it's well past time to move on.

## Updated RPS Goals
- ✔️ ~~Add expanded logic, and try to isolate the winner calculation so it's clear what's happening~~
- ✔️ ~~Add "Lizard" & "Spock~~
- ✔️ ~~Add unique text for each outcome ("x CUTS y", etc) - this will probably just be a 2D array with matching indices, ie [x[y]]~~ (ended up using a map instead)
- ✔️ ~~Refactor so it runs on EventListeners for buttons~~
- ~~👀 Add cool theme with CSS styling~~ I tried. Still really struggling with CSS, but I wanna make that etch-a-sketch...
- ~~💀 Make it responsive~~ (maybe next time...)

## "Infinite Rock-Paper-Scissors"

If I wanted to expand this project ***well*** beyond the intended scope, I could make a "rock-paper-scissors" GENERATOR, where users can enter how many hands you have the option to play, what each thing is, what the "verb" for each combination is, upload an image for each thing, then play THAT version of the game or print off a visual rulesheet (since the goofy complex graphics are the only "fun" part of 13-hand-rock-paper-scissors).

This is a lot more work than I'm willing to put in, to be honest. But I figured I'd leave the idea here in case I came back to this and was really desperate for something to do.
