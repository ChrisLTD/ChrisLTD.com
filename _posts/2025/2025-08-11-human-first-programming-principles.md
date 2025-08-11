---
layout: post
title: Human-First Programming Principles
category: dev
---
After years of writing code, reviewing pull requests, debugging tricky production issues, I've developed a few opinions on how to write maintainable software. I'm not going to claim that any of these ideas are particularly revolutionary, but I wanted a document that outlines the principles I use for my records and as a resource for those who work for and with me on projects.

## 1. Names matter more than you think

The first principle I follow is using descriptive names for variables and methods. It sounds obvious, but the difference between `h` and `hoursSinceLastLogin` can mean the difference between a one minute code review and ten minutes of confusion. When you write `getUserAccountDetails()` instead of `getUAD()`, sure it's a few more key strokes today, however future developers (including yourself a few months from now) will thank you for making the code simple to understand.

## 2. Simple is better than clever

Building on principle one, you should strive for simplicity in your code over cleverness. Sure, it's impressive that you can write a complex data transformation as a single line with multiple chained array methods, and nested ternaries. But you probably shouldn't.

This isn't about dumbing down code, it's about being aware that maintainability often trumps elegance when you're writing software with a team. The cleverest code in the world is a liability if your teammates can't confidently debug or modify it in the future.

Side note: I'm particularly cautious about functional patterns in languages that weren't designed for them (like JavaScript). I appreciate the elegance of functional programming and have used it where appropriate, but, in my experience, many engineers you work with won't be comfortable with functional concepts like currying, function composition, or monads. Write software for the team and language you have, and everyone will likely be more productive for it.

## 3. Keep functions short

Functions should ideally do one thing, and that thing should be in the name (see principle #1). I've written my fair share of screen long functions, and they often turn into a future source of pain. Smaller functions tend to be easier to read, test, refactor, and reuse.

A function called `validateInput()` shouldn't also send an email, update the database, and turn on your coffee maker. Each of those things should likely be their own functions. This separation makes your code more readable and might even prevent bugs that come from overlooked side effects.

## 4. Stay local if you can

My last principle is about code organization. I prefer to keep types and utility functions in the same file as modules or components until they need to be shared.

 Too often I see projects where every type lives in a `types` directory and every utility function lives in a `utils` directory, even when these pieces are only used by a single component. This kind of premature optimization creates unnecessary cognitive overhead. Instead of scrolling through a single file from top to bottom, now I'm switching between a handful of tabs. It makes creating a mental model needlessly difficult.

## Code isn't just for machines

These principles all come from a single maxim, that code is primarily for humans, not computers. The computer doesn't care if your variable name is descriptive. The computer doesn't care if your function is five lines or five hundred. But your teammates will care. Future you will care.
