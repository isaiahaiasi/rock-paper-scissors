# Rock Paper Scissors
## Initial Objective
Make a simple console version of the game in Javascript.

## Initial Review:
Slightly deviated from prompt so a "match" is BEST of five, rather than five.
Winner calculation might be slightly unintuitive, but seemed better to me than a bunch of nested ifs. I can extend this pattern for expanded-rps ("rock, paper, scissors, lizard, spock," for that 2009-era coolness), but that will make it less legible. If I want to make true space-bending infinite-rps, then I need to figure out a way to mathematically state the pattern.

# RPS Revisited

## Expandable RPS
>If I want to make true space-bending infinite-rps, then I need to figure out a way to mathematically state the pattern.

Elaborating on this thought, this pattern could be represented as a directed graph. That's the normal way you'd represent the game visually, after all. And a directed graph can be represented as a Map where each key is the index of a "hand" (eg, Scissors), and each value is the set of hand indices that it beats. For 3 hand indices, there is only 1 value, which is always i + 1 (technically (i + 1) % (# of indices), to loop). For 5 hand indices, there are 2 values per key, which are (i + 1) & (i + 3). For 7 hand indices, there are 3 values (i + 1) (i + 3) (i + 5).

Following this pattern, checking for an arbitrary (odd-numbered) length of hands from just a single array of could be:

```
len = Math.floor(hands.length / 2)
for (let i = 0; i < len; i++) {
  if (comparedHand == (thisHand + 1 + (i * 2)) % hands.length) {
    return true; // thisHand wins!
  }
}
```
(Obviously this is much worse time-complexity than if I just generated an actual Map, but, uh, I don't know how to do that in JS yet lmao. and for n = 5 time complexity is pretty irrelevant, so, w/e)

## Updated RPS Goals
- ✔️ ~~Add expanded logic, and try to isolate the winner calculation so it's clear what's happening~~
- ✔️ ~~Add "Lizard" & "Spock~~
- ✔️ ~~Add unique text for each outcome ("x CUTS y", etc) - this will probably just be a 2D array with matching indices, ie [x[y]]~~ (ended up using a map instead)
- ✔️ ~~Refactor so it runs on EventListeners for buttons~~
- 👀 Add cool theme with CSS styling
- 💀 Make it responsive 

## "Infinite Rock-Paper-Scissors"

If I wanted to expand this project ***well*** beyond the intended scope, I could make a "rock-paper-scissors" GENERATOR, where users can enter how many hands you have the option to play, what each thing is, what the "verb" for each combination is, upload an image for each thing, then play THAT version of the game or print off a visual rulesheet (since the goofy complex graphics are the actually fun part of 13-hand-rock-paper-scissors).

This is a lot more work than I'm willing to put in, to be honest. But I figured I'd leave the idea here in case I came back to this and was really desperate for something to do.
