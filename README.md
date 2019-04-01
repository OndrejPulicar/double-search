# double-search
assignment from 24i

This is by no means complete, but my time was limited only for the weekend. At first I wanted to write this in ES7 and use Babel to compile it to ES5, but I read that it skips some important functionalities (like "fetch"). So this is written completely in ES5.

Had I have more time, I would:

1. Rewrite every JS class to the prototypical model so I could make ImageItem and TextItem inherit from a parent class (eg. Item). The way this is programmed now provides encapsulation but inheritance is not possible, which is a problem.
2. Make it responsive for very small screens.
3. Make it compatible with other browsers than Chrome.
4. Give image results that didn't load properly a placeholder image.
