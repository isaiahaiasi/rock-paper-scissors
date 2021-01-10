# Rock Paper Scissors
Objective: make a simple console version of the game in Javascript.

## Review:
Slightly deviated from prompt so a "match" is BEST of five, rather than five.
Winner calculation might be slightly unintuitive, but seemed better to me than a bunch of nested ifs. Unfortunately, if I want to extend this (eg, "Rock Paper Scissors Lizard Spock") I'll need to rewrite the winner calculation and convert the hands array to a different structure (probably a directed graph?).